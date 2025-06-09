import secrets
from django.core.cache import cache
from django.contrib.auth.models import AnonymousUser
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from green_tea_app.models import Admin  # Update this if your admin model is named differently

class SecretTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.headers.get("Authorization")
        
        if not token or not token.startswith("Token "):
            return None
        
        token = token.split(" ")[1]  # Extract actual token
        
        # Retrieve admin ID from cache (modify as needed)
        admin_id = cache.get(f"auth_token:{token}")
        
        if not admin_id:
            raise AuthenticationFailed("Invalid or expired token")
        
        try:
            user = Admin.objects.get(admin_id=admin_id)
        except Admin.DoesNotExist:
            raise AuthenticationFailed("User not found")

        return (user, None)

    @staticmethod
    def generate_token(admin_id):
        token = secrets.token_urlsafe(32)
        cache.set(f"auth_token:{token}", admin_id, timeout=3600)  # Store for 1 hour
        return token
