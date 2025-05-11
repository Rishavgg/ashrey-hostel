from django.urls import path
from .views import assign_room_view
from django.shortcuts import render
# allocation/urls.py

from django.urls import path
from . import views

app_name = 'allocation'

urlpatterns = [
    path('assign/<int:room_id>/', assign_room_view, name='assign_room'),
    path('submit/', views.submit_request_view, name='submit_request'),
    path('confirm/<int:request_id>/', views.confirm_request_view, name='confirm_request'),
    path('warden-dashboard/', views.warden_dashboard, name='warden_dashboard'),
    path('submitted/', lambda r: render(r, 'allocation/submitted.html'), name='request_submitted'),
    path('confirmed/', lambda r: render(r, 'allocation/confirmed.html'), name='request_confirmed'),
    path('received-requests/', views.view_received_requests, name='received_requests'),
    # path('incoming/', views.incoming_requests_view, name='incoming_requests'),
    
]
