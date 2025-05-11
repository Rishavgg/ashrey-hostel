# allocation/forms.py

from django import forms
from core.models import RoomChangeRequest, HostelRoom, Student

class RoomChangeRequestForm(forms.ModelForm):
    class Meta:
        model = RoomChangeRequest
        fields = ['request_type', 'requested_with', 'room']

    def __init__(self, *args, **kwargs):
        self.student = kwargs.pop('student')
        super().__init__(*args, **kwargs)

        self.fields['requested_with'].queryset = Student.objects.exclude(id=self.student.id)
        self.fields['room'].queryset = HostelRoom.objects.all()

        self.fields['requested_with'].required = False
        self.fields['room'].required = False

