from django import forms
from core.models import Outpass

class OutpassForm(forms.ModelForm):
    class Meta:
        model = Outpass
        exclude = ['student', 'approvedcheck', 'rejected', 'approved_by', 'markout', 'markin', 'days_of_leave']
        widgets = {
            'start_date': forms.DateInput(attrs={'type': 'date'}),
            'end_date': forms.DateInput(attrs={'type': 'date'}),
        }
