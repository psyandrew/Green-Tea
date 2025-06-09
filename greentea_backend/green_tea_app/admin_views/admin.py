from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError, ObjectDoesNotExist, PermissionDenied
from django.db import IntegrityError

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from ..models import Admin, Customer, AuthTokenAdmin
from ..views_dependancies import *


@csrf_exempt
@api_view(['POST'])
def admin_register(request):
    if not all(field in request.data for field in ["username", "password", "email"]):
        return Response({"error": "Missing required fields: username, password, and email."}, status=status.HTTP_400_BAD_REQUEST)

    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email")

    if Admin.objects.filter(username=username).exists():
        return Response({"error": "Admin with this username already exists."}, status=status.HTTP_400_BAD_REQUEST)

    if Admin.objects.filter(email=email).exists():
        return Response({"error": "Admin with this email already exists."}, status=status.HTTP_400_BAD_REQUEST)

    hashed_password = make_password(password)

    admin = Admin(
        admin_id=generate_8char_id(),
        username=username,
        email=email,
        password=hashed_password
    )
    try:
        admin.save()
        return Response({"message": "Admin registered successfully."}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
@api_view(['OPTIONS', 'POST'])
def admin_login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Username and password are required."}, status=400)

    try:
        admin = Admin.objects.get(username=username)
    except Admin.DoesNotExist:
        return Response({"error": "Invalid username or password."}, status=401)

    if not check_password(password, admin.password):
        return Response({"error": "Invalid username or password."}, status=401)

    token = generate_token(admin.admin_id, 'admin')

    return Response({"message": "Login successful", "token": token}, status=200)

@csrf_exempt
@api_view(["POST"])
def admin_check_auth(request):
    auth_header = request.headers.get("Authorization")
    user_type  = request.data.get("user_type")
    if not auth_header:
        return Response({"error": "No authentication token provided."}, status=status.HTTP_401_UNAUTHORIZED)

    # Remove 'Bearer ' prefix
    token = auth_header.split(" ")[1] if auth_header.startswith("Bearer ") else auth_header

    if not token:
        return Response({"error": "No authentication token provided."}, status=status.HTTP_401_UNAUTHORIZED)

    admin_id = validate_token(token, user_type)

    if admin_id == 'logged':
        return Response({"message": "Token valid"}, status=200)
    else:
        return Response({"error": "Invalid or expired token"}, status=status.HTTP_401_UNAUTHORIZED)


@csrf_exempt
@api_view(["POST"])
def admin_logout(request):
    auth_header = request.headers.get("Authorization")
    user_type = request.data.get("user_type")

    if not auth_header:
        return Response({"error": "No authentication token provided."}, status=status.HTTP_401_UNAUTHORIZED)
   
    token = auth_header.split(" ")[1] if auth_header.startswith("Bearer ") else auth_header

    result = revoke_token(token, user_type)

    if result == 'success':
        return Response({"message": "Token revoked successfully."}, status=200)
    else:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['GET'])
def admin_get_admin_all(request):
    try:
        admins = Admin.objects.all().values(
            'admin_id',
            'username',
            'created_on'
        )
        return Response({"admins": list(admins)}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['PATCH'])
def admin_update_password(request):
    new_password = request.data.get("new_password")
    if not new_password:
        return Response({"error": "New password is required."}, status=status.HTTP_400_BAD_REQUEST)

    admin_id = request.session.get('admin_id')
    if not admin_id:
        return Response({"error": "Admin is not logged in."}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        admin = Admin.objects.get(admin_id=admin_id)
        admin.password = make_password(new_password)
        admin.save()
        return Response({"message": "Password updated successfully."}, status=status.HTTP_200_OK)
    except Admin.DoesNotExist:
        return Response({"error": "Admin not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['PATCH'])
def admin_update_email(request):
    new_email = request.data.get("email")

    if not new_email:
        return Response({"error": "New email field is required."}, status=status.HTTP_400_BAD_REQUEST)

    admin_id = request.session.get('admin_id')

    if not admin_id:
        return Response({"error": "Admin is not logged in."}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        admin = Admin.objects.get(admin_id=admin_id)
        admin.email = new_email
        admin.save()
        return Response({"message": "Email updated successfully."}, status=status.HTTP_200_OK)
    except Admin.DoesNotExist:
        return Response({"error": "Admin not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['GET'])
def admin_get_customer_all(request):
    try:
        customers = Customer.objects.all()
          
        customer_list= []

        for customer in customers:
            customer_list.append({
                "customer_username": customer.customer_username,
                "customer_id": customer.customer_id,
                "contact_number": customer.contact_number,
                "email": customer.email,
                "cart": {
                    "payment_method": customer.cart.payment_method,
                    "total_cart_price": customer.cart.total_cart_price,
                    "customer_id_ref": customer.cart.customer_id_ref,
                    "in_cart": customer.cart.items
                }
            })

        
        return Response({"database": customer_list}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['POST'])
def admin_get_customer(request):
    customer_id = request.data.get("customer_id")

    if not customer_id:
        return Response({"error": "Customer ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        customer = Customer.objects.filter(customer_id=customer_id).values(
            'customer_username',
            'customer_id',
            'created_on',
            'contact_number',
            'email',
            'cart'
        ).first()

        if not customer:
            return Response({"error": "Customer not found."}, status=status.HTTP_404_NOT_FOUND)

        return Response({"Customer": customer}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)