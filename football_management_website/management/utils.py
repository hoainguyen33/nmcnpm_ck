import jwt
from rest_framework import status
from django.http import JsonResponse
from .models import Account
from django.conf import settings
import random
import datetime
import json

def myconverter(o):
  if isinstance(o, datetime.date):
    return o.__str__()


# verify token
def verify_token(token_string):
  if not token_string:
    return False, JsonResponse(status=status.HTTP_400_BAD_REQUEST, data={'status': status.HTTP_400_BAD_REQUEST, 'success': False, 'message': 'Token chưa được cung cấp'})

  parts = token_string.split(' ')
  if parts[0].lower() != 'bearer':
    return False, JsonResponse(status=status.HTTP_401_UNAUTHORIZED, data={'status': status.HTTP_401_UNAUTHORIZED, 'success': False, 'message': 'Authorization header phải bắt đầu bằng Bearer'})
  elif len(parts) == 1:
    return False, JsonResponse(status=status.HTTP_401_UNAUTHORIZED, data={'status': status.HTTP_401_UNAUTHORIZED, 'success': False, 'message': 'Không tìm thấy token'})
  elif len(parts) > 2:
    return False, JsonResponse(status=status.HTTP_401_UNAUTHORIZED, data={'status': status.HTTP_401_UNAUTHORIZED, 'success': False, 'message': 'Authorization header phải có mẫu Bearer token'})
    
  try:
    payload = jwt.decode(parts[1], settings.JWT_SECRET_KEY, algorithms=["HS256"])
  except jwt.DecodeError as e:
    return False, JsonResponse(status=status.HTTP_400_BAD_REQUEST, data={'status': status.HTTP_400_BAD_REQUEST, 'success': False, 'message': 'Token không hợp lệ'})
  
  if not Account.objects.filter(id=payload['id']).exists():
    return False, JsonResponse(status=status.HTTP_400_BAD_REQUEST, data={'status': status.HTTP_400_BAD_REQUEST, 'success': False, 'message': 'Token không tồn tại'})
  
  return True, payload  

def factorial(number):
  res = 1
  for i in range(1, number+1):
    res *= i
    
  return res

def calc_combination(n, k):
  return factorial(n) // ((factorial(k)*factorial(n-k)))

def gen_date(start_date, end_date):
  time_between_dates = end_date - start_date
  days_between_dates = time_between_dates.days
  random_number_of_days = random.randrange(days_between_dates)
  random_date = start_date + datetime.timedelta(days=random_number_of_days)
  return random_date