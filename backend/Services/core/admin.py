from django.contrib import admin
from .models import Hostels, Hostel_Management,HostelRoom, Student, Outpass, InventoryForm, RoomChangeRequest


admin.site.register(Hostels)
admin.site.register(HostelRoom)
admin.site.register(Student)
admin.site.register(Hostel_Management)
admin.site.register(Outpass)
admin.site.register(InventoryForm)
admin.site.register(RoomChangeRequest)

