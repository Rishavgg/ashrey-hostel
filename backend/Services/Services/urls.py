
from django.contrib import admin
# from django.urls import path
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

admin.site.site_header = "Ashrey Admin"
admin.site.site_title = "Ashrey Admin Portal"
admin.site.index_title = "Welcome to Ashrey Dashboard"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),  # Include the accounts app URLs here
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('outpass/', include('outpasses.urls')),
    path('maintanance/', include('maintanance.urls')),
    

]
