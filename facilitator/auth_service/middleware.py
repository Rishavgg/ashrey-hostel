# middleware.py
from django.utils.deprecation import MiddlewareMixin

class KeycloakTokenMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.user.is_authenticated:
            token = request.session.get('keycloak_token')
            # passing this token in headers to communicate with spring boot
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {token}'