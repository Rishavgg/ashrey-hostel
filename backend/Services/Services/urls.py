
from django.contrib import admin
# from django.urls import path
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('accounts/', include('accounts.urls')),  # Include the accounts app URLs here
    path('', include('accounts.urls')),  # Include the accounts app URLs here
    
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('', include('outpasses.urls')),
    # path('', include('outpasses.urls', namespace='outpasses')),
    path('', include(('outpasses.urls', 'outpasses'), namespace='outpasses')),

    path('', include('maintanance.urls')),
    # path('maintanance/', include('maintanance.urls')),
    path('', include('allocation.urls')),
    # path('allocation/', include('allocation.urls')),

]
