from django.urls import path

from shop.views import phone_views as views


urlpatterns = [
    path('', views.get_phones, name='phones'),
    path('filter-values/', views.get_filter_values, name='filter-values'),
    path('filter-results/', views.get_filtered_phones, name='filter-results'),
    path('<str:pk>/', views.get_phone, name='phone'),
]