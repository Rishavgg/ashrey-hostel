from django.urls import path
from . import views

from .views import register_student
from .views import register_hostel_manager
from .views import search_students
from django.urls import path
from .views import search_students, edit_student




urlpatterns = [
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('warden_dashboard/', views.warden_dashboard, name='warden_dashboard'),
    path('student_dashboard/', views.student_dashboard, name='student_dashboard'),
    path('chief_warden_dashboard/', views.chief_warden_dashboard, name='chief_warden_dashboard'),
    path('caretaker_dashboard/', views.caretaker_dashboard, name='caretaker_dashboard'),
    path('guard_dashboard/', views.guard_dashboard, name='guard_dashboard'),
    path('register/', views.register_user, name='register_user'),
    path('register/success/', views.user_success, name='user_success'),
    path('register/student/', register_student, name='student-register'),
    path('register/manager/', register_hostel_manager, name='hostel-manager-register'),
    path('register/student/bulk/', views.bulk_upload_students, name='bulk-upload-students'),
    path('search/students/', search_students, name='search-students'),
    path('student/<int:student_id>/edit/', edit_student, name='edit-student'),
    
    


]
