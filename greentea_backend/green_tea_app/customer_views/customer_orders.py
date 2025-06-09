from django.http import JsonResponse

from ..models import Customer, OrderBundle, Cart, Product

from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated,AllowAny

from ..views_dependancies  import *


@csrf_exempt
@api_view(['PATCH'])
def customer_cart_update_items(request):
    print(request)
    customer_id = request.data.get("customer_id")
    request_items_list = request.data.get("items")

    if not request_items_list:
        return Response({"error": "Please provide items for cart."}, status=status.HTTP_400_BAD_REQUEST) 
    
    if not customer_id:
        return Response({"error": "customer ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        customer = Customer.objects.filter(customer_id=customer_id).first()
        customer.cart.payment_method = 'Cash'
        cart_items = {item["product_id"]: item for item in customer.cart.items}

        # Update existing items or add new items
        for request_item in request_items_list:
            product_id = request_item["product_id"]

            if product_id in cart_items:
                # Update existing item
                cart_items[product_id]["quantity"] += request_item["quantity"]
                if cart_items[product_id]["quantity"]  <= 0:
                    del cart_items[product_id]
                else:
                    cart_items[product_id]["sum_price"] += request_item["sum_price"]
            else:
                # Add new item to the cart
                cart_items[product_id] = {
                    "product_id": product_id,
                    "product_name": request_item["product_name"],
                    "quantity": request_item["quantity"],
                    "sum_price": request_item["sum_price"],
                }
        customer.cart.items = list(cart_items.values())
        customer.cart.total_cart_price = sum(item["sum_price"] for item in customer.cart.items)
        customer.cart.save()

        return Response({"message": "cart updated!", "cart": {
                                                                "items": customer.cart.items,
                                                                "total_cart_price": customer.cart.total_cart_price,
                                                                "payment_method": customer.cart.payment_method,
                                                            }}, status=status.HTTP_200_OK)
    except Customer.DoesNotExist:
        return Response({"error": "customer not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print("Error occurred:", e)
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['PATCH'])
def customer_cart_payment_method_change(request):
    customer_id = request.data.get("customer_id")
    new_payment_method = request.data.get("payment_method")

    if not new_payment_method:
        return Response({"error": "Please provide payment method"}, status=status.HTTP_400_BAD_REQUEST)

    if not customer_id:
        return Response({"error": "customer ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        customer = Customer.objects.filter(customer_id=customer_id).first()
        customer.cart.payment_method = new_payment_method
        customer.cart.save()
        return Response({"message": "payment method updated!."}, status=status.HTTP_200_OK)
    except Customer.DoesNotExist:
        return Response({"error": "customer not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['POST'])
def customer_cart_checkout_to_orderbundle(request):
    customer_id = request.data.get("customer_id")
    new_payment_method = request.data.get("payment_method")

    if not customer_id:
        return Response({"error": "customer ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    try:
        customer = Customer.objects.filter(customer_id=customer_id).first()
        cart = customer.cart

        order = OrderBundle(
            orderbundle_id= generate_8char_id(),
            customer_username= customer.customer_username,
            customer_id= customer.customer_id,
            payment_method = new_payment_method,
            price = cart.total_cart_price,
            items = cart.items
        )
        order.save()

        cart.payment_method='Empty'
        cart.total_cart_price=0
        cart.items=[]
        cart.save()

        return Response({"message": "order sent!",
            "orderbundle_id": order.orderbundle_id,
            "price": order.price,
            "items": order.items,
            "customer_username": order.customer_username,
            "payment_method": order.payment_method,
            }, status=status.HTTP_200_OK)

    except Customer.DoesNotExist:
        return Response({"error": "customer not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['GET'])
def customer_order_history(request):
    try:
        customer_id = request.data.get("customer_id")
        
        if not customer_id:
            return Response(
                {"error": "Customer ID is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Attempt to fetch orders
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
        
        # If no orders found, return empty list instead of raising error
        if not order_history.exists():
            return Response({"orders_retrieved": [], "message": "No orders found for this customer"},status=status.HTTP_200_OK)

        return Response({"orders_retrieved": list(order_history)},status=status.HTTP_200_OK)

    except DatabaseError as e:
        logger.error(f"Database error in customer_order_history: {str(e)}")
        return Response(
            {"error": "Database error occurred while fetching order history"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    except Exception as e:
        logger.error(f"Unexpected error in customer_order_history: {str(e)}")
        return Response(
            {"error": "An unexpected error occurred"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@csrf_exempt
@api_view(['PATCH'])
def customer_orderbundle_cancel_request(request):
    orderbundle_id = request.data.get("orderbundle_id")
    new_cancel_request = request.data.get("cancel_request")

    if not new_cancel_request:
        return Response({"error": "Please provide cancel request"}, status=status.HTTP_400_BAD_REQUEST)

    if not orderbundle_id:
        return Response({"error": "order ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    try:
        orderbundle = OrderBundle.objects.filter(orderbundle_id=orderbundle_id).first()
        orderbundle.request_cancellation = new_cancel_request
        orderbundle.save()
        return Response({"message": "cancel request receieved!."}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['PATCH'])
def customer_empty_cart(request):
    customer_id = request.data.get("customer_id")

    if not customer_id:
        return Response({"error": "customer ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        customer = Customer.objects.filter(customer_id=customer_id).first()
        cart = customer.cart
        cart.payment_method='Empty'
        cart.total_cart_price=0
        cart.items=[]
        cart.save()
        return Response({"message": "cart emptied!."}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
@api_view(['POST'])
def customer_get_cart(request):
    customer_id = request.data.get("customer_id")
    print(customer_id)

    if not customer_id:
        return Response({"error": "customer ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        cart = Cart.objects.filter(customer_id_ref=customer_id).values(
            'payment_method',
            'total_cart_price',
            'items'
        )
        return Response({"cart": cart}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)