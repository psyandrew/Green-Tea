from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError, ObjectDoesNotExist, PermissionDenied
from django.db import IntegrityError

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from ..models import Admin, OrderBundle
from ..views_dependancies import *

@csrf_exempt
@api_view(['GET'])
def admin_get_orderbundles_queue(request):
	try:
		order_queue = OrderBundle.objects.all().values(
			'orderbundle_id',
			'customer_username',
			'customer_id',
			'created_on',
			'items',
			'price',
			'payment_method',
			'status',
			'request_cancellation',
			'notes'
		)

		return Response({"order_queue": order_queue }, status=status.HTTP_200_OK)
	except Exception as e:
		return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['PATCH'])
def admin_order_update_status(request):
    orderbundle_id = request.data.get("orderbundle_id")
    request_order_status_update = request.data.get("order_status_update")

    if not request_order_status_update:
        return Response({"error": "Please provide order update"}, status=status.HTTP_400_BAD_REQUEST)

    if not orderbundle_id:
        return Response({"error": "order ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        orderbundle = OrderBundle.objects.filter(orderbundle_id=orderbundle_id).first()
        orderbundle.status = request_order_status_update
        orderbundle.save()

        return Response({"orderbundle_id": orderbundle.orderbundle_id,
        				"status": orderbundle.status,}, status=status.HTTP_200_OK)
    except OrderBundle.DoesNotExist:
        return Response({"error": "order ticket not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

