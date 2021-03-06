from django.core.mail import EmailMessage


def send_email_for_paid_order(order):
    user = order.user.email
    subject = f'Your order {order.id} has been successfully paid'

    items = order.orderitem_set.all()
    order_items = [item.name for item in items]

    message = f'''Hi, {order.user.first_name}, it is Offliner
    Your order has been successfully paid!
    ORDER {order.id}
    PRODUCTS: {order_items}
    TOTAL PRICE: ${order.totalPrice}
    PAYMENT METHOD: {order.paymentMethod}
    
    Thank you for purchase!
    '''

    email = EmailMessage(subject=subject, body=message, to=[user])
    email.send()