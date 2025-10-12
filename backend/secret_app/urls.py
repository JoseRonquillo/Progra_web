from django.urls import path
from . import views

urlpatterns = [
    path('secrets/', views.create_secret, name='create_secret'),
    path('secrets/<str:key>/', views.retrieve_secret, name='retrieve_secret'),
]