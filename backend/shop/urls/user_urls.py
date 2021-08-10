from django.urls import path

from shop.views import user_views as views


urlpatterns = [
    path('', views.get_users, name='users'),
    path('profile/', views.get_user_profile, name='user-profile'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.register, name='register'),
    path('profile/update/', views.update_user_profile, name='user-profile-update'),
    path('<str:pk>/', views.get_user_by_id, name='user'),
    path('delete/<str:pk>/', views.delete_user, name='user-delete'),
    path('update/<str:pk>/', views.update_user, name='user-update'),
]