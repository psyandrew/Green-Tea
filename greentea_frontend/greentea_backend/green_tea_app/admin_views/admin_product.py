from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.csrf import csrf_exempt
from django.core.serializers.json import DjangoJSONEncoder
from django.core.exceptions import ValidationError, ObjectDoesNotExist, PermissionDenied
from django.db import IntegrityError
from decimal import Decimal

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from ..models import Product
from ..views_dependancies import *

class CustomJSONEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            # Force to two decimal places
            return format(obj, '.2f')
        return super().default(obj)

@csrf_exempt
@api_view(['POST'])
def admin_add_product(request):
    required_fields = ["product_name", "product_type", "price", "inventory"]
    if not all(field in request.data for field in required_fields):
        return Response({"error": f"Missing required fields: {', '.join(required_fields)}."}, status=status.HTTP_400_BAD_REQUEST)

    name = request.data.get("product_name")
    product_description = request.data.get("product_description", "")
    product_type = request.data.get("product_type")
    tea_variant = request.data.get("tea_variant")
    price = request.data.get("price")
    inventory = request.data.get("inventory")
    on_sale = request.data.get("on_sale", False)

    product = Product(
        product_id=generate_6char_id(),
        name=name,
        product_description=product_description,
        product_type=product_type,
        tea_variant=tea_variant,
        price=price,
        inventory=inventory,
        on_sale=on_sale
    )
    try:
        product.save()
        return Response({"message": "Product created successfully!"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
@api_view(['GET'])
def admin_get_product_all(request):
    try:
        products = list(Product.objects.all().values(
            'product_id',
            'name',
            'product_description',
            'price',
            'product_type',
            'tea_variant',
            'inventory',
            'on_sale'
        ))

        for product in products:
            product['price'] = f"{Decimal(product['price']):.2f}"

        return Response({"products": products})
    except Exception as e:
        return Response({"error": str(e)}, status=500)



@csrf_exempt
@api_view(['GET'])
def admin_get_product(request):
    product_id = request.data.get("product_id")
    
    if not product_id:
        return Response({"error": "Product ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        product = Product.objects.filter(product_id=product_id).values(
            'product_id', 'name', 'product_description', 'product_type', 
            'tea_variant', 'inventory', 'on_sale', 'price'
        ).first()

        if not product:
            return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

        return Response(product, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['PATCH'])
def admin_update_product_description(request):
    product_id = request.data.get("product_id")
    request_description = request.data.get("product_description")

    if not request_description:
        return Response({"error": "Product description required."}, status=status.HTTP_400_BAD_REQUEST) 
    
    if not product_id:
        return Response({"error": "Product ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        product = Product.objects.filter(product_id=product_id).first()
        product.product_description = request_description
        product.save()
        return Response({   "message": "Description updated successfully.",
                            'product_id': product.product_id,
                            'name': product.name,
                            'product_description': product.product_description,
                            'product_type': product.product_type,
                            'tea_variant': product.tea_variant,
                            'inventory': product.inventory,
                            'on_sale': product.on_sale,
                            'price':float(product.price)
                            }, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
        return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)


@csrf_exempt
@api_view(['PATCH'])
def admin_update_product_inventory_stock(request):
    product_id = request.data.get("product_id")
    request_inventory = request.data.get("inventory_stock")

    if request_inventory is None:
        return Response({"error": "Product inventory required."}, status=status.HTTP_400_BAD_REQUEST) 

    if not product_id:
        return Response({"error": "Product ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        product = Product.objects.filter(product_id=product_id).first()
        product.inventory =  request_inventory
        product.save()
        return Response({   "message": "Stock updated successfully.",
                            'product_id': product.product_id,
                            'name': product.name,
                            'product_description': product.product_description,
                            'product_type': product.product_type,
                            'tea_variant': product.tea_variant,
                            'inventory': product.inventory,
                            'on_sale': product.on_sale,
                            'price':float(product.price)
                            }, status=status.HTTP_200_OK)

    except Product.DoesNotExist:
        return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)


@csrf_exempt
@api_view(['PATCH'])
def admin_update_product_status(request):
    product_id = request.data.get("product_id")
    request_on_sale = request.data.get("on_sale")



    if not isinstance(request_on_sale, bool):
        return Response({"error": "Product status required. 1"}, status=status.HTTP_400_BAD_REQUEST) 

    if not product_id:
        return Response({"error": "Product ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        product = Product.objects.filter(product_id=product_id).first()

        if request_on_sale == False:
            product.on_sale =  False
        else:
            product.on_sale =  True

        product.save()
        return Response({   "message": "product status updated successfully.",
                            'product_id': product.product_id,
                            'name': product.name,
                            'product_description': product.product_description,
                            'product_type': product.product_type,
                            'tea_variant': product.tea_variant,
                            'inventory': product.inventory,
                            'on_sale': product.on_sale,
                            'price':product.price
                            }, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
        return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)
    

@csrf_exempt
@api_view(['PATCH'])
def admin_update_product_price(request):
    product_id = request.data.get("product_id")
    request_price = request.data.get("price")
    
    if request_price is None:
        return Response({"error": "Product price input required."}, status=status.HTTP_400_BAD_REQUEST) 

    if not product_id:
        return Response({"error": "Product ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        product = Product.objects.filter(product_id=product_id).first()
        
        if not product:
            return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

        product.price =  request_price
        product.save()

        return Response({   
                            "message": "Price updated successfully.",
                            'product_id': product.product_id,
                            'name': product.name,
                            'product_description': product.product_description,
                            'product_type': product.product_type,
                            'tea_variant': product.tea_variant,
                            'inventory': product.inventory,
                            'on_sale': product.on_sale,
                            'price':product.price
                            }, status=status.HTTP_200_OK)

    except Product.DoesNotExist:
        return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)
