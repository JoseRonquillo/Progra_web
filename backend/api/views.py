from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import redis
import secrets
from datetime import timedelta
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .serializers import SecretSerializer

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
            return Response({
                'status': 'healthy',
                'redis': 'connected',
                'message': 'Sistema operativo, Redis activo'
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'status': 'unhealthy',
                'redis': 'disconnected',
                'error': str(e)
            }, status=status.HTTP_503_SERVICE_UNAVAILABLE)

class HideSecretView(APIView):
    @swagger_auto_schema(
        operation_description="Oculta un mensaje secreto y genera clave única",
        request_body=SecretSerializer,
        responses={
            201: openapi.Response(
                description="Mensaje guardado correctamente",
                examples={
                    "application/json": {
                        "key": "xyz123abc456",
                        "message": "Mensaje oculto exitosamente"
                    }
                }
            ),
            400: "Solicitud incorrecta - mensaje vacío",
            500: "Error interno del servidor"
        }
    )
    def post(self, request):
        serializer = SecretSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        secret_text = serializer.validated_data['secret']
        
        if not secret_text.strip():
            return Response({'error': 'El mensaje no puede estar vacío'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            key = generate_unique_key()
            redis_client.setex(key, timedelta(hours=24), secret_text)
            return Response({
                'key': key,
                'message': 'Mensaje oculto exitosamente',
                'expires_in': '24 horas'
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': f'No se pudo guardar el mensaje: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RevealSecretView(APIView):
    @swagger_auto_schema(
        operation_description="Revela un mensaje secreto usando su clave (uso único)",
        responses={
            200: openapi.Response(
                description="Mensaje revelado exitosamente",
                examples={
                    "application/json": {
                        "secret": "Tu mensaje secreto aquí",
                        "message": "Mensaje revelado y eliminado"
                    }
                }
            ),
            404: "Clave no encontrada o ya usada",
            500: "Error interno del servidor"
        }
    )
    def get(self, request, key):
        try:
            secret = redis_client.get(key)
            
            if secret is None:
                return Response({
                    'error': 'Clave no encontrada o ya usada',
                    'message': 'El mensaje ya fue visto o no existe'
                }, status=status.HTTP_404_NOT_FOUND)
            
            redis_client.delete(key)
            
            return Response({
                'secret': secret,
                'message': 'Mensaje revelado y eliminado permanentemente'
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': f'No se pudo revelar el mensaje: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class StatsView(APIView):
    @swagger_auto_schema(
        operation_description="Obtiene estadísticas de mensajes activos",
        responses={
            200: openapi.Response(
                description="Estadísticas recuperadas correctamente",
                examples={
                    "application/json": {
                        "active_secrets": 10,
                        "database_size": 10
                    }
                }
            )
        }
    )
    def get(self, request):
        try:
            total_keys = redis_client.dbsize()
            return Response({
                'active_secrets': total_keys,
                'database_size': total_keys,
                'status': 'operativo'
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
