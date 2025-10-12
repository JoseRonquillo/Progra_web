import uuid
import redis
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json

redis_client = redis.Redis(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT,
    db=0,
    decode_responses=True
)

@csrf_exempt
@require_http_methods(["POST"])
def create_secret(request):
    try:
        data = json.loads(request.body)
        secret_text = data.get('secret')
        
        if not secret_text:
            return JsonResponse({'error': 'Secret text is required'}, status=400)
        
        while True:
            key = str(uuid.uuid4())[:12]
            if not redis_client.exists(key):
                break

        redis_client.setex(key, 86400, secret_text)
        
        return JsonResponse({
            'key': key,
            'message': 'Secret created successfully'
        })
    
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@require_http_methods(["GET"])
def retrieve_secret(request, key):
    try:
        secret = redis_client.get(key)
        
        if secret is None:
            return JsonResponse({'error': 'Secret not found or already viewed'}, status=404)
        
        redis_client.delete(key)
        
        return JsonResponse({
            'secret': secret,
            'message': 'Secret retrieved successfully'
        })
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)