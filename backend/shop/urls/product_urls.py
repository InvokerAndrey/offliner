from django.urls import path

from shop.views import product_views as views


urlpatterns = [
    path('', views.get_all_products, name='products-all'),
    path('categories/', views.get_categories, name='categories'),
    path('categories/<str:pk>/', views.get_products_by_category, name='category-products'),
    path('<str:pk>/', views.get_product, name='product'),
    path('<str:pk>/attrs/', views.get_product_attrs, name='product-attrs'),
]