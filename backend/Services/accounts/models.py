from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('warden', 'Warden'),
        ('chief_warden', 'Chief Warden'),
        ('caretaker', 'Caretaker'),
        ('guard', 'Guard'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    
    def __str__(self):
        return f"{self.username} ({self.role})"
