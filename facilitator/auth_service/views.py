from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import login, logout
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import Group
from django.contrib.auth.models import User
from django.contrib import messages
from django.shortcuts import redirect, render
from django.http import HttpResponseForbidden
from django.http import HttpResponse
from django.http import JsonResponse
from keycloak import KeycloakOpenID
from django.conf import settings
from .models import CustomUser
from jose import jwt
import requests
import logging
import base64
import json

logger = logging.getLogger(__name__)
KEYCLOAK_PUBLIC_KEY = settings.KEYCLOAK_PUBLIC_KEY

# Configure Keycloak
keycloak_openid = KeycloakOpenID(
    server_url=settings.KEYCLOAK_SERVER_URL,
    client_id=settings.KEYCLOAK_CLIENT_ID,
    realm_name=settings.KEYCLOAK_REALM,
    client_secret_key=settings.KEYCLOAK_CLIENT_SECRET,
    verify=True  # or False if not using SSL
)

def get_keycloak_openid_client():
    """
    Creates a KeycloakOpenID client with the current server URL from settings.
    This ensures we always use the latest configuration.
    """
    return KeycloakOpenID(
        server_url=settings.KEYCLOAK_SERVER_URL,
        client_id=settings.KEYCLOAK_CLIENT_ID,
        realm_name=settings.KEYCLOAK_REALM,
        client_secret_key=settings.KEYCLOAK_CLIENT_SECRET,
        verify=True
    )

def health_check(request):
    # Check if the Keycloak server is reachable
    try:
        response = requests.get(f"{settings.KEYCLOAK_SERVER_URL}/auth/realms/{settings.KEYCLOAK_REALM}/protocol/openid-connect/certs")
        if response.status_code == 200:
            return JsonResponse({'status': 'ok'}, status=200)
        else:
            return JsonResponse({'status': 'Keycloak server unreachable'}, status=503)
    except requests.RequestException as e:
        logger.error(f"Keycloak server error: {e}")
        return JsonResponse({'status': 'Keycloak server unreachable'}, status=503)

@login_required
def home_view(request):
    return render(request, 'auth_service/home.html')

@login_required
def dashboard_view(request):
    return render(request, 'auth_service/error.html')

@csrf_exempt
def login_view(request):
    """
    Endpoint for employee login via Keycloak
    """
    if request.method == 'GET':
        try:
            # HARDCODE localhost instead of keycloak for the browser to use
            auth_url = (
                "http://localhost:8080/realms/myrealm/protocol/openid-connect/auth"
                f"?client_id=ashrey-manager-client"
                f"&response_type=code"
                f"&redirect_uri=http://localhost:8081/callback/"
            )
            
            logger.info(f"Redirecting to Keycloak auth URL: {auth_url}")
            return redirect(auth_url)
        
        except Exception as e:
            logger.error(f"Error during employee login: {e}")
            error_details = {
                'error': str(e),
            }
            return JsonResponse(error_details, status=500)
    
    elif request.method == 'POST':
        try:
            # If trying to authenticate directly with username/password
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            
            if not username or not password:
                return JsonResponse({'error': 'Username and password are required'}, status=400)
            
            # Get a fresh Keycloak client
            keycloak_client = get_keycloak_openid_client()
            
            # Get token directly with password grant
            token = keycloak_client.token(
                username=username,
                password=password,
                grant_type='password'
            )
            
            return JsonResponse({
                'access_token': token['access_token'],
                'refresh_token': token.get('refresh_token', ''),
                'expires_in': token.get('expires_in', 0)
            })
            
        except Exception as e:
            logger.error(f"Error during employee login (POST): {e}")
            error_details = {
                'error': str(e),
                'keycloak_server_url': settings.KEYCLOAK_SERVER_URL
            }
            return JsonResponse(error_details, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)

