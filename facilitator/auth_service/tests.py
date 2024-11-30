from django.test import TestCase, Client
from django.urls import reverse
from unittest.mock import patch, MagicMock
from django.contrib.auth.models import User, Group
from auth_service.models import CustomUser
from jose import jwt
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "facilitator.settings")


class AuthServiceViewsTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.mock_token = "mocked.jwt.token"
        self.mock_roles = ["warden", "chief_warden"]
        self.user = User.objects.create_user(
            username="testuser", email="test@example.com", password="password"
        )
        self.group = Group.objects.create(name="warden")
        self.user.groups.add(self.group)
        self.user.save()

    @staticmethod
    def mock_decode_token(token, *args, **kwargs):
        if token == "invalid.token":
            raise jwt.JWTError("Invalid token")
        return {
            "preferred_username": "testuser",
            "email": "test@example.com",
            "given_name": "Test",
            "family_name": "User",
            "realm_access": {"roles": ["warden", "chief_warden"]},
        }

    @patch("auth_service.views.keycloak_openid.auth_url")
    def test_login_view_redirects_to_keycloak(self, mock_auth_url):
        mock_auth_url.return_value = "http://mock-auth-url"
        response = self.client.get(reverse("auth_service:login"))
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response["Location"], "http://mock-auth-url")

    def test_logout_view_redirects_to_keycloak(self):
        response = self.client.get(reverse("auth_service:logout"))
        self.assertEqual(response.status_code, 302)
        self.assertIn("protocol/openid-connect/logout", response["Location"])

    @patch("auth_service.views.keycloak_openid.token")
    @patch("auth_service.views.decode_token_without_verification", side_effect=mock_decode_token)
    def test_callback_view_successful_login(self, mock_decode, mock_token):
        mock_token.return_value = {"access_token": self.mock_token}
        response = self.client.get(reverse("auth_service:callback"), {"code": "authcode"})
        self.assertEqual(response.status_code, 302)
        self.assertIn("warden-dashboard", response["Location"])
        self.assertIn(f"token={self.mock_token}", response["Location"])
        self.assertIn("roles=warden,chief_warden", response["Location"])

    @patch("auth_service.views.decode_token_without_verification", side_effect=mock_decode_token)
    def test_get_roles_success(self, mock_decode):
        response = self.client.get(reverse("auth_service:get_roles"), HTTP_AUTHORIZATION=f"Bearer {self.mock_token}")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"roles": self.mock_roles})

    def test_get_roles_missing_token(self):
        response = self.client.get(reverse("auth_service:get_roles"))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"error": "No token provided"})

    @patch("auth_service.views.decode_token_without_verification", side_effect=jwt.JWTError)
    def test_get_roles_invalid_token(self, mock_decode):
        response = self.client.get(reverse("auth_service:get_roles"), HTTP_AUTHORIZATION="Bearer invalid.token")
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json(), {"error": "Invalid token"})

    def test_home_view_authenticated(self):
        self.client.login(username="testuser", password="password")
        response = self.client.get(reverse("auth_service:home"))
        self.assertEqual(response.status_code, 200)

    def test_dashboard_view_unauthenticated(self):
        response = self.client.get(reverse("auth_service:dashboard_view"))
        self.assertEqual(response.status_code, 302)  # Redirect to login
