from django.urls import path
from . import views

from .views import register_student
from .views import register_hostel_manager
from .views import search_students
from django.urls import path
from .views import search_students, edit_student, hostel_room_list_view ,bulk_upload_rooms,available_rooms_view
# upload_rooms, download_excel_template




urlpatterns = [
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    
    
    # warden
    path('warden_dashboard/room-management/', hostel_room_list_view, name='room_management'),
    
    
    path('warden_dashboard/', views.warden_dashboard, name='warden_dashboard'),
    path('student_dashboard/', views.student_dashboard, name='student_dashboard'),
    path('chief_warden_dashboard/', views.chief_warden_dashboard, name='chief_warden_dashboard'),
    path('caretaker_dashboard/', views.caretaker_dashboard, name='caretaker_dashboard'),
    path('guard_dashboard/', views.guard_dashboard, name='guard_dashboard'),
    # path('register/', views.register_user, name='register_user'),
    
    path('warden_dashboard/register/success/', views.user_success, name='user_success'),
    
    path('warden_dashboard/register/student/', register_student, name='student-register'),
    
    
    path('chief_warden_dashboard/register/manager/', register_hostel_manager, name='hostel-manager-register'),
    # path('warden_dashboard/register/student/bulk/', views.bulk_upload_students, name='bulk-upload-students'),
    path('register/student/bulk/', views.bulk_upload_students, name='bulk-upload-students'),
    
    path('warden_dashboard/search/students/', search_students, name='search-students'),
    
    path('warden_dashboard/student/<int:student_id>/edit/', edit_student, name='edit-student'),
    
    
    path('warden_dashboard/room/<int:pk>/edit/', views.edit_room_view, name='edit_room'),
    

    path('warden_dashboard/rooms/upload/', bulk_upload_rooms, name='upload_rooms'),
    
    
    # path('rooms/upload/', upload_rooms, name='upload_rooms'),
    # path('rooms/template/download/', download_excel_template, name='download_excel_template'),
    
    
    # student

    path('student_dashboard/available-rooms/', available_rooms_view, name='public_room_list'),

    
    
    


]
