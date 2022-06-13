from django.shortcuts import render
from .models import *
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from rest_framework import status
from django.conf import settings
import jwt
from .utils import *
import json
from django.core import serializers
from django.forms.models import model_to_dict

# Create your views here.

#sign up 
def signup(request):
  if request.method == 'POST':
    body_unicode = request.body.decode('utf-8') 	
    body = json.loads(body_unicode) 	
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
    body_unicode = request.body.decode('utf-8') 	
    body = json.loads(body_unicode) 	
    username = body['username']
    password = body['password']

    user = Account.objects.get(username=username)
    if not user:
      return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': "Tên người dùng không tồn tại"})
    
    if check_password(password, user.password) == False:
      return JsonResponse(status=status.HTTP_403_FORBIDDEN, data= {"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': "Tên đăng nhập/ Mật khẩu không đúng"})
    
   
    #user = auth.authenticate(username=username, password=password)
    auth_token = jwt.encode({'id': user.id}, settings.JWT_SECRET_KEY, algorithm="HS256")
    print(auth_token)
    data = {"username": user.username, "access-token": auth_token}
    return JsonResponse(status=status.HTTP_200_OK, data= {"status": status.HTTP_200_OK, "success": True, 'message': 'Đăng nhập thành công', 'details': data})  

def get_all_users(request):
  if request.method == 'GET':
    count = Account.objects.all().count()
    account_list = Account.objects.all().values('id', 'username', 'role')
    return JsonResponse(status=status.HTTP_200_OK, data={'status': status.HTTP_200_OK, 'success': True, 'result': list(account_list), 'total_users': count})

def get_user(request, id):
  if request.method == "GET":
    if not Account.objects.filter(pk=id).exists():
      return JsonResponse(status=status.HTTP_404_NOT_FOUND, data={'status': status.HTTP_404_NOT_FOUND, 'success': False, 'message': 'Tài khoản không tồn tại'})
    
    account = Account.objects.filter(pk=id).values('id', 'username', 'role')
    return JsonResponse(status=status.HTTP_200_OK, data={'status': status.HTTP_200_OK, 'success': True, 'detail': list(account)})
  

'''CRUD API for Season'''
def create_season(request):
  if request.method == 'POST':
    token = request.headers.get('x-access-token')
    ok, payload = verify_token(token)
    
    if ok:
      account = Account.objects.get(pk=payload['id'])
      if account.role != 'admin':
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': 'Không được cấp quyền thực hiện chức năng này'})
      
      body_unicode = request.body.decode('utf-8') 	
      body = json.loads(body_unicode) 	

      # create season object
      name = body['name']
      logo = body['logo']
      start_date = body['start_date']
      end_date = body['end_date']
      max_numbers_of_teams = body['max_numbers_of_teams']
      rank = body['rank']
      reported_by = account
      season_obj = Season(name=name, logo=logo, start_date=start_date,end_date=end_date, max_numbers_of_teams= max_numbers_of_teams, rank = rank, reported_by=reported_by)
      
      if max_numbers_of_teams < 5:
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={'status': status.HTTP_403_FORBIDDEN, 'success': False, 'message': 'Chưa đủ điều kiện tạo giải đấu do số lượng đội bóng chưa đủ'})
      
      if (Season.objects.filter(name = season_obj.name).exists()):
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={'status': status.HTTP_403_FORBIDDEN, 'success': False, 'message': 'Mùa giải đã tồn tại'})
      
      data = {
        'status': status.HTTP_201_CREATED, 
        'success': True,
        'message': 'Tạo mùa giải thành công',
        'result': {
          "name": season_obj.name,
          "logo": season_obj.logo,
          "start_date": season_obj.start_date,
          "end_date": season_obj.end_date,
          "max_numbers_of_teams": season_obj.max_numbers_of_teams,
          "rank": season_obj.rank,
          "reported_by": season_obj.reported_by.username,
        }
      }
      
      season_obj.save()
      return JsonResponse(status=status.HTTP_201_CREATED, data=data)

    return payload
    
def update_season(request, id):
  if request.method == 'PUT':
    token = request.headers.get('x-access-token')
    ok, payload = verify_token(token)
    
    if ok:
      account = Account.objects.get(pk=payload['id'])
      if account.role != 'admin':
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': 'Không được cấp quyền thực hiện chức năng này'})
      
      body_unicode = request.body.decode('utf-8') 	
      body = json.loads(body_unicode) 	
      
      name = body['name']
      logo = body['logo']
      start_date = body['start_date']
      end_date = body['end_date']
      max_numbers_of_teams = body['max_numbers_of_teams']
      rank = body['rank']
      reported_by = account
      update = Season(name=name, logo=logo, start_date=start_date, end_date=end_date, max_numbers_of_teams=max_numbers_of_teams, rank=rank, reported_by=reported_by)
      
      if max_numbers_of_teams < 5:
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={'status': status.HTTP_403_FORBIDDEN, 'success': False, 'message': 'Chưa đủ điều kiện cập nhật giải đấu do số lượng đội bóng chưa đủ'})
      
      if not Season.objects.filter(pk=id).exists():
        return JsonResponse(status=status.HTTP_404_NOT_FOUND, data={'status': status.HTTP_404_NOT_FOUND, 'success': False, 'message': 'Không tìm thấy mùa giải'})

      Season.objects.filter(pk=update.id).update(update)
      data = {
        'status': status.HTTP_200_OK, 
        'success': True,
        'message': 'Cập nhật mùa giải thành công',
        'result': {
          "name": update.name,
          "logo": update.logo,
          "start_date": update.start_date,
          "end_date": update.end_date,
          "max_numbers_of_teams": update.max_numbers_of_teams,
          "rank": update.rank,
          "reported_by": update.reported_by.username,
        }
      }
      
      return JsonResponse(status=status.HTTP_200_OK, data=data)
    
    return payload

