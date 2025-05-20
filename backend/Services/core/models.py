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
    user = models.OneToOneField('accounts.CustomUser', on_delete=models.CASCADE, limit_choices_to={'role': 'student'}, null=True, blank=True)

    name = models.CharField(max_length=21)
    enroll_number = models.IntegerField(unique=True)
    email = models.EmailField(default='')
    student_contact = models.BigIntegerField(validators=[MinValueValidator(1000000000), MaxValueValidator(9999999999)])
    parent_contact1 = models.BigIntegerField(validators=[MinValueValidator(1000000000), MaxValueValidator(9999999999)])
    parent_contact2 = models.BigIntegerField(validators=[MinValueValidator(1000000000), MaxValueValidator(9999999999)])
    
    alloted = models.BooleanField(default=False)  # Whether the student is assigned to a room
    
    cg = models.FloatField(default=0.0)  # Cumulative Grade (CG)
    admn_year = models.IntegerField(null=False)  # Graduation year
    
    priority_score = models.FloatField(default=0.0)  # Priority score for room assignment
    
    # Add a reference to the HostelRoom the student is assigned to
    room = models.ForeignKey('HostelRoom', related_name='students', null=True, blank=True, on_delete=models.SET_NULL)
    hosteller = models.BooleanField(default=True)
    
    GENDER_CHOICES = [
        ('m', 'Male'),
        ('f', 'Female'),
        ('o', 'Other'),
    ]

    gender = models.CharField(
        max_length=1,
        choices=GENDER_CHOICES,
        default='m'
    )
    
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
        self.priority_score = 5000 - self.admn_year + self.cg

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
            # Gender-based hostel restriction
            hostel_name = self.room.hostel.name.lower() if self.room.hostel and self.room.hostel.name else ''
            if self.gender == 'f' and hostel_name != 'geeta':
                raise ValidationError("Female students can only be assigned to the Geeta hostel.")
            if self.gender == 'm' and hostel_name == 'geeta':
                raise ValidationError("Male students cannot be assigned to the Geeta hostel.")

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
    
    # variable to show the room in public room list 
    show = models.BooleanField(default=True)
    
    
    # In models.py, inside the Student model

    # def save(self, *args, **kwargs):
    #     # Calculate priority score based on room attributes
    #     self.priority_score = 100 + 5 * self.balcony - 3 * abs(self.level)

    #     # Save to generate ID if not exists (needed for FK relationships)
    #     super().save(*args, **kwargs)

    #     # Dynamically calculate occupancy based on assigned students
    #     self.occupancy = Student.objects.filter(room=self).count()

    #     # Ensure occupancy does not exceed capacity
    #     if self.occupancy > self.capacity:
    #         raise ValidationError(f"Room {self.room_number} exceeds its capacity of {self.capacity}.")

    #     # Perform additional custom validations
    #     self.full_clean()

    #     # Final save with updated occupancy
    #     super().save(*args, **kwargs)
    
    
    def save(self, *args, **kwargs):
        # Calculate priority score based on room attributes
        self.priority_score = 100 + 5 * self.balcony - 3 * abs(self.level)

        # Temporarily skip occupancy count if not yet saved
        is_new = self.pk is None
        super().save(*args, **kwargs)

        if is_new:
            # Only update occupancy after the room has been saved and assigned an ID
            self.occupancy = Student.objects.filter(room=self).count()
            # Save only the updated occupancy field
            HostelRoom.objects.filter(pk=self.pk).update(occupancy=self.occupancy)


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
    
    user = models.OneToOneField(
        'accounts.CustomUser', 
        on_delete=models.CASCADE, 
        limit_choices_to=Q(role__in=['warden', 'chief_warden', 'caretaker', 'guard']), 
        null=True, 
        blank=True
    )
    
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


#------------------------------------------------------------------------------------------------------


from django.db import models
from core.models import HostelRoom, Student


class InventoryForm(models.Model):
    hostel_room = models.ForeignKey(HostelRoom, on_delete=models.CASCADE, related_name='inventory_forms')

    # Inventory checked by student (suffix _s) and caretaker (_c)
    fan_s = models.BooleanField(default=False)
    fan_c = models.BooleanField(default=False)

    tube_light_s = models.BooleanField(default=False)
    tube_light_c = models.BooleanField(default=False)

    fan_regulator_s = models.BooleanField(default=False)
    fan_regulator_c = models.BooleanField(default=False)

    switch_board_s = models.BooleanField(default=False)
    switch_board_c = models.BooleanField(default=False)

    cupboard_s_s = models.BooleanField(default=False)
    cupboard_s_c = models.BooleanField(default=False)

    cupboard_safe_s = models.BooleanField(default=False)
    cupboard_safe_c = models.BooleanField(default=False)

    book_rack_s = models.BooleanField(default=False)
    book_rack_c = models.BooleanField(default=False)

    writing_table_s = models.BooleanField(default=False)
    writing_table_c = models.BooleanField(default=False)

    chair_s = models.BooleanField(default=False)
    chair_c = models.BooleanField(default=False)

    door_s = models.BooleanField(default=False)
    door_c = models.BooleanField(default=False)

    door_lock_s = models.BooleanField(default=False)
    door_lock_c = models.BooleanField(default=False)

    window_shutters_s = models.BooleanField(default=False)
    window_shutters_c = models.BooleanField(default=False)

    window_panes_s = models.BooleanField(default=False)
    window_panes_c = models.BooleanField(default=False)

    bed_s = models.BooleanField(default=False)
    bed_c = models.BooleanField(default=False)

    mattress_s = models.BooleanField(default=False)
    mattress_c = models.BooleanField(default=False)

    walls_s = models.BooleanField(default=False)
    walls_c = models.BooleanField(default=False)

    hot_air_regulator_s = models.BooleanField(default=False)
    hot_air_regulator_c = models.BooleanField(default=False)

    # Who filled it
    filled_by_student = models.ForeignKey(Student, null=True, blank=True, on_delete=models.SET_NULL, related_name='inventory_forms')

    # Control edit access
    allow_edit = models.BooleanField(default=True)

    def __str__(self):
        return f"Inventory for {self.hostel_room}"



# -------------------------------------room change----------------------------


from django.db import models
from django.core.exceptions import ValidationError
from core.models import HostelRoom, Student, Hostel_Management


class RoomChangeRequest(models.Model):
    REQUEST_TYPES = [
        ('swap', 'Swap Rooms'),
        ('change', 'Change Room'),
    ]

    request_type = models.CharField(max_length=10, choices=REQUEST_TYPES)
    
    requested_by = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='initiated_requests')
    requested_with = models.ForeignKey(Student, null=True, blank=True, on_delete=models.SET_NULL, related_name='received_requests')

    # Target room for 'change' requests
    room = models.ForeignKey(HostelRoom, null=True, blank=True, on_delete=models.SET_NULL)

    approved_for_apply = models.BooleanField(default=False)
    approved = models.BooleanField(default=False)
    rejected = models.BooleanField(default=False)

    priority_total = models.FloatField(default=0.0)

    approved_by = models.ForeignKey(
        Hostel_Management,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        limit_choices_to=models.Q(role__in=['warden', 'chief_warden']),
        related_name='room_change_requests_approved'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    # def clean(self):
    #     # Ensure mutual exclusivity
    #     if self.approved and self.rejected:
    #         raise ValidationError("A request cannot be both approved and rejected.")

    #     # Logic for SWAP request
    #     if self.request_type == 'swap':
    #         if not self.requested_with:
    #             raise ValidationError("Requested with must be specified for a swap request.")
    #         if self.requested_by == self.requested_with:
    #             raise ValidationError("Requester and requested with cannot be the same student.")
    #         if self.room:
    #             raise ValidationError("Room must not be filled for a swap request.")

    #     # Logic for CHANGE request
    #     elif self.request_type == 'change':
    #         if not self.room:
    #             raise ValidationError("Room must be specified for a change request.")

    #         if self.room.capacity == 1:
    #             if self.requested_with:
    #                 raise ValidationError("Requested with must not be filled for a single-occupancy room.")
    #         elif self.room.capacity == 2:
    #             if not self.requested_with:
    #                 raise ValidationError("Requested with must be filled for a double-occupancy room.")
    #             # Validate room availability
    #             current_occupants = Student.objects.filter(room=self.room).exclude(id__in=[self.requested_by.id, self.requested_with.id]).count()
    #             if current_occupants > 0:
    #                 raise ValidationError("Room does not have enough space for both students.")
    #         else:
    #             raise ValidationError("Invalid room capacity.")

    #     # If rejected, no further validation is needed
    #     if self.rejected:
    #         return

    # def save(self, *args, **kwargs):
    #     # Only calculate priority — don't validate
    #     if self.requested_by and self.requested_with:
    #         self.priority_total = self.requested_by.priority_score + self.requested_with.priority_score
    #     elif self.requested_by:
    #         self.priority_total = self.requested_by.priority_score

    #     super().save(*args, **kwargs)


    def __str__(self):
        return f"{self.request_type.title()} Request by {self.requested_by.name}"



from django.db import models
from core.models import Student  # Adjust the import path if Student is in another app

class Complaint(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='complaints')
    title = models.CharField(max_length=255)
    description = models.TextField()
    resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Complaint by {self.student.user.username} - {self.title}"
