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

    for k, v in filter_values.items():
        filter_values[k] = [''] + sorted(list(set(v)))

    return Response(filter_values)


@api_view(['PUT'])
def get_filtered_phones(request):
    filter_params = dict(request.data)

    print('minPrice:', filter_params['minPrice'])
    print('maxPrice:', filter_params['maxPrice'])

    try:
        minPrice = float(filter_params['minPrice'])
    except:
        minPrice = None

    try:
        maxPrice = float(filter_params['maxPrice'])
    except:
        maxPrice = None

    del filter_params['minPrice']
    del filter_params['maxPrice']
    
    remove = [key for key in filter_params if filter_params[key] == '']
    for key in remove:
        del filter_params[key]

    if minPrice and maxPrice:
        filtered_phones = Phone.objects.filter(price__range=[minPrice, maxPrice], **filter_params)
    elif minPrice:
        filtered_phones = Phone.objects.filter(price__gte=minPrice, **filter_params)
    elif maxPrice:
        filtered_phones = Phone.objects.filter(price__lte=maxPrice, **filter_params)
    else:
        filtered_phones = Phone.objects.filter(**filter_params)
    
    print('Filtered Phones:', filtered_phones)

    serializer = PhoneSerializer(filtered_phones, many=True)
    return Response(serializer.data)