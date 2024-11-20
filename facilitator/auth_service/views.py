from django.shortcuts import redirect, render
from django.contrib.auth import login, logout
from keycloak import KeycloakOpenID
from django.conf import settings
import requests
from django.contrib.auth.decorators import login_required
import logging
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth import logout as auth_logout
from django.shortcuts import redirect
from jose import jwt

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

@login_required
def home_view(request):
    return render(request, 'auth_service/home.html')

def dashboard_view(request):
    return render(request, 'auth_service/error.html')

def login_view(request):
    print(settings.KEYCLOAK_REDIRECT_URI)
    auth_url = keycloak_openid.auth_url(redirect_uri=settings.KEYCLOAK_REDIRECT_URI)
    return redirect(auth_url)

def logout_view(request):
    auth_logout(request)
    
    # redirect to keycloak's logout URL to log out of keycloak as well
    keycloak_logout_url = f"{settings.KEYCLOAK_SERVER_URL}realms/{settings.KEYCLOAK_REALM}/protocol/openid-connect/logout"
    redirect_url = settings.LOGOUT_REDIRECT_URL  # Where to go after logging out
    return redirect(f"{keycloak_logout_url}?redirect_uri={redirect_url}")


def decode_access_token(token):
    # keycloak's public key URL
    public_key_url = "http://localhost:8080/realms/myrealm/protocol/openid-connect/certs"
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
    # Extract the first key (assumes it's RS256)
    return f"-----BEGIN PUBLIC KEY-----\n{jwks['keys'][0]['x5c'][0]}\n-----END PUBLIC KEY-----"

import base64
import json

def decode_token_without_verification(token):
    payload_part = token.split(".")[1]
    # Add padding for base64
    padding = '=' * (4 - len(payload_part) % 4)
    decoded_bytes = base64.urlsafe_b64decode(payload_part + padding)
    return json.loads(decoded_bytes)


def callback_view(request):
    # Assume access_token is retrieved successfully from Keycloak
    logger.info("Callback view accessed")
    print("Entering callback view...")

    # Retrieve the authorization code from the request
    code = request.GET.get('code')
    if not code:
        logger.error("Authorization code not found in request")
        print("Authorization code not found in request")
        messages.error(request, "Authorization failed. Please try again.")
        return HttpResponse(f"Authorization failed. Please try again : {str(e)}", status=400)

    logger.info(f"Authorization code received: {code}")
    print(f"Authorization code received: {code}")

    try:
        token_response = keycloak_openid.token(
            grant_type='authorization_code',
            code=code,
            redirect_uri=settings.KEYCLOAK_REDIRECT_URI,
            client_id=settings.KEYCLOAK_CLIENT_ID,
            client_secret=settings.KEYCLOAK_CLIENT_SECRET,
            scope='openid profile email'
        )
        logger.info("Token exchange completed")
        logger.debug(f"Full token response: {token_response}")
        print("Token exchange completed")
        print(f"Full token response: {token_response}")
    except Exception as e:
        logger.error(f"Token exchange failed: {str(e)}")
        print(f"Token exchange failed: {str(e)}")
        messages.error(request, "Token exchange failed. Please try again.")
        return HttpResponse(f"Token exchange failed: {str(e)}", status=400)

    # Extract access and ID tokens
    access_token = token_response.get('access_token')
    id_token = token_response.get('id_token')
    print(f"Access token: {access_token}")

    if not access_token:
        return HttpResponse("Access token missing", status=400)

    try:
        decoded_token = decode_token_without_verification(access_token)  # Replace with verified decode in prod
        username = decoded_token.get("preferred_username", "Unknown")
        email = decoded_token.get("email", "No email")
        roles = decoded_token.get("realm_access", {}).get("roles", [])

        # Log details
        print(f"Username: {username}, Email: {email}, Roles: {roles}")
        user_info = {
        'username': decoded_token.get('preferred_username'),
        'email': decoded_token.get('email'),
        'roles': decoded_token.get('realm_access', {}).get('roles', [])
    }

        # Set session
        request.session['is_authenticated'] = True
        request.session['user_info'] = user_info
        return redirect('auth_service:dashboard')

    except Exception as e:
        return HttpResponse(f"Error decoding token: {str(e)}", status=400)

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
