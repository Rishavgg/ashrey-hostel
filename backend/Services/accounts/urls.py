from django.urls import path
from . import views

from .views import register_student
from .views import register_hostel_manager
from .views import search_students
from django.urls import path
from .views import search_students, edit_student, hostel_room_list_view ,bulk_upload_rooms
from . import views
# upload_rooms, download_excel_template




urlpatterns = [
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('warden_dashboard/', views.warden_dashboard, name='warden_dashboard'),
    path('student_dashboard/', views.student_dashboard, name='student_dashboard'),
    path('chief_warden_dashboard/', views.chief_warden_dashboard, name='chief_warden_dashboard'),
    path('caretaker_dashboard/', views.caretaker_dashboard, name='caretaker_dashboard'),
    path('guard_dashboard/', views.guard_dashboard, name='guard_dashboard'),
    # path('register/', views.register_user, name='register_user'),
    path('register/success/', views.user_success, name='user_success'),
    path('register/student/', register_student, name='student-register'),
    path('register/manager/', register_hostel_manager, name='hostel-manager-register'),
    path('register/student/bulk/', views.bulk_upload_students, name='bulk-upload-students'),
    path('search/students/', search_students, name='search-students'),
    path('student/<int:student_id>/edit/', edit_student, name='edit-student'),
    path('room-management/', hostel_room_list_view, name='room_management'),
    path('room/<int:pk>/edit/', views.edit_room_view, name='edit_room'),
    

    path('rooms/upload/', bulk_upload_rooms, name='upload_rooms'),
    
    
    # path('rooms/upload/', upload_rooms, name='upload_rooms'),
    # path('rooms/template/download/', download_excel_template, name='download_excel_template'),
    path('warden_dashboard/', views.warden_dashboard, name='warden_dashboard'),
    path('manage_students/', views.manage_students, name='manage_students'),
    # path('manual_allocation/', views.manual_allocation, name='manual_allocation'),
    # path('mass_allocation/', views.mass_allocation, name='mass_allocation'),
    # path('allocation_request/', views.allocation_request, name='allocation_request'),
    path('outpass_requests/', views.outpass_requests, name='outpass_requests'),
    path('out_of_campus/', views.out_of_campus, name='out_of_campus'),
    path('outpass_history/', views.outpass_history, name='outpass_history'),
    path('manage_rooms/', views.manage_rooms, name='manage_rooms'),


]
