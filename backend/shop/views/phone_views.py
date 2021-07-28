from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from collections import defaultdict

from shop.models import Phone
from shop.serializers import PhoneSerializer


@api_view(['GET'])
def get_phones(request):
    phones = Phone.objects.all()
    serializer = PhoneSerializer(phones, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_phone(request, pk):
    phone = Phone.objects.get(id=pk)
    serializer = PhoneSerializer(phone, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def get_filter_values(request):
    phones = Phone.objects.all()
    filter_values = defaultdict(list)

    for phone in phones:
        filter_values['category'].append(phone.category)
        filter_values['year'].append(phone.year)
        filter_values['brand'].append(phone.brand)
        filter_values['operatingSystem'].append(phone.operatingSystem)
        filter_values['screenSize'].append(phone.screenSize)
        filter_values['screenResolution'].append(phone.screenResolution)
        filter_values['screenTechnology'].append(phone.screenTechnology)
        filter_values['platform'].append(phone.platform)
        filter_values['RAM'].append(phone.RAM)
        filter_values['flashMemory'].append(phone.flashMemory)
        filter_values['camera'].append(phone.camera)
        filter_values['cameraAmount'].append(phone.cameraAmount)
        filter_values['battery'].append(phone.battery)

    for v in filter_values.values():
        v = list(set(v))

    return Response(filter_values)
