from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError, ObjectDoesNotExist, PermissionDenied
from django.db import IntegrityError

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from ..models import Customer, Cart, Product, OrderBundle, Ticket, AuthTokenCustomer
from ..views_dependancies import *


@csrf_exempt
@api_view(['POST'])
def customer_register(request):
    if not all(field in request.data for field in ["username", "password", "email", "contact_number"]):
        return Response({"error": "Missing required fields: username, password, contact_number,  and email."}, status=status.HTTP_400_BAD_REQUEST)

    customer_username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email")
    contact_number = request.data.get("contact_number")

    if Customer.objects.filter(customer_username=customer_username).first():
        return Response({"error": "Customer with this username already exists."}, status=status.HTTP_400_BAD_REQUEST)

    if Customer.objects.filter(email=email).first():
        return Response({"error": "Customer with this email already exists."}, status=status.HTTP_400_BAD_REQUEST)

    hashed_password = make_password(password)

    cart = Cart.objects.create(payment_method='Empty', total_cart_price=0) 

    customer = Customer(
        customer_id=generate_8char_id(),
        customer_username=customer_username,
        email=email,
        password=hashed_password,
        contact_number=contact_number,
        cart=cart
    )

    customer.cart.customer_id_ref = customer.customer_id
    customer.cart.save()

    try:
        customer.save()
        return Response({"message": "Registration successful."}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['OPTIONS','POST'])
def customer_login(request):
    customer_username = request.data.get("username")
    password = request.data.get("password")

    if not customer_username or not password:
        return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        customer = Customer.objects.get(customer_username=customer_username)
    except Customer.DoesNotExist:
        return Response({"error": "Invalid username or password."}, status=status.HTTP_401_UNAUTHORIZED)

    if not check_password(password, customer.password):
        return Response({"error": "Invalid username or password."}, status=status.HTTP_401_UNAUTHORIZED)


    # Generate a token
    token = generate_token(customer.customer_id, 'customer')

    cleared_customer = Customer.objects.filter(customer_id=customer.customer_id).values(
            'customer_username',
            'contact_number',
            'email',
            'cart'
            ).first()

    cart = Cart.objects.filter(customer_id_ref=customer.customer_id).values(
            'payment_method',
            'total_cart_price',
            'items'
            )

    order_history = OrderBundle.objects.filter(customer_id=customer.customer_id).values(
            'orderbundle_id',
            'payment_method',
            'items',
            'price',
            'status',
            'request_cancellation',
            'notes'
            )

    ticket_queue = Ticket.objects.filter(customer_id=customer.customer_id).values(
            "ticket_id",
            "subject",
            "ticket_details",
            "created_on",
            "status",
            )

    return Response({"message": "Login successful", "token": token, "customer_id": customer.customer_id,
        "Customer": cleared_customer, 'Cart': cart[0], "order_history": list(order_history), "ticket_history": list(ticket_queue)}, status=200)


@csrf_exempt
@api_view(["POST"])
def customer_check_auth(request):
    auth_header = request.headers.get("Authorization")
    user_type = request.data.get("user_type")

    if not auth_header:
        return Response({"error": "No authentication token provided."}, status=status.HTTP_401_UNAUTHORIZED)

    token = auth_header.split(" ")[1] if auth_header.startswith("Bearer ") else auth_header
    print(token)

    if not token:
        return Response({"error": "No authentication token provided."}, status=status.HTTP_401_UNAUTHORIZED)

    customer = validate_token(token, user_type)

    if customer:
        cleared_customer = Customer.objects.filter(customer_id=customer['data']).values(
            'customer_username',
            'contact_number',
            'email',
            'cart'
            ).first()

        cart = Cart.objects.filter(customer_id_ref=customer['data']).values(
            'payment_method',
            'total_cart_price',
            'items'
            )

        order_history = OrderBundle.objects.filter(customer_id=customer['data']).values(
            'orderbundle_id',
            'payment_method',
            'items',
            'price',
            'status',
            'request_cancellation',
            'notes'
            )

        ticket_queue = Ticket.objects.filter(customer_id=customer['data']).values(
            "ticket_id",
            "subject",
            "ticket_details",
            "created_on",
            "status",
            )

        return Response({"message": "Token valid",'result':'success', 'data':customer['data'] ,
            "Customer": cleared_customer, 'Cart': cart[0], "order_history": list(order_history),
            "ticket_history": list(ticket_queue)}, status=200)
    else:
        return Response({"error": "Invalid or expired token"}, status=status.HTTP_401_UNAUTHORIZED)

