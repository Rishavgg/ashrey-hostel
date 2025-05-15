from django import forms
from .models import CustomUser
# from services.models import HostelManagement  # Adjust import as per your model name
from core.models import Hostel_Management
from core.models import Student, Outpass, HostelRoom


class CustomUserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'role']

class HostelManagementForm(forms.ModelForm):
    class Meta:
        model = Hostel_Management
        exclude = ['user']  # We'll set this in the view


# _____________________________________student form_________________________________



# from django import forms
# from django.contrib.auth.forms import UserCreationForm
# from accounts.models import CustomUser
# from core.models import Student

# class StudentUserCreationForm(UserCreationForm):
#     # Extra fields from the Student model
#     name = forms.CharField(max_length=21)
#     enroll_number = forms.IntegerField()
#     student_contact = forms.IntegerField()
#     parent_contact1 = forms.IntegerField()
#     parent_contact2 = forms.IntegerField()
#     cg = forms.FloatField()
#     admn_year = forms.IntegerField()

#     class Meta:
#         model = CustomUser
#         fields = ['username', 'password1', 'password2', 'email']

#     def clean_enroll_number(self):
#         enroll = self.cleaned_data.get('enroll_number')
#         if Student.objects.filter(enroll_number=enroll).exists():
#             raise forms.ValidationError("This enrollment number is already registered.")
#         return enroll

#     def save(self, commit=True):
#         # Save the user (CustomUser)
#         user = super().save(commit=False)
#         user.role = 'student'
#         if commit:
#             user.save()

#             # Create the Student object linked to the user
#             Student.objects.create(
#                 user=user,
#                 name=self.cleaned_data['name'],
#                 enroll_number=self.cleaned_data['enroll_number'],
#                 email=self.cleaned_data['email'],
#                 student_contact=self.cleaned_data['student_contact'],
#                 parent_contact1=self.cleaned_data['parent_contact1'],
#                 parent_contact2=self.cleaned_data['parent_contact2'],
#                 cg=self.cleaned_data['cg'],
#                 admn_year=self.cleaned_data['admn_year'],
#             )
#         return user


from django import forms
from django.contrib.auth.forms import UserCreationForm
from accounts.models import CustomUser
from core.models import Student

class StudentUserCreationForm(UserCreationForm):
    # Extra fields from the Student model
    name = forms.CharField(max_length=21)
    enroll_number = forms.IntegerField()
    student_contact = forms.IntegerField()
    parent_contact1 = forms.IntegerField()
    parent_contact2 = forms.IntegerField()
    cg = forms.FloatField()
    admn_year = forms.IntegerField()
    gender = forms.ChoiceField(
        choices=Student.GENDER_CHOICES,
        widget=forms.RadioSelect,  # You can change this to Select for a dropdown
        required=True
    )

    class Meta:
        model = CustomUser
        fields = ['username', 'password1', 'password2', 'email']

    def clean_enroll_number(self):
        enroll = self.cleaned_data.get('enroll_number')
        if Student.objects.filter(enroll_number=enroll).exists():
            raise forms.ValidationError("This enrollment number is already registered.")
        return enroll

    def save(self, commit=True):
        # Save the user (CustomUser)
        user = super().save(commit=False)
        user.role = 'student'
        if commit:
            user.save()

            # Create the Student object linked to the user
            Student.objects.create(
                user=user,
                name=self.cleaned_data['name'],
                enroll_number=self.cleaned_data['enroll_number'],
                email=self.cleaned_data['email'],
                student_contact=self.cleaned_data['student_contact'],
                parent_contact1=self.cleaned_data['parent_contact1'],
                parent_contact2=self.cleaned_data['parent_contact2'],
                cg=self.cleaned_data['cg'],
                admn_year=self.cleaned_data['admn_year'],
                gender=self.cleaned_data['gender'],  # Save gender field
            )
        return user






# _____________________________________hostel management form_________________________________



from django import forms
from django.contrib.auth.forms import UserCreationForm
from accounts.models import CustomUser
from core.models import Hostel_Management, Hostels

class HostelManagerUserCreationForm(UserCreationForm):
    ROLE_CHOICES = [
        ('warden', 'Warden'),
        ('chief_warden', 'Chief Warden'),
        ('caretaker', 'Caretaker'),
        ('guard', 'Guard'),
    ]


    # Extra fields from Hostel_Management
    name = forms.CharField(max_length=200)
    ph_number = forms.IntegerField()
    email = forms.EmailField()
    role = forms.ChoiceField(choices=ROLE_CHOICES)
    hostel = forms.ModelChoiceField(queryset=Hostels.objects.all(), required=False)

    class Meta:
        model = CustomUser
        fields = ['username', 'password1', 'password2', 'email']

    def clean(self):
        cleaned_data = super().clean()
        role = cleaned_data.get("role")
        hostel = cleaned_data.get("hostel")

        if role != "guard" and hostel is None:
            raise forms.ValidationError("Only guards can have no hostel assigned.")

        return cleaned_data

    def save(self, commit=True):
        # Save the user (CustomUser)
        user = super().save(commit=False)
        user.role = self.cleaned_data['role']
        if commit:
            user.save()

            # Create the Hostel_Management record
            Hostel_Management.objects.create(
                user=user,
                name=self.cleaned_data['name'],
                ph_number=self.cleaned_data['ph_number'],
                email=self.cleaned_data['email'],
                role=self.cleaned_data['role'],
                hostel=self.cleaned_data['hostel']
            )
        return user


# ------------------------srudebt edit form------------------------


from django import forms
from core.models import Student

class StudentEditForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = [
            'name',
            'enroll_number',
            'email',
            'student_contact',
            'parent_contact1',
            'parent_contact2',
            'cg',
            'admn_year',
            'gender',  # Added gender field
        ]

# ------------------------warden dashbaord form------------------------

class StudentForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = [
            'name', 'enroll_number', 'email', 'student_contact',
            'parent_contact1', 'parent_contact2', 'admn_year',
            'gender', 'room', 'hosteller'
        ]
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Student Name'}),
            'enroll_number': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Enrollment Number'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Email'}),
            'student_contact': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Student Phone'}),
            'parent_contact1': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Parent Phone 1'}),
            'parent_contact2': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Parent Phone 2'}),
            'admn_year': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Admission Year'}),
            'gender': forms.Select(attrs={'class': 'form-control'}),
            'room': forms.Select(attrs={'class': 'form-control'}),
            'hosteller': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }

class OutpassForm(forms.ModelForm):
    class Meta:
        model = Outpass
        fields = ['student', 'location', 'reason', 'start_date', 'end_date']
        widgets = {
            'student': forms.Select(attrs={'class': 'form-control'}),
            'location': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Destination'}),
            'reason': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Reason for leave'}),
            'start_date': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
            'end_date': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
        }

class RoomForm(forms.ModelForm):
    class Meta:
        model = HostelRoom
        fields = [
            'room_number', 'capacity', 'floor', 'level',
            'balcony', 'sunny', 'show'
        ]
        widgets = {
            'room_number': forms.NumberInput(attrs={'class': 'form-control'}),
            'capacity': forms.NumberInput(attrs={'class': 'form-control'}),
            'floor': forms.NumberInput(attrs={'class': 'form-control'}),
            'level': forms.NumberInput(attrs={'class': 'form-control'}),
            'balcony': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
            'sunny': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
            'show': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }