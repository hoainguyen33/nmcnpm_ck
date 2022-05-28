from django.shortcuts import render
from .models import *
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from rest_framework import status
from django.conf import settings
import jwt
import json
from .middleware import *

# Create your views here.

#sign up 
def signup(request):
  if request.method == 'POST':
    body_decode = request.body.decode('utf-8')
    body = json.loads(body_decode)
    username = body['username']
    password = body['password']
    role = body['role']
    
    if len(password) < 8:
      return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={'status': status.HTTP_403_FORBIDDEN, 'success': False, 'message': "Mật khẩu không hợp lệ"})
    
    user_obj = Account(username=username, password=password, role=role) 
    
    #if user not exist before
    if Account.objects.count() == 0:
      user_obj.role = 'admin'
    elif Account.objects.filter(username=user_obj.username).exists():
      return JsonResponse(status=status.HTTP_403_FORBIDDEN, data= {"status": status.HTTP_403_FORBIDDEN, 'success': False, "message": "Tên người dùng đã tồn tại"})
    elif (user_obj.role == "admin" and Account.objects.filter(role="admin").exists()):
      return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': "Đã tồn tại tài khoản admin"})
    
    #else success
    hashedPassword = make_password(user_obj.password)
    user_obj.password = hashedPassword
    user_obj.save()
    if user_obj.role == 'admin':
      return JsonResponse(status=status.HTTP_201_CREATED, data={"status": status.HTTP_201_CREATED, "success": True, "message": "Đăng kí admin thành công", "details" : {'username': user_obj.username, 'role': user_obj.role}})
    
    return JsonResponse(status=status.HTTP_201_CREATED, data={"status": status.HTTP_201_CREATED, "success": True, 'message': "Đăng kí người dùng thành công", 'details': {'username': user_obj.username, 'role': user_obj.role}})

#login 
def login(request):
  if request.method == 'POST':
    body_decode = request.body.decode('utf-8')
    body = json.loads(body_decode)
    username = body['username']
    password = body['password']

    user = Account.objects.get(username=username)
    if not user:
      return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': "Tên người dùng không tồn tại"})
    
    if check_password(password, user.password) == False:
      return JsonResponse(status=status.HTTP_403_FORBIDDEN, data= {"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': "Tên đăng nhập/ Mật khẩu không đúng"})
    
   
    auth_token = jwt.encode({'id': user.id}, settings.JWT_SECRET_KEY)
    data = {"username": user.username, "access-token": auth_token}
    return JsonResponse(status=status.HTTP_200_OK, data= {"status": status.HTTP_200_OK, "success": True, 'message': 'Đăng nhập thành công', 'details': data})  


'''CRUD API for Season'''
# def create_season(request):
#   if request.method == 'POST':
    
#     response = verify_token(request.headers.get('x-access-token'))
    
#     account = Account.objects.get(id=response['id'])
#     if account.role != 'admin':
#       return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': "Người dùng không được phân quyền"})
    
#     name = request.POST['name']
#     logo = request.POST['logo']
#     start_date = request.POST['start_date']
#     end_date = request.POST['end_date']
#     max_numbers_of_teams = request.POST['max_numbers_of_teams']
#     rank = request.POST['rank']
#     reported_by = account
#     season_obj = Season(name, logo, start_date, end_date, max_numbers_of_teams, rank, reported_by)
    
#     if season_obj.name
