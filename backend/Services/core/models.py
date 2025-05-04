from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator,MaxValueValidator
from django.db.models import Q
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.timezone import now
from datetime import timedelta




class Student(models.Model):
    # user based authentication
    # user = models.OneToOneField('accounts.CustomUser', on_delete=models.CASCADE, limit_choices_to={'role': 'student'}, null=True, blank=True)

    name = models.CharField(max_length=21)
    enroll_number = models.IntegerField(unique=True)
    email = models.EmailField(default='')
    student_contact = models.BigIntegerField(validators=[MinValueValidator(1000000000), MaxValueValidator(9999999999)])
    parent_contact1 = models.BigIntegerField(validators=[MinValueValidator(1000000000), MaxValueValidator(9999999999)])
    parent_contact2 = models.BigIntegerField(validators=[MinValueValidator(1000000000), MaxValueValidator(9999999999)])
    
    alloted = models.BooleanField(default=False)  # Whether the student is assigned to a room
    
    cg = models.FloatField(default=0.0)  # Cumulative Grade (CG)
    grad_year = models.IntegerField(null=False)  # Graduation year
    
    priority_score = models.FloatField(default=0.0)  # Priority score for room assignment
    
    # Add a reference to the HostelRoom the student is assigned to
    room = models.ForeignKey('HostelRoom', related_name='students', null=True, blank=True, on_delete=models.SET_NULL)
    hosteller = models.BooleanField(default=True)
    
    def save(self, *args, **kwargs):
        # Get the previous room before saving
        old_room = None
        if self.pk:
            old_room = Student.objects.get(pk=self.pk).room

        # Validate single-room assignment (optional if enforced elsewhere)
        # if self.room and Student.objects.filter(room=self.room).exclude(id=self.id).exists():
        #     raise ValidationError(f"{self.name} is already assigned to room {self.room.room_number}.")

        # Update status and score
        self.alloted = self.room is not None
        self.priority_score = 5000 - self.grad_year + self.cg

        # Save the student
        super().save(*args, **kwargs)

        # Update old room occupancy if it changed
        if old_room and old_room != self.room:
            old_room.occupancy = old_room.students.count()
            old_room.save()

        # Update new room occupancy
        if self.room:
            self.room.occupancy = self.room.students.count()
            self.room.save()



    def clean(self):
        if self.room:
            # Count current students in the room excluding the current instance (in case of update)
            current_occupancy = Student.objects.filter(room=self.room).exclude(id=self.id).count()
            
            # Check if adding this student would exceed the room's capacity
            if current_occupancy >= self.room.capacity:
                raise ValidationError(f"Room {self.room.room_number} is already full (capacity: {self.room.capacity}).")
        
        # Update 'alloted' status accordingly
        self.alloted = self.room is not None

        
    def __str__(self):
        return f"Student {self.name} (Enroll Number: {self.enroll_number})"
    
    def delete(self, *args, **kwargs):
        room = self.room
        super().delete(*args, **kwargs)

        if room:
            room.occupancy = room.students.count()
            room.save()



# ----------------------------------------------------------------------------------------------------


class Hostels(models.Model):
    
    name = models.CharField(max_length=100, unique=True)  # Hostel's unique name
    description = models.CharField(max_length=500)
    Hname = models.CharField(max_length=30)  # Hostel's official name
    
    
    def __str__(self):
        return f"{self.name} - {self.Hname}"
    
    # class Meta:
    #     constraints = [
    #         models.UniqueConstraint(fields=['name', 'Hname'], name='unique_hostel_name')
    #     ]


# ----------------------------------------------------------------------------------------------------


class HostelRoom(models.Model):
    room_number = models.IntegerField(default=0)
    hostel = models.ForeignKey('Hostels', null=True, on_delete=models.CASCADE)
    
    # Room capacity and occupancy info
    capacity = models.SmallIntegerField(default=2)
    occupancy = models.SmallIntegerField(default=0)
    
    # Room details and attributes
    priority_score = models.FloatField(default=0.0)
    floor = models.IntegerField(default=2)
    level = models.IntegerField(default=-10)
    balcony = models.BooleanField(default=False)
    sunny = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        # Calculate priority score based on room attributes
        self.priority_score = 100 + 5 * self.balcony - 3 * abs(self.level)

        # Save to generate ID if not exists (needed for FK relationships)
        super().save(*args, **kwargs)

        # Dynamically calculate occupancy based on assigned students
        self.occupancy = Student.objects.filter(room=self).count()

        # Ensure occupancy does not exceed capacity
        if self.occupancy > self.capacity:
            raise ValidationError(f"Room {self.room_number} exceeds its capacity of {self.capacity}.")

        # Perform additional custom validations
        self.full_clean()

        # Final save with updated occupancy
        super().save(*args, **kwargs)

    def clean(self):
        if not (-13 <= self.level <= 5):
            raise ValidationError("Level must be between -13 and 5.")
        if self.occupancy > self.capacity:
            raise ValidationError(f"Room {self.room_number} exceeds its capacity of {self.capacity}.")
        if self.capacity == 1 and self.occupancy > 1:
            raise ValidationError("Room capacity is 1, so only 1 student can be assigned.")

    def __str__(self):
        return f"Room {self.room_number} in {self.hostel.name} Hostel"

    class Meta:
        constraints = [
            models.CheckConstraint(check=models.Q(level__gte=-13) & models.Q(level__lte=5), name='level_range'),
            models.UniqueConstraint(fields=['room_number', 'hostel'], name='unique_room_per_hostel'),
        ]


# ----------------------------------------------------------------------------------------------------


class Hostel_Management(models.Model):
    # user based authentication
    
    # user = models.OneToOneField(
    #     'accounts.CustomUser', 
    #     on_delete=models.CASCADE, 
    #     limit_choices_to=Q(role__in=['warden', 'chief_warden', 'caretaker', 'guard']), 
    #     null=True, 
    #     blank=True
    # )
    
    ROLE_CHOICES = [
        ('guard', 'Guard'),
        ('warden', 'Warden'),
        ('chief_warden', 'Chief Warden'),
        ('caretaker', 'Caretaker'),
    ]

    name = models.CharField(max_length=200)
    ph_number = models.BigIntegerField(
        validators=[MinValueValidator(1000000000), MaxValueValidator(9999999999)]
    )
    email = models.EmailField(default='', unique=True)
    hostel = models.ForeignKey('Hostels', null=True, blank=True, on_delete=models.SET_NULL)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='warden')


    def clean(self):
        # Allow hostel to be None only for guards
        if self.role != 'guard' and self.hostel is None:
            raise ValidationError('Only guards can have no hostel assigned.')

    def __str__(self):
        return f"{self.name} - {self.role}"


# ----------------------------------------------------------------------------------------------------


class Outpass(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)

    # Outpass details
    location = models.TextField()
    reason = models.CharField(max_length=255)

    # Dates
    start_date = models.DateField()
    end_date = models.DateField()
    days_of_leave = models.PositiveIntegerField(default=0)

    # Status flags
    approvedcheck = models.BooleanField(default=False)
    rejected = models.BooleanField(default=False)
    markout = models.BooleanField(default=False)
    markin = models.BooleanField(default=False)

    approved_by = models.ForeignKey(
        Hostel_Management,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        limit_choices_to=models.Q(role__iexact='warden') | models.Q(role__iexact='chief_warden'),
        related_name='approved_outpasses'
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._original_approved = self.approvedcheck
        self._original_markout = self.markout
        self._original_markin = self.markin

    def clean(self):
        # Date validation
        if self.start_date < now().date():
            raise ValidationError("Start date must be today or later.")
        if self.end_date < self.start_date:
            raise ValidationError("End date must be after start date.")

        # Enforce presence of approver for any decision
        # if self.approvedcheck or self.rejected:
        #     if not self.approved_by:
        #         raise ValidationError("An approver must be assigned before approval or rejection.")

        # Mutual exclusivity of approval and rejection
        if self.approvedcheck and self.rejected:
            raise ValidationError("Outpass cannot be both approved and rejected.")

        # Logic for rejected outpass
        if self.rejected:
            if self.markout or self.markin:
                raise ValidationError("Rejected outpasses cannot be marked out or marked in.")
            self.approved_by = None  # Automatically reset approver for rejected requests

        # Logic for approved outpass
        if self.approvedcheck:
            if self.approved_by.role.lower() not in ["warden", "chief_warden"]:
                raise ValidationError("Only a warden or chief warden can approve the outpass.")

            # Ensure correct order of operations
            if self.markout and not self.approvedcheck:
                raise ValidationError("Cannot mark out before approval.")
            if self.markin and not self.markout:
                raise ValidationError("Cannot mark in before marking out.")

        # Prevent rollback or skipping steps
        if self._original_markout and not self.markout:
            raise ValidationError("Cannot unmark 'markout' once it has been marked.")
        if self._original_markin and not self.markin:
            raise ValidationError("Cannot unmark 'markin' once it has been marked.")

    def save(self, *args, **kwargs):
        # Ensure the approver is set when either approved or rejected
        
        # if self.approvedcheck or self.rejected:
        #     if not self.approved_by:
        #         raise ValidationError("An approver must be assigned before approval or rejection. ---s")
        
        self.full_clean()
        self.days_of_leave = (self.end_date - self.start_date).days + 1
        super().save(*args, **kwargs)

        # Update original states after save
        self._original_approved = self.approvedcheck
        self._original_markout = self.markout
        self._original_markin = self.markin

    def __str__(self):
        return f"Outpass for {self.student.name} ({self.start_date} → {self.end_date})"


