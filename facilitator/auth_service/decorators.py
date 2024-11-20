from django.core.exceptions import PermissionDenied

def keycloak_role_required(allowed_roles):
    def decorator(view_func):
        def _wrapped_view(request, *args, **kwargs):
            if request.user.is_authenticated:
                if request.user.role in allowed_roles:
                    return view_func(request, *args, **kwargs)
                else:
                    raise PermissionDenied  # user doesn't have the right role
            else:
                raise PermissionDenied  # user is not authenticated
        return _wrapped_view
    return decorator
