# Generated by Django 5.2 on 2025-05-03 13:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0003_alter_hostel_management_email'),
    ]

    operations = [
        migrations.RenameField(
            model_name='student',
            old_name='year',
            new_name='grad_year',
        ),
    ]
