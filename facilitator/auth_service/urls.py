from django.urls import path
from .views import login_view, logout_view, callback_view, home_view, dashboard_view, get_roles

app_name = 'auth_service'

urlpatterns = [
    path('', home_view, name='home'),
    path('dashboard/', dashboard_view, name='dashboard'),
    path('api/roles', get_roles, name='get_roles'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('callback/', callback_view, name='callback'),  # this is where Keycloak will redirect after login
]   