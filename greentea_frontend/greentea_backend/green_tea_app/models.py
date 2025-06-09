import uuid
from django.db import models
from datetime import datetime
from django.utils.timezone import now
from datetime import timedelta

class Admin(models.Model):
    admin_id = models.CharField(max_length=9, unique=True)  
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    created_on = models.DateTimeField(default=datetime.utcnow)

    def __str__(self):
        return self.username

class Product(models.Model):
    product_id = models.CharField(max_length=9, unique=True)  
    name = models.CharField(max_length=100)
    product_description = models.TextField(default="")
    product_type = models.CharField(choices=[('Classic', 'Classic'), ('Premium', 'Premium')])
    tea_variant = models.CharField(choices=[('Green', 'Green'), ('Black', 'Black')])
    inventory = models.IntegerField(default=0)
    on_sale = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return self.name

class Cart(models.Model):
    customer_id_ref = models.CharField(default="")
    payment_method = models.CharField(choices=[
        ('Credit Card', 'Credit Card'), 
        ('Cash', 'Cash'), 
        ('e-Cash', 'e-Cash'), 
        ('Empty', 'Empty')],
        max_length=20)
    total_cart_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    items = models.JSONField(default=list)

class Customer(models.Model):
    customer_id = models.CharField(max_length=9, unique=True)  
    customer_username = models.CharField(max_length=100, blank=True,unique=True)
    contact_number = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    cart = models.OneToOneField(Cart, on_delete=models.SET_NULL, null=True)
    joined = models.DateTimeField(default=datetime.utcnow)

    def __str__(self):
        return self.customer_username

class OrderBundle(models.Model):
    orderbundle_id = models.CharField(max_length=9, unique=True)
    customer_username = models.CharField(max_length=100)
    customer_id = models.CharField(max_length=9)  # Now just a string
    payment_method = models.CharField(choices=[
        ('Credit Card', 'Credit Card'),
        ('Cash', 'Cash'),
        ('e-Cash', 'e-Cash'),
        ('Empty', 'Empty')],
        max_length=20)
    created_on = models.DateTimeField(default=datetime.utcnow)
    items = models.JSONField(default=list)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.CharField(choices=[
        ('Processing', 'Processing'),
        ('Ready for Pick Up', 'Ready for Pick Up'),
        ('Cancelled by Customer', 'Cancelled by Customer'),
        ('Cancelled by management', 'Cancelled by management'),
        ('Completed', 'Completed')], default='PROCESSING')
    request_cancellation = models.CharField(choices=[
        ('No cancellation request', 'No cancellation request'),
        ('Cancellation requested', 'Cancellation requested')],
        default='No cancellation request')
    notes = models.TextField(default='')

    def __str__(self):
        return f"Order Bundle {self.orderbundle_id} for {self.customer_username}"

class Ticket(models.Model):
    ticket_id = models.CharField(max_length=9, unique=True) 
    subject = models.CharField(max_length=100)
    ticket_details = models.TextField()
    admin_notes = models.TextField()
    email = models.EmailField(max_length=100)
    customer_id = models.CharField(max_length=9)
    customer_username = models.CharField(max_length=100)
    created_on = models.DateTimeField(default=datetime.utcnow)
    status = models.CharField(choices=[
        ('Processing', 'Processing'),
        ('Resolved', 'Resolved'),
        ('Archive', 'Archive'),
        ('Could not Resolve', 'Could not Resolve')],
        default='PROCESSING', max_length=20)
    request_cancellation = models.CharField(choices=[
        ('No Cancellation request', 'No Cancellation request'),
        ('Cancellation requested', 'Cancellation requested')],
        default='No Cancellation request', max_length=50)

    def __str__(self):
        return f"Ticket {self.ticket_id} for {self.customer_username}"

class AuthTokenAdmin(models.Model):
    token = models.CharField(max_length=64, unique=True)
    user_id = models.CharField(max_length=36)  # Store either customer or admin UUID
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return now() > self.created_at + timedelta(minutes=30)

class AuthTokenCustomer(models.Model):
    token = models.CharField(max_length=64, unique=True)
    user_id = models.CharField(max_length=36)  # Store either customer or admin UUID
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return now() > self.created_at + timedelta(minutes=30)