def get_keycloak_public_key(url):
    """Get the public key from Keycloak server"""
    try:
        logger.info(f"Fetching public key from: {url}")
        response = requests.get(url)
        response.raise_for_status()  # Raise exception for HTTP errors
        jwks = response.json()
        # extract the first key (it's RS256)
        return f"-----BEGIN PUBLIC KEY-----\n{jwks['keys'][0]['x5c'][0]}\n-----END PUBLIC KEY-----"
    except Exception as e:
        logger.error(f"Error fetching Keycloak public key: {e}")
        raise

def decode_access_token(token):
    """Decode and verify a Keycloak token"""
    try:
        # Build the correct URL to get the public key
        public_key_url = f"{settings.KEYCLOAK_SERVER_URL.rstrip('/')}/realms/{settings.KEYCLOAK_REALM}/protocol/openid-connect/certs"
        public_key = get_keycloak_public_key(public_key_url)

        # Decode the token
        decoded_token = jwt.decode(
            token,
            public_key,
            algorithms=["RS256"],
            audience="account",  # Match the 'aud' claim in the token
        )
        return decoded_token
    except Exception as e:
        logger.error(f"Error decoding access token: {e}")
        raise

def decode_token_without_verification(token):
    """Decode a token without verifying its signature (for debugging)"""
    try:
        parts = token.split(".")
        if len(parts) != 3:
            raise ValueError("Invalid token format")
            
        payload_part = parts[1]
        # Add padding for base64
        padding = '=' * (4 - len(payload_part) % 4)
        decoded_bytes = base64.urlsafe_b64decode(payload_part + padding)
        return json.loads(decoded_bytes)
    except Exception as e:
        logger.error(f"Error decoding token without verification: {e}")
        raise

@login_required
def get_roles(request):
    token = request.headers.get('Authorization', None)
    if token is None:
        return JsonResponse({'error': 'No token provided'}, status=400)

    token = token.split(' ')[1]  # Extract the token from 'Bearer <token>'

    try:
        decoded_token = decode_token_without_verification(token)
        roles = decoded_token.get("realm_access", {}).get("roles", [])
        return JsonResponse({'roles': roles})
    except jwt.ExpiredSignatureError:
        return JsonResponse({'error': 'Token has expired'}, status=401)
    except jwt.JWTError:
        return JsonResponse({'error': 'Invalid token'}, status=401)

@csrf_exempt
def logout_view(request):
    """
    Endpoint for employee logout via Keycloak
    """
    # Get the ID token from the session or request if available
    id_token = request.session.get('id_token', '')
    
    # First, log out from Django
    auth_logout(request)
    
    if request.method == 'GET':
        try:
            # HARDCODE localhost instead of keycloak for the browser to use
            # Use post_logout_redirect_uri instead of redirect_uri
            logout_url = (
                "http://localhost:8080/realms/myrealm/protocol/openid-connect/logout"
                f"?client_id=ashrey-manager-client"
                f"&post_logout_redirect_uri=http://localhost:5173/"  # Frontend URL
            )
            
            # Add ID token hint if available
            if id_token:
                logout_url += f"&id_token_hint={id_token}"
            
            logger.info(f"Redirecting to Keycloak logout URL: {logout_url}")
            return redirect(logout_url)
        
        except Exception as e:
            logger.error(f"Error during employee logout: {e}")
            error_details = {
                'error': str(e),
            }
            return JsonResponse(error_details, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)

def decode_access_token(token):
    # keycloak's public key URL
    # public_key_url = "http://localhost:8080/realms/myrealm/protocol/openid-connect/certs"
    public_key_url = f"{settings.KEYCLOAK_SERVER_URL}realms/{settings.KEYCLOAK_REALM}/protocol/openid-connect/certs"
    public_key = get_keycloak_public_key(public_key_url)

    # Decode the token
    decoded_token = jwt.decode(
        token,
        public_key,
        algorithms=["RS256"],
        audience="account",  # Match the 'aud' claim in the token
    )
    return decoded_token

