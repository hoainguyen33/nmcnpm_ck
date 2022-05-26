from re import A
from django.shortcuts import render
from management.models import *
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from rest_framework import status

from django.contrib import auth
from django.conf import settings
import jwt


# Create your views here.

#sign up 
def signup(request):
  if request.method == 'POST':
    username = request.POST.get('username')
    password = request.POST.get('password')
    
    if len(password) < 8:
      return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={'status': status.HTTP_403_FORBIDDEN, 'success': False,'message': "Mật khẩu không hợp lệ"})
    
    role = request.POST.get('role')
    user_obj = Account(username=username, password=password, role=role) 
    
    #if user not exist before
    if Account.objects.count() == 0:
      user_obj.role = 'admin'
    elif Account.objects.filter(username=user_obj.username).exists():
      return JsonResponse(status=status.HTTP_403_FORBIDDEN, data= {"status": status.HTTP_403_FORBIDDEN, 'success': False, "message": "Tên người dùng đã tồn tại"})
    #else success
    hashedPassword = make_password(user_obj.password)
    user_obj.password = hashedPassword
    Account.objects.create(user_obj)
    user_obj.save()
    if user_obj.role == 'admin':
      return JsonResponse(status=status.HTTP_201_CREATED, data={"status": status.HTTP_200_OK, "success": True, "message": "Đăng kí admin thành công", "details" : {'username': user_obj.username, 'role': user_obj.role}})
    
    return JsonResponse( status=status.HTTP_201_CREATED, data={"status": status.HTTP_200_OK, "success": True, 'message': "Đăng kí người dùng thành công", 'details': {'username': user_obj.username, 'role': user_obj.role}})

#login 
def login(request):
  if request.method == 'POST':
    username = request.POST.get('username')
    password = request.POST.get('password')

    user = Account.objects.filter(username=username)
    if not user:
      return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': "Tên người dùng không tồn tại"})
    
    if check_password(user.password, password) == False:
      return JsonResponse(status=status.HTTP_403_FORBIDDEN, data= {"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': "Tên đăng nhập/ Mật khẩu không đúng"})
    
   
    #user = auth.authenticate(username=username, password=password)
    auth_token = jwt.encode({'id': user.id}, settings.JWT_SECRET_KEY)
    data = {"username": user.username, "token": auth_token}
    return JsonResponse(status=status.HTTP_200_OK, data= {"status": status.HTTP_200_OK, "success": True, 'message': 'Đăng nhập thành công', 'details': data})
    
    #return JsonResponse(status=status.HTTP_401_UNAUTHORIZED, message="Invalid credentials")    
  
     
  

