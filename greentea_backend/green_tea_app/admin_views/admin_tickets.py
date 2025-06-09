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
@api_view(['GET'])
def admin_get_tickets_queue(request):
    try:
        ticket_queue = Ticket.objects.all().values(
            "ticket_id",
            "subject",
            "ticket_details",
            "admin_notes",
            "email",
            "customer_id",
            "customer_username",
            "created_on",
            "status",
            "request_cancellation"
        )
        return Response({"ticket_queue": list(ticket_queue)}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['PATCH'])
def admin_tickets_update_status(request):
    ticket_id_ref = request.data.get("ticket_id_ref")
    new_ticket_status = request.data.get("status")
    
    try:
        ticket = Ticket.objects.filter(ticket_id=ticket_id_ref).first()
        ticket.status = new_ticket_status
        print('test', ticket.ticket_id)
        print('test', ticket.status)
        ticket.save()
        return Response({"ticket": ticket.ticket_id,
                        "status": ticket.status}, status=status.HTTP_200_OK)
    except Ticket.DoesNotExist:
        return Response({"error": "ticket not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['PATCH'])
def admin_tickets_update_admin_notes(request):
    ticket_id_ref = request.data.get("ticket_id_ref")
    new_admin_notes = request.data.get("admin_notes")

    try:
        ticket = Ticket.objects.filter(ticket_id=ticket_id_ref).first()
        ticket.admin_notes = new_admin_notes
        print('test', ticket.ticket_id)
        print('test', ticket.admin_notes)
        ticket.save()
        return Response({"ticket": ticket.ticket_id,
                        "admin_notes": ticket.admin_notes}, status=status.HTTP_200_OK)
    except Ticket.DoesNotExist:
        return Response({"error": "ticket not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)