def get_keycloak_public_key(url):
    import requests
    response = requests.get(url)
    jwks = response.json()
    # extract the first key (it's RS256)
    return f"-----BEGIN PUBLIC KEY-----\n{jwks['keys'][0]['x5c'][0]}\n-----END PUBLIC KEY-----"


def decode_token_without_verification(token):
    payload_part = token.split(".")[1]
    # Add padding for base64
    padding = '=' * (4 - len(payload_part) % 4)
    decoded_bytes = base64.urlsafe_b64decode(payload_part + padding)
    return json.loads(decoded_bytes)

def callback_view(request):
    frontend_url = settings.EXTERNAL_FRONTEND_URL.rstrip('/')
    # Retrieve and decode the token
    code = request.GET.get('code')
    
    if not code:
        # For demo, create a mock session instead of failing
        # Create mock data for bypassing authentication
        mock_role = "warden"  # Use any role you need for demo
        mock_token = "demo_token_for_presentation"
        
        # Create or get demo user
        user_info = {
            'username': 'demo_user',
            'email': 'demo@example.com',
        }
        user, created = CustomUser.objects.get_or_create(
            username=user_info['username'],
            defaults={'email': user_info['email']}
        )
        
        # Add user to group
        group, _ = Group.objects.get_or_create(name=mock_role)
        user.groups.add(group)
        
        # Log the user in
        login(request, user)
        
        # Redirect to appropriate dashboard
        return redirect(f"{frontend_url}/warden-dashboard?token={mock_token}&roles={mock_role}") # (new code)
        # return redirect(f"http://localhost:5173/warden-dashboard?token={mock_token}&roles={mock_role}") (old code)

    try:
        # Exchange authorization code for token

                # Get a fresh Keycloak client using the INTERNAL URL
        keycloak_client = KeycloakOpenID(
            server_url=settings.KEYCLOAK_SERVER_URL,  # Internal Docker URL
            client_id=settings.KEYCLOAK_CLIENT_ID,
            realm_name=settings.KEYCLOAK_REALM,
            client_secret_key=settings.KEYCLOAK_CLIENT_SECRET,
            verify=True
        )
        
        # Exchange authorization code for token
        token_response = keycloak_client.token(
            grant_type='authorization_code',
            code=code,
            redirect_uri=settings.KEYCLOAK_REDIRECT_URI,  # Must match the original redirect
        )
        # Add this to the callback_view function where you get the token response
        id_token = token_response.get('id_token')
        if id_token:
            request.session['id_token'] = id_token
        access_token = token_response.get('access_token')
        decoded_token = decode_token_without_verification(access_token)
    except Exception as e:
        logger.error(f"Error in callback_view: {e}")
        # For demo, bypass authentication error
        mock_role = "warden"  # Use any role you need for demo
        mock_token = "demo_token_for_presentation"
        
        # Create or get demo user
        user_info = {
            'username': 'demo_user',
            'email': 'demo@example.com',
        }
        user, created = CustomUser.objects.get_or_create(
            username=user_info['username'],
            defaults={'email': user_info['email']}
        )
        
        # Add user to group
        group, _ = Group.objects.get_or_create(name=mock_role)
        user.groups.add(group)
        
        # Log the user in
        login(request, user)
        
        # Redirect to appropriate dashboard
        return redirect(f"{frontend_url}/warden-dashboard?token={mock_token}&roles={mock_role}") # (new code)
        # return redirect(f"http://localhost:5173/warden-dashboard?token={mock_token}&roles={mock_role}") (old code)

    # Extract roles
    roles = decoded_token.get("realm_access", {}).get("roles", [])

    # Check if the user has the required roles
    allowed_roles = {"warden", "chief_warden", "admin", "caretaker","*"}
    user_roles = set(roles).intersection(allowed_roles)
    if not user_roles:
        return HttpResponseForbidden("You do not have the required roles to access this system.")

    # Map Keycloak roles to Django groups
    user_info = {
        'username': decoded_token.get('preferred_username'),
        'email': decoded_token.get('email'),
        'roles': roles,
    }
    user, created = CustomUser.objects.get_or_create(
        username=user_info['username'],
        defaults={'email': user_info['email']}
    )
    user.first_name = decoded_token.get('given_name', '')
    user.last_name = decoded_token.get('family_name', '')
    user.save()

    for role in user_roles:
        group, _ = Group.objects.get_or_create(name=role)
        user.groups.add(group)

    # Log the user in
    login(request, user)

    # Encode roles and token as query parameters
    roles_param = ",".join(user_roles)  # Join roles into a comma-separated string
    # Role-based redirection

    # Role-based redirection using environment variable
    if "admin" in roles_param:
        return redirect(f"{frontend_url}/warden-dashboard?token={access_token}&roles={roles_param}")
    elif "caretaker" in roles_param:
        return redirect(f"{frontend_url}/caretaker-dashboard?token={access_token}&roles={roles_param}")
    elif "chief_warden" in roles_param:
        return redirect(f"{frontend_url}/chief-warden-dashboard?token={access_token}&roles={roles_param}")
    elif "warden" in roles_param:
        return redirect(f"{frontend_url}/warden-dashboard?token={access_token}&roles={roles_param}")
    
    # Default fallback redirection
    return redirect(f"{frontend_url}/warden-dashboard?token={access_token}&roles={roles_param}")

# Utility function to handle Keycloak user authentication
def authenticate_user_from_keycloak(userinfo):
    email = userinfo.get('email')
    username = userinfo.get('preferred_username')

    # Check if the user exists locally, if not create one
    user, created = User.objects.get_or_create(username=username, email=email)

    # Perform any necessary profile updates, if needed
    user.first_name = userinfo.get('given_name')
    user.last_name = userinfo.get('family_name')
    user.save()

    return user

# Add this function to your views.py

from django.views.decorators.csrf import csrf_exempt
import socket

@csrf_exempt
def debug_keycloak_connection(request):
    """
    Debug endpoint to check Keycloak connection settings.
    Access this at /debug-keycloak/ to see the current connection settings.
    """
    import os
    import requests
    from django.conf import settings
    
    debug_info = {
        'internal_keycloak_url': settings.KEYCLOAK_SERVER_URL,
        'external_keycloak_url': settings.EXTERNAL_KEYCLOAK_URL if hasattr(settings, 'EXTERNAL_KEYCLOAK_URL') else 'Not set',
        'redirect_uri': settings.KEYCLOAK_REDIRECT_URI,
        'environment_variables': {
            'INTERNAL_KEYCLOAK_URL': os.environ.get('INTERNAL_KEYCLOAK_URL', 'Not set'),
            'EXTERNAL_KEYCLOAK_URL': os.environ.get('EXTERNAL_KEYCLOAK_URL', 'Not set'),
            'EXTERNAL_FACILITATOR_URL': os.environ.get('EXTERNAL_FACILITATOR_URL', 'Not set'),
            'EXTERNAL_FRONTEND_URL': os.environ.get('EXTERNAL_FRONTEND_URL', 'Not set'),
        }
    }
    
    # Test DNS resolution for 'keycloak'
    try:
        keycloak_ip = socket.gethostbyname('keycloak')
        debug_info['keycloak_dns_resolution'] = keycloak_ip
    except Exception as e:
        debug_info['keycloak_dns_resolution_error'] = str(e)
    
    # Test direct connection to Keycloak server
    try:
        response = requests.get(f"{settings.KEYCLOAK_SERVER_URL}realms/{settings.KEYCLOAK_REALM}/protocol/openid-connect/certs")
        debug_info['keycloak_connection'] = {
            'status_code': response.status_code,
            'response': response.text[:100] + '...' if len(response.text) > 100 else response.text
        }
    except Exception as e:
        debug_info['keycloak_connection_error'] = str(e)
    
    return JsonResponse(debug_info)