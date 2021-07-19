from django.urls import path

from shop.views import user_views as views


urlpatterns = [
    path('', views.get_users, name='users'),
    path('profile/', views.get_user_profile, name='user-profile'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.register, name='register'),
]