# Generated by Django 5.2 on 2025-05-03 13:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0002_remove_hostels_unique_hostel_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hostel_management',
            name='email',
            field=models.EmailField(default='', max_length=254, unique=True),
        ),
    ]
