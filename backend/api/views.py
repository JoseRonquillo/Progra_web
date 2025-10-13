from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class HealthCheckView(APIView):
    def get(self, request):
        return Response({
            'status': 'healthy',
            'message': 'API is running'
        }, status=status.HTTP_200_OK)

class HideSecretView(APIView):
    def post(self, request):
        secret = request.data.get('secret', '').strip()
        if not secret:
            return Response({'error': 'Secreto requerido'}, status=status.HTTP_400_BAD_REQUEST)
        # temporal, solo devuelve la clave dummy
        return Response({'key': 'dummy123', 'message': 'Secreto recibido'}, status=status.HTTP_201_CREATED)
