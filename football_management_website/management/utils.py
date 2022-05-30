import jwt
from rest_framework import status
from django.http import JsonResponse
from .models import Account
from django.conf import settings
      
# verify token
def verify_token(token_string):
  if not token_string:
    return False, JsonResponse(status=status.HTTP_400_BAD_REQUEST, data={'status': status.HTTP_400_BAD_REQUEST, 'success': False, 'message': 'Token chưa được cung cấp'})

  try:
    payload = jwt.decode(token_string, settings.JWT_SECRET_KEY, algorithms=["HS256"])
  except jwt.DecodeError as e:
    return False, JsonResponse(status=status.HTTP_400_BAD_REQUEST, data={'status': status.HTTP_400_BAD_REQUEST, 'success': False, 'message': 'Token không hợp lệ'})
  
  if not Account.objects.filter(id=payload['id']).exists():
    return False, JsonResponse(status=status.HTTP_400_BAD_REQUEST, data={'status': status.HTTP_400_BAD_REQUEST, 'success': False, 'message': 'Token không tồn tại'})
  
  return True, payload  

