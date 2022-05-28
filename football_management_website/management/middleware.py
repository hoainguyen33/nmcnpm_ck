<<<<<<< HEAD
# import jwt

# def JWTMiddleware(get_response):
#   def middleware(request):
#     # Code to be executed for each request before
#     # the view (and later middleware) are called.
#     token = request.headers.get('X-access-token')
#     if not token:
      
    
#     response = get_response(request)

#     # Code to be executed for each request/response after
#     # the view is called.

#     return response

#   return middleware
=======
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
>>>>>>> 09ab66a5aecfaf75ba5e66e901958bc7ea676b22