def get_all_seasons(request):
  if request.method == "GET":
    count = Season.objects.all().count()
    season_list = Season.objects.all().values()
    return JsonResponse(status=status.HTTP_200_OK, data={'status': status.HTTP_200_OK, 'success': True, 'result': list(season_list), 'total_seasons': count})
  
def get_season(request, id):
  if request.method == "GET":
    if not Season.objects.filter(pk=id).exists():
      return JsonResponse(status=status.HTTP_404_NOT_FOUND, data={'status': status.HTTP_404_NOT_FOUND, 'success': False, 'message': 'Mùa giải không tồn tại'})
    
    season = Season.objects.filter(pk=id).values()
    return JsonResponse(status=status.HTTP_200_OK, data={'status': status.HTTP_200_OK, 'success': True, 'detail': list(season)})
  
'''CRUD API for Team'''
def create_team(request):
  if request.method == 'POST':
    token = request.headers.get('x-access-token')
    ok, payload = verify_token(token)
    
    if ok:
      account = Account.objects.get(pk=payload['id'])
      if account.role != 'admin':
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': 'Không được cấp quyền thực hiện chức năng này'})
      
      body_unicode = request.body.decode('utf-8') 	
      body = json.loads(body_unicode) 	
      
      name = body['name']
      logo = body['logo']
      coach = body['coach']
      max_numbers_of_players = body['max_numbers_of_players']
      reported_by = account
      
      if max_numbers_of_players > 23:
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status":status.HTTP_403_FORBIDDEN, 'success': False, 'message': 'Số lượng đăng ký tối đa cầu thủ không được vượt quá 23 người'})
      
      if Team.objects.filter(name=name).exists():
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status":status.HTTP_403_FORBIDDEN, 'success': False, 'message': 'Đội bóng đã tồn tại'})
      
      if Team.objects.filter(coach=coach).exists():
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status":status.HTTP_403_FORBIDDEN, 'success': False, 'message': 'HLV đã thuộc của đội bóng khác'})
        
      team = Team(name=name, logo=logo, coach=coach, max_numbers_of_players=max_numbers_of_players, reported_by=reported_by)
      team.save()
      
      data = {
        'status': status.HTTP_201_CREATED, 
        'success': True,
        'message': 'Tạo đội bóng thành công',
        'result': {
          "name": team.name,
          "logo": team.logo,
          "max_numbers_of_teams": team.max_numbers_of_players,
          "reported_by": team.reported_by.username,
        }
      }
      
      return JsonResponse(status=status.HTTP_201_CREATED, data=data)
    return payload
  
def get_all_teams(request):
  if request.method == 'GET':
    count = Team.objects.all().count()
    team_list = Team.objects.all().values()
    
    return JsonResponse(status=status.HTTP_200_OK, data={'status': status.HTTP_200_OK, 'success': True, 'result': list(team_list), 'total_teams': count})
  
def get_team(request, id):
  if request.method == 'GET':
    if not Team.objects.filter(pk=id).exists():
      return JsonResponse(status=status.HTTP_404_NOT_FOUND, data={'status': status.HTTP_404_NOT_FOUND, 'success': False, 'message': 'Đội bóng không tồn tại'})
    
    team = Team.objects.filter(pk=id).values()
    return JsonResponse(status=status.HTTP_200_OK, data={'status': status.HTTP_200_OK, 'success': True, 'detail': list(team)})
  
'''CRUD API for player'''
def create_player(request):
  if request.method == 'POST':
    token = request.headers.get('x-access-token')
    ok, payload = verify_token(token)
    
    if ok:
      account = Account.objects.get(pk=payload['id'])
      if account.role != 'admin':
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': 'Không được cấp quyền thực hiện chức năng này'})
      
      body_unicode = request.body.decode('utf-8') 	
      body = json.loads(body_unicode) 
      
      name = body['name']
      image = body['image']
      age = body['age']
      gender = body['gender']
      height = body['height']
      weight = body['weight']
      position = body['position']
      point = body['point']
      reported_by = account
      
      player = Player(name=name, image=image, age=age, gender=gender, height=height, weight=weight, position=position)
      player.save()
      data = {
       'status': status.HTTP_201_CREATED,
       'success': True,
       'message': 'Tạo cầu thủ thành công',
       'result': {
         'name': player.name,
         'age': player.age,
         'gender': player.gender,
         'position': player.position,
         'point': player.point,
         'reported_by': reported_by.username,
       } 
      }
      
      return JsonResponse(status=status.HTTP_201_CREATED, data=data)
    return payload
  
def get_all_players(request):
  if request.method == 'GET':
    count = Player.objects.all().count()
    player_list = Player.objects.all().values()
    
    return JsonResponse(status=status.HTTP_200_OK, data={'status': status.HTTP_200_OK, 'success': True, 'result': list(player_list), 'total_teams': count})
  
def get_player(request, id):
  if request.method == 'GET':
    if not Team.objects.filter(pk=id).exists():
      return JsonResponse(status=status.HTTP_404_NOT_FOUND, data={'status': status.HTTP_404_NOT_FOUND, 'success': False, 'message': 'Đội bóng không tồn tại'})
    
    team = Team.objects.filter(pk=id).values()
    return JsonResponse(status=status.HTTP_200_OK, data={'status': status.HTTP_200_OK, 'success': True, 'detail': list(team)})
      