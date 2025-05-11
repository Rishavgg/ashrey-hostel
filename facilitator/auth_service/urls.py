from django.urls import path
from .views import login_view, logout_view, callback_view, home_view, dashboard_view, get_roles, debug_keycloak_connection

app_name = 'auth_service'

urlpatterns = [
    path('', home_view, name='home'),
    path('debug-keycloak/', debug_keycloak_connection, name='debug_keycloak'),
    path('check', home_view, name='health_check'),
    path('api/roles', get_roles, name='get_roles'),
    path('employee-login/', login_view, name='login'),
    path('employee-logout/', logout_view, name='logout'),
    path('callback/', callback_view, name='callback'),  # this is where Keycloak will redirect after login
]