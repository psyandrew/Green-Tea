from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError, ObjectDoesNotExist, PermissionDenied
from django.db import IntegrityError

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from ..models import Ticket, Customer
from ..views_dependancies  import *


@csrf_exempt
@api_view(['POST'])

def customer_create_ticket(request):
    if not all(field in request.data for field in ["email", "ticket_details", "subject"]):
        return Response({"error": "Missing fields."}, status=status.HTTP_400_BAD_REQUEST)
    try:
        customer_username = request.data.get("username", "Anonymous")
        customer_id_ref = request.data.get("customer_id_ref", "ANON")
        email = request.data.get("email")
        admin_notes = request.data.get("admin_notes")
        ticket_details = request.data.get("ticket_details")
        subject = request.data.get("subject")

        ticket = Ticket(
            ticket_id=generate_6char_id(),
            customer_id=customer_id_ref,
            customer_username=customer_username,
            subject=subject,
            ticket_details=ticket_details,
            email=email
            )

        ticket.save()
        return Response({"message": "Ticket received."}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['PATCH'])
def customer_tickets_update_cancel_request(request):
    ticket_id_ref = request.data.get("ticket_id_ref")
    new_cancel_request = request.data.get("cancel_request")
    try:
        ticket = Ticket.objects.filter(customer_id=ticket_id_ref).first()
        ticket.admin_cancel_request = new_cancel_request
        ticket.save()
        return Response({"message": "ticket updated!."}, status=status.HTTP_200_OK)
    except Ticket.DoesNotExist:
        return Response({"error": "ticket not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@csrf_exempt
@api_view(['GET'])
def customer_ticket_history(request):
    try:
        customer_id_ref = request.data.get("customer_id_ref")
        
        if not customer_id_ref:
            return Response({"error": "Customer ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Attempt to fetch tickets
        ticket_queue = Ticket.objects.filter(customer_id=customer_id_ref).values(
            "ticket_id",
            "subject",
            "ticket_details",
            "created_on",
            "status",
        )
        
        if not ticket_queue.exists():
            return Response({"ticket_queue": []},status=status.HTTP_200_OK)

        return Response({"ticket_queue": list(ticket_queue)},status=status.HTTP_200_OK)

    except DatabaseError as e:
        logger.error(f"Database error in customer_ticket_history: {str(e)}")
        return Response(
            {"error": "Database error occurred while fetching ticket history"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    except Exception as e:
        logger.error(f"Unexpected error in customer_ticket_history: {str(e)}")
        return Response(
            {"error": "An unexpected error occurred"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )