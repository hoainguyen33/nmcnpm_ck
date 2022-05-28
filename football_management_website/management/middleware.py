import jwt
from django.http import JsonResponse
from rest_framework import status
from django.conf import settings
from .models import Account

def verify_token(token):
    if len(token) == 0:
      return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"success": False, "message": "Token không được cung cấp"}) 
    
    try:    
      payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=["HS256"])
    except jwt.exceptions.DecodeError as err:
      return JsonResponse(status=status.HTTP_400_BAD_REQUEST, data={"status": status.HTTP_400_BAD_REQUEST, 'success': False, "message": "Token không hợp lệ"})
    
    if not Account.objects.filter(id=payload['id']).exists():
      return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={'status': status.HTTP_403_FORBIDDEN, 'success': False, 'message': "Token không tồn tại"}) 
    
    return payload