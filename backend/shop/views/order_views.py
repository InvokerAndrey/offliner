from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from shop.serializers import OrderSerializer
from shop.models import Phone, Order, OrderItem, ShippingAddress    

import datetime


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_order_items(request):
    user = request.user
    data = request.data
    
    orderItems = data['orderItems']
    if orderItems and len(orderItems) == 0:
        return Response({'details': 'No order items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # Create order
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )

        # Create shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            country=data['shippingAddress']['country'],
            postalCode=data['shippingAddress']['postalCode'],
            shippingPrice=data['shippingPrice'],
        )

        # Create order items
        for i in orderItems:
            phone = Phone.objects.get(id=i['phone'])
            item = OrderItem.objects.create(
                phone=phone,
                order=order,
                name=phone.name,
                quantity=i['quantity'],
                price=i['price'],
                image=phone.image.url
            )

            # Update stock
            phone.countInStock -= item.quantity
            phone.save()

        serializer = OrderSerializer(order, many=False)

        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order_by_id(request, pk):

    user = request.user
    order = Order.objects.get(id=pk)

    try:
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({'details': 'Not authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'details': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_orders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_order_to_paid(request, pk):
    order = Order.objects.get(id=pk)

    order.isPaid = True
    order.paidAt = datetime.datetime.now()

    order.save()

    return Response('Order was paid')