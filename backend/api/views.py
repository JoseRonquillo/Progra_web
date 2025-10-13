from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import redis
import secrets
from datetime import timedelta

redis_client = redis.Redis(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT,
    db=settings.REDIS_DB,
    decode_responses=True
)

def generate_unique_key():
    while True:
        key = secrets.token_urlsafe(16)
        if not redis_client.exists(key):
            return key

class HealthCheckView(APIView):
    def get(self, request):
        try:
            redis_client.ping()
            return Response({'status': 'healthy', 'redis': 'connected'}, status=status.HTTP_200_OK)
        except:
            return Response({'status': 'unhealthy', 'redis': 'disconnected'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

class HideSecretView(APIView):
    def post(self, request):
        secret_text = request.data.get('secret', '').strip()
        if not secret_text:
            return Response({'error': 'Secreto requerido'}, status=status.HTTP_400_BAD_REQUEST)
        key = generate_unique_key()
        redis_client.setex(key, timedelta(hours=24), secret_text)
        return Response({'key': key, 'message': 'Secreto oculto correctamente'}, status=status.HTTP_201_CREATED)

class RevealSecretView(APIView):
    def get(self, request, key):
        secret = redis_client.get(key)
        if not secret:
            return Response({'error': 'Clave no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        redis_client.delete(key)
        return Response({'secret': secret, 'message': 'Secreto revelado'}, status=status.HTTP_200_OK)
