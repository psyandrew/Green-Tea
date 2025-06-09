import random
import string
import secrets

from .models import AuthTokenAdmin,AuthTokenCustomer
from datetime import timedelta, datetime


def generate_10char_id():
    #Generate a unique 10-character ID for users (admin or customer).
    return ''.join(random.choices(string.ascii_letters + string.digits, k=10))

def generate_8char_id():
    #Generate a unique 8-character admin ID.
    return ''.join(random.choices(string.ascii_letters + string.digits, k=8))

def generate_6char_id():
    #Generate a unique 6-character product ID.
    return ''.join(random.choices(string.ascii_letters + string.digits, k=6))


def generate_token(user_id, user_type):
    # Generate a 64-char token
    token = secrets.token_hex(32)  
    if user_type == 'admin':
        AuthTokenAdmin.objects.create(token=token, user_id=user_id)

    if user_type == 'customer':
        AuthTokenCustomer.objects.create(token=token, user_id=user_id)

    return token

def validate_token(token, user_type):
    # Fetch the token from the database based on the user type
    if user_type == 'admin':
        auth_token = AuthTokenAdmin.objects.filter(token=token).first()
    elif user_type == 'customer':
        auth_id = AuthTokenCustomer.objects.filter(token=token).first()
        return {'data': auth_id.user_id}

    else:
        return None

    # Check if token exists and is not expired
    if not auth_token or auth_token.is_expired():
        return None
    
    return 'logged'

def revoke_token(token, user_type):
    if user_type == 'admin':
        auth_token = AuthTokenAdmin.objects.filter(token=token).delete()
    elif user_type == 'customer':
        auth_token = AuthTokenCustomer.objects.filter(token=token).delete()
    else:
        return None
    
    return 'success'