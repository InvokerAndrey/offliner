from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from shop.serializers import UserSerializer, UserSerializerWithToken


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):

        data = super().validate(attrs)
        
        serializer = UserSerializerWithToken(self.user).data
        for key, value in serializer.items():
            data[key] = value
            print('key:', key)
            print('value:', value)

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    credentials = request.data
    user.first_name = credentials['name']
    user.username = credentials['email']
    user.email = credentials['email']

    if credentials['password'] != '':
        user.password = make_password(credentials['password'])

    user.save()

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def register(request):
    credentials = request.data

    try:
        user = User.objects.create(
            username=credentials['email'],
            email=credentials['email'],
            first_name=credentials['name'],
            password=make_password(credentials['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)

        return Response(serializer.data)
    except:
        message = {'details': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_user(request, pk):
    user_for_destruction = User.objects.get(id=pk)
    user_for_destruction.delete()
    return Response('User was deleted')


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_user_by_id(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_user(request, pk):
    user = User.objects.get(id=pk)

    credentials = request.data
    print('DATA:', credentials)
    user.first_name = credentials['name']
    user.username = credentials['email']
    user.email = credentials['email']
    user.is_staff = credentials['isAdmin']

    if credentials['password'] != '':
        user.password = make_password(credentials['password'])

    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)