@csrf_exempt
@api_view(['POST'])
def customer_logout(request):
    auth_header = request.headers.get("Authorization")
    user_type = request.data.get("user_type")

    if not auth_header:
        return Response({"error": "No authentication token provided."}, status=status.HTTP_401_UNAUTHORIZED)
   
    token = auth_header

    result = revoke_token(token, user_type)

    if result == 'success':
        return Response({"message": "Token revoked successfully."}, status=200)
    else:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['PATCH'])  
def customer_update_password(request):
    new_password = request.data.get("new_password")
    if not new_password:
        return Response({"error": "New password is required."}, status=status.HTTP_400_BAD_REQUEST)

    customer_id = request.session.get('customer_id')
    if not customer_id:
        return Response({"error": "customer is not logged in."}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        customer = Customer.objects.get(customer_id=customer_id)
        customer.password = make_password(new_password)
        customer.save()
        return Response({"message": "Password updated successfully."}, status=status.HTTP_200_OK)
    except customer.DoesNotExist:
        return Response({"error": "customer not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@csrf_exempt
@api_view(['PATCH'])  
def customer_update_email(request):
    new_email = request.data.get("email")

    if not new_email:
        return Response({"error": "email field is required."}, status=status.HTTP_400_BAD_REQUEST)

    customer_id = request.session.get('customer_id')
    if not customer_id:
        return Response({"error": "customer is not logged in."}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        customer = Customer.objects.get(customer_id=customer_id)
        customer.email = new_email
        customer.save()
        return Response({"message": "email updated successfully."}, status=status.HTTP_200_OK)
    except customer.DoesNotExist:
        return Response({"error": "customer not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
@csrf_exempt
@api_view(['PATCH'])  
def customer_update_contact(request):
    new_contact_number = request.data.get("new_contact_number")

    if not new_contact_number:
        return Response({"error": "contact number field is required."}, status=status.HTTP_400_BAD_REQUEST)

    customer_id = request.session.get('customer_id')
    if not customer_id:
        return Response({"error": "customer is not logged in."}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        customer = Customer.objects.get(customer_id=customer_id)
        customer.contact_number = new_contact_number
        customer.save()
        return Response({"message": "contact number updated successfully."}, status=status.HTTP_200_OK)
    except customer.DoesNotExist:
        return Response({"error": "customer not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@csrf_exempt
@api_view(['GET'])
def customer_get_product_all(request):
    try:
        products = Product.objects.all().values(
            'name',
            'product_description',
            'product_type',
            'tea_variant',
            'inventory',
            'on_sale',
            'price'
        )
        return Response({"products": list(products)}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['GET'])
def customer_get_customer_profile(request):
    customer_id = request.data.get("customer_id")

    if not customer_id:
        return Response({"error": "Customer ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        customer = Customer.objects.filter(customer_id=customer_id).values(
            'customer_username',
            'customer_id',
            'contact_number',
            'email',
            'cart'
        ).first()

        if not customer:
            return Response({"error": "Customer not found."}, status=status.HTTP_404_NOT_FOUND)

        cart = Cart.objects.filter(customer_id_ref=customer_id).values(
            'payment_method',
            'total_cart_price',
            'items'
        )

        order_history = OrderBundle.objects.filter(customer_id=customer_id).values(
        'orderbundle_id',
        'payment_method',
        'items',
        'price',
        'status',
        'request_cancellation',
        'notes'
        )

        ticket_queue = Ticket.objects.filter(customer_id=customer_id).values(
            "ticket_id",
            "subject",
            "ticket_details",
            "customer_username",
            "created_on",
            "status",
        )

        return Response({"Customer": customer, 'Cart': cart, "orders retrieved": list(order_history), "ticket queue": list(ticket_queue)}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)        

@csrf_exempt
@api_view(['POST'])
def customer_order_history(request):
    customer_id = request.data.get("customer_id")

    if not customer_id:
        return Response({"error": "customer ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    order_history = OrderBundle.objects.filter(customer_id=customer_id).values(
        'orderbundle_id',
        'payment_method',
        'created_on',
        'items',
        'price',
        'status',
        'request_cancellation',
        'notes'
        )

    return Response({"orders retrieved": list(order_history)}, status=status.HTTP_200_OK)
