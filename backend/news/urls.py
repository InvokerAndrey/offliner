from django.urls import path

from . import views


urlpatterns = [
    path('<str:category>/', views.get_news, name='news'),
]