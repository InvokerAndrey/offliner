from django.urls import path

from shop.views import phone_views as views


urlpatterns = [
    path('', views.get_phones, name='phones'),
    path('filter-values/', views.get_filter_values, name='filter-values'),
    path('filter-results/', views.get_filtered_phones, name='filter-results'),
    path('create/', views.create_phone, name='create-phone'),
    path('upload/', views.upload_image, name='image-upload'),
    path('<str:pk>/', views.get_phone, name='phone'),
    path('<str:pk>/reviews/', views.create_phone_review, name='update-phone'),
    path('delete/<str:pk>/', views.delete_phone, name='delete-phone'),
    path('update/<str:pk>/', views.update_phone, name='update-phone'),
]