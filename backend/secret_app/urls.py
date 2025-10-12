from django.urls import path, include

urlpatterns = [
    path('api/', include('secrets_api.urls')),
]