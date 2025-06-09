from django.urls import path

from green_tea_app.admin_views.admin import *
from green_tea_app.admin_views.admin_orders import *
from green_tea_app.admin_views.admin_product import *
from green_tea_app.admin_views.admin_tickets import *
from green_tea_app.customer_views.customer import *
from green_tea_app.customer_views.customer_orders import *
from green_tea_app.customer_views.customer_tickets import *



urlpatterns = [
      #admin, admin to admin
      path('admin/register', admin_register),
      path('admin/login', admin_login),
      path('admin/check-auth', admin_check_auth),
      path('admin/mods/pw-change', admin_update_password),
      path('admin/mods/email-change', admin_update_email),
      path('admin/logout', admin_logout),

      #admin to customers
      path('admin/user/all', admin_get_customer_all),
      path('admin/user/find', admin_get_customer),

      #admin to product catalogue
      path('admin/products/add', admin_add_product),
      path('admin/products/all', admin_get_product_all),
      path('admin/products/find', admin_get_product),
      path('admin/products/update/description', admin_update_product_description),
      path('admin/products/update/stock', admin_update_product_inventory_stock),
      path('admin/products/update/status', admin_update_product_status),
      path('admin/products/update/price', admin_update_product_price),  
      #path('admin/products/delete', admin_products_delete), #DELETE products in inventory

      #admin to orderbundles queue
      path('admin/orders/all', admin_get_orderbundles_queue),
      path('admin/orders/update/status', admin_order_update_status),

      #admin to tickets
      path('admin/tickets/all', admin_get_tickets_queue),
      path('admin/tickets/update/status', admin_tickets_update_status),
      path('admin/tickets/update/notes', admin_tickets_update_admin_notes),  

      #customer actions
      path('register', customer_register),
      path('login', customer_login),
      path('check-auth', customer_check_auth),
      path('profile/pw-change', customer_update_password),
      path('profile/', customer_get_customer_profile),
      path('profile/email-change', customer_update_email),
      path('profile/contacts-change', customer_update_contact),
      path('logout', customer_logout),
      #path('account/deactivate', customer_delete_account),

      #customer to orders
      path('products/all', customer_get_product_all),
      path('order/create', customer_cart_checkout_to_orderbundle),
      path('order/history', customer_order_history),
      path('order/cancel', customer_orderbundle_cancel_request),

      #customer cart
      path('cart/add-to-cart', customer_cart_update_items),
      path('cart/pm-change', customer_cart_payment_method_change),
      path('cart/empty', customer_empty_cart),
      path('cart/', customer_get_cart),

      #customer to tickets
      path('ticket/create', customer_create_ticket),
      path('ticket/history', customer_ticket_history),
      path('ticket/cancel', customer_tickets_update_cancel_request),
]
