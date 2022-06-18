from .models import *
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from django.db.models import Count, Q
from rest_framework import status
from django.conf import settings
import jwt
from .utils import *
import json
from itertools import combinations

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
      print('haha1')
      print('haha1')
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
      print('haha2')
      print('haha1')
      return JsonResponse(status=status.HTTP_201_CREATED, data={"status": status.HTTP_201_CREATED, "success": True, "message": "Đăng kí admin thành công", "details" : {'username': user_obj.username, 'role': user_obj.role}})
    print('haha3')
    print('haha1')
    return JsonResponse(status=status.HTTP_201_CREATED, data={"status": status.HTTP_201_CREATED, "success": True, 'message': "Đăng kí người dùng thành công", 'details': {'username': user_obj.username, 'role': user_obj.role}})

#login 
def login(request):
  if request.method == 'POST':
    body_unicode = request.body.decode('utf-8') 	
    body = json.loads(body_unicode) 	                               
    username = body['username']
    password = body['password']

    if not Account.objects.filter(username=username).exists():
      return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': "Tên người dùng không tồn tại"})
    
    user = Account.objects.get(username=username)
    if check_password(password, user.password) == False:
      return JsonResponse(status=status.HTTP_403_FORBIDDEN, data= {"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': "Tên đăng nhập/ Mật khẩu không đúng"})
    
    auth_token = jwt.encode({'id': user.id}, settings.JWT_SECRET_KEY, algorithm="HS256")
    data = {"username": user.username, "role": user.role, "access-token": auth_token}
    print('haha5')
    print('haha1')
    return JsonResponse(status=status.HTTP_200_OK, data={"status": status.HTTP_200_OK, "success": True, 'message': 'Đăng nhập thành công', 'details': data})  

def get_all_users(request):
  if request.method == 'GET':
    count = Account.objects.all().count()
    account_list = Account.objects.all().values('id', 'username', 'role')
    print('haha6')
    print('haha1')
    return JsonResponse(status=status.HTTP_200_OK, data={'status': status.HTTP_200_OK, 'success': True, 'result': list(account_list), 'total_users': count})

def get_user(request, id):
  if request.method == "GET":
    if not Account.objects.filter(pk=id).exists():
      return JsonResponse(status=status.HTTP_404_NOT_FOUND, data={'status': status.HTTP_404_NOT_FOUND, 'success': False, 'message': 'Tài khoản không tồn tại'})
    
    account = Account.objects.filter(pk=id).values('id', 'username', 'role')
    return JsonResponse(status=status.HTTP_200_OK, data={'status': status.HTTP_200_OK, 'success': True, 'detail': list(account)})
  
def update_account(request, id):
  if request.method == 'PUT':
    if not Account.objects.filter(pk=id).exists():
      return JsonResponse(status=status.HTTP_404_NOT_FOUND, data={'status': status.HTTP_404_NOT_FOUND, 'success': False, 'message': 'Tài khoản không tồn tại'})
  
    account = Account.objects.get(pk=id)
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    
    #check username is exist
    if 'username' in body:
      if Account.objects.filter(username=body['username']).exists():
        return JsonResponse(status=status.HTTP_400_BAD_REQUEST, data={'status': status.HTTP_400_BAD_REQUEST, 'success': False, 'message': 'Tên tài khoản đã tồn tại'})
      
    # must not change role admin
    if 'role' in body:
      if (account.role == 'admin' and body['role'] != 'admin'):
        for key, value in body.items():
          if key == 'password':
            setattr(account, key, make_password(value))
          elif key != 'role':
            setattr(account, key, value)
        account.save()
        print('Ha12')
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={'status': status.HTTP_403_FORBIDDEN, 'success': False, 'message': 'Không thể thay đổi vai trò admin'})
      
      # must not change role to admin if admin is exist
      if (account.role != 'admin' and body['role'] == 'admin'):
        # check if admin is exist
        if Account.objects.filter(role='admin').exists():
          for key, value in body.items():
            if key == 'password':
              setattr(account, key, make_password(value))
            elif key != 'role':
              setattr(account, key, value)
          account.save()
          return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={'status': status.HTTP_403_FORBIDDEN, 'success': False, 'message': 'Admin đã tồn tại. Không thể có nhiều hơn 1 admin'})
        
    for key, value in body.items():
      if key == 'password':
        setattr(account, key, make_password(value))
      else:
        setattr(account, key, value)
    account.save()
    return JsonResponse(status=status.HTTP_200_OK, data={'status': status.HTTP_200_OK, 'success': True, 'message': 'Cập nhật thành công'})

def delete_account(request, id):
  if request.method == 'DELETE':
    token = request.headers.get('Authorization', None)
    ok, payload = verify_token(token)
    
    if ok:
      account = Account.objects.get(pk=payload['id'])
      if account.role != 'admin':
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': 'Không được cấp quyền thực hiện chức năng này'})
      
      if not Account.objects.filter(pk=id).exists():
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': 'Không tìm thấy tài khoản này'})
      
      del_account = Account.objects.get(pk=id)
      del_account.delete()
      if del_account.role == 'admin':
        print('haha9')
        return JsonResponse(status=status.HTTP_200_OK, data={"status": status.HTTP_200_OK, 'success': True, 'message': 'Hiện tại đã xóa tài khoản admin. Vui lòng thay thế bằng tài khoản khác'})
      
      return JsonResponse(status=status.HTTP_200_OK, data={"status": status.HTTP_200_OK, 'success': True, 'message': 'Xóa tài khoản thành công'})  
    
    return payload
  
'''CRUD API for Season'''
def create_season(request):
  if request.method == 'POST':
    token = request.headers.get('Authorization', None)
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
    token = request.headers.get('Authorization', None)
    ok, payload = verify_token(token)
    
    if ok:
      account = Account.objects.get(pk=payload['id'])
      if account.role != 'admin':
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': 'Không được cấp quyền thực hiện chức năng này'})
      
      body_unicode = request.body.decode('utf-8') 	
      body = json.loads(body_unicode) 	
      
      if not Season.objects.filter(pk=id).exists():
        return JsonResponse(status=status.HTTP_404_NOT_FOUND, data={'status': status.HTTP_404_NOT_FOUND, 'success': False, 'message': 'Không tìm thấy mùa giải'})

      if 'max_numbers_of_teams' not in body:
        pass
      elif body['max_numbers_of_teams'] < 5:
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={'status': status.HTTP_403_FORBIDDEN, 'success': False, 'message': 'Chưa đủ điều kiện cập nhật giải đấu do số lượng đội bóng chưa đủ'})
      
      if 'name' in body and Season.objects.filter(name=body['name']).exists():
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={'status': status.HTTP_403_FORBIDDEN, 'success': False, 'message': 'Tên mùa giải đã tồn tại'})

      season = Season.objects.get(pk=id)
      for key, value in body.items():
        if key != 'id':
          setattr(season, key, value)
      
      season.save()
      season_info = list(Season.objects.filter(pk=season.id).values())[0]
      
      data = {
        'status': status.HTTP_200_OK, 
        'success': True,
        'message': 'Cập nhật mùa giải thành công',
        'result': season_info
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
    
    season = list(Season.objects.filter(pk=id).values())
    team_list = list(Season_Detail.objects.filter(season_id=season[0]['id']).values('team_id').order_by('team_id'))
    teams = [Team.objects.get(pk=team['team_id']) for team in team_list]
    teams_info = []
    for team in teams:
      teams_info.append({
        "id": team.id,
        "name": team.name,
        "logo": team.logo,
        "coach": team.coach,
        "max_numbers_of_players": team.max_numbers_of_players,
        "reported_by": team.reported_by.username,
      })
      
    matches = list(Match.objects.filter(season_id=id).order_by('id').values())
    matches_info = []
    for match in matches:
      temp = list(Season.objects.filter(pk=match['season_id']).values())[0]
      first_team = list(Team.objects.filter(pk=match['first_team_id']).values())[0]
      second_team = list(Team.objects.filter(pk=match['second_team_id']).values())[0]
      matches_info.append({
        "id": match['id'],
        "season": temp,
        "first_team": first_team,
        "second_team": second_team,
        "result": match['result'],
        "match_day": json.dumps(match['match_day'], default=myconverter)
      })
    
    if len(teams_info) == 0:
      teams_info = None
    if len(matches_info) == 0:
      matches_info = None
    
    #get teams not belong to this season
    all_teams = list(Team.objects.all().values())
    rest_teams = []
    if teams_info is None:
      rest_teams = all_teams
    else:      
      exist_team_ids = [x['id'] for x in teams_info]
      for team in all_teams:
        if team['id'] not in exist_team_ids:
          rest_teams.append(team)
    
    if len(rest_teams) == 0:
      rest_teams = None
       
    result = {
      'season_info': season[0],
      'teams': teams_info,
      'matches': matches_info,
      'rest_teams': rest_teams
    }
    
    return JsonResponse(status=status.HTTP_200_OK, data={'status': status.HTTP_200_OK, 'success': True, 'result': result})
  
'''CRUD API for Team'''
def create_team(request):
  if request.method == 'POST':
    token = request.headers.get('Authorization', None)
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
    
    team = list(Team.objects.filter(pk=id).values())
    
    players = list(Team_Player.objects.filter(team_id=team[0]['id']).values('player_id'))
    players_obj = [Player.objects.get(pk=player['player_id']) for player in players]
    players_info = []
    for player in players_obj:
      players_info.append({
        'id': player.id,
        'name': player.name,
        'image': player.image,
        'age': player.age,
        'gender': player.gender,
        'height': player.height,
        'weight': player.weight,
        'position': player.position,
        'point': player.point,
        'reported_by': player.reported_by.username,
      })
    
    matches = list(Match.objects.filter(Q(first_team_id=team[0]['id']) | Q(second_team_id=team[0]['id'])).order_by('id').values())
    matches_info = []
    for match in matches:
      temp = list(Season.objects.filter(pk=match['season_id']).values())[0]
      first_team = list(Team.objects.filter(pk=match['first_team_id']).values())[0]
      second_team = list(Team.objects.filter(pk=match['second_team_id']).values())[0]
      matches_info.append({
        "id": match['id'],
        "season": temp,
        "first_team":first_team,
        "second_team": second_team,
        "result": match['result'],
        "match_day": json.dumps(match['match_day'], default=myconverter)
      })
    
    all_players = list(Player.objects.all().values())
    rest_players = []
    if len(players_info) == 0:
      rest_players = all_players
    else:
      exist_player_ids = [x['id'] for x in players_info]
      for player in all_players:
        if player['id'] not in exist_player_ids and not Team_Player.objects.filter(player_id=player['id']).exists():
          rest_players.append(player)
    
    if len(rest_players) == 0:
      rest_players = None      
    
    result = {
      'team_info': team[0],
      'players': players_info,
      'matches': matches_info,
      'rest_players': rest_players
    }
    return JsonResponse(status=status.HTTP_200_OK, data={'status': status.HTTP_200_OK, 'success': True, 'result': result})
  
def update_team(request, id):
  if request.method == 'PUT':
    token = request.headers.get('Authorization', None)
    ok, payload = verify_token(token)
    
    if ok:
      account = Account.objects.get(pk=payload['id'])
      if account.role != 'admin':
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': 'Không được cấp quyền thực hiện chức năng này'})
      
      body_unicode = request.body.decode('utf-8') 	
      body = json.loads(body_unicode)
      
      if not Team.objects.filter(pk=id).exists():
        return JsonResponse(status=status.HTTP_404_NOT_FOUND, data={'status': status.HTTP_404_NOT_FOUND, 'success': False, 'message': 'Không tìm thấy mùa giải'})

      if body['max_numbers_of_players'] > 23:
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status":status.HTTP_403_FORBIDDEN, 'success': False, 'message': 'Số lượng đăng ký tối đa cầu thủ không được vượt quá 23 người'})
      
      team = Team.objects.get(pk=id)
      for key, value in body.items():
        if key != 'id':
          setattr(team, key, value)
      team.save()
      
      data = {
        'status': status.HTTP_200_OK, 
        'success': True,
        'message': 'Cập nhật đội bóng thành công',
        'result': {
          "name": team.name,
          "logo": team.logo,
          "coach": team.coach,
          "max_numbers_of_players": team.max_numbers_of_players,
          "reported_by": team.reported_by.username,
        }
      }
      
      return JsonResponse(status=status.HTTP_200_OK, data=data)
    
    return payload
  
'''CRUD API for player'''
def create_player(request):
  if request.method == 'POST':
    token = request.headers.get('Authorization', None)
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
      
      player = Player(name=name, image=image, age=age, gender=gender, height=height, weight=weight, position=position, point=point, reported_by=account)
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
         'reported_by': account.username,
       } 
      }
      
      return JsonResponse(status=status.HTTP_201_CREATED, data=data)
    return payload

def import_players(request, id):
  if request.method == 'POST':
    token = request.headers.get('Authorization', None)
    ok, payload = verify_token(token)
    
    if ok:
      account = Account.objects.get(pk=payload['id'])
      if account.role != 'admin':
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': 'Không được cấp quyền thực hiện chức năng này'})
      
      if not Team.objects.filter(pk=id).exists():
        return JsonResponse(status=status.HTTP_404_NOT_FOUND, data={'status': status.HTTP_404_NOT_FOUND, 'success': False, 'message': 'Đội bóng này không tồn tại'})
      
      team = Team.objects.get(pk=id)
      body_unicode = request.body.decode('utf-8') 	
      body = json.loads(body_unicode)
      
      team_list = list(Team.objects.all().values('id'))
      for value in body['player_ids']:
        if not Player.objects.filter(pk=value).exists():
          continue
        
        is_belong = False
        for team_id in team_list:
          if Team_Player.objects.filter(team_id=team_id['id'], player_id=value).exists():
            is_belong = True
            break
        
        if is_belong == False:
          player = Player.objects.get(pk=value)
          added = Team_Player(team=team, player=player, reported_by=account)
          added.save()
          
      return JsonResponse(status=status.HTTP_200_OK, data={'status': status.HTTP_200_OK, 'success': True, 'message': 'Import cầu thủ vào đội bóng thành công'})
    return payload
  
def get_all_players(request):
  if request.method == 'GET':
    count = Player.objects.all().count()
    player_list = list(Player.objects.all().values('id'))
    player_info = []
    for idx, player in enumerate(player_list):
      team_id = list(Team_Player.objects.filter(player_id=player['id']).values('team_id', 'player_id'))
      if len(team_id) > 0:
        team = list(Team.objects.filter(pk=team_id[0]['team_id']).values())
        player_inf = list(Player.objects.filter(pk=team_id[0]['player_id']).values())
        player_info.append(player_inf[0])
        player_info[idx]['team'] = team[0]
      else:
        special_player = list(Player.objects.filter(pk=player['id']).values())
        player_info.append(special_player[0])
        player_info[idx]['team'] = None             
    return JsonResponse(status=status.HTTP_200_OK, data={'status': status.HTTP_200_OK, 'success': True, 'result': player_info, 'total_players': count})
  
def get_player(request, id):
  if request.method == 'GET':
    if not Player.objects.filter(pk=id).exists():
      return JsonResponse(status=status.HTTP_404_NOT_FOUND, data={'status': status.HTTP_404_NOT_FOUND, 'success': False, 'message': 'Cầu thủ không tồn tại'})
    
    player = Player.objects.filter(pk=id).values()
    data= {
      'status': status.HTTP_200_OK,
      'success': True,
      'detail': list(player)
    }
    
    if not Team_Player.objects.filter(player_id=id).exists(): 
      data['note'] = 'Cầu thủ này hiện chưa thuộc biên chế đội bóng nào'

    return JsonResponse(status=status.HTTP_200_OK, data=data)

def update_player(request, id):
  if request.method == 'PUT':
    token = request.headers.get('Authorization', None)
    ok, payload = verify_token(token)
    
    if ok:
      account = Account.objects.get(pk=payload['id'])
      if account.role != 'admin':
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': 'Không được cấp quyền thực hiện chức năng này'})
    
      if not Player.objects.filter(pk=id).exists():
        return JsonResponse(status=status.HTTP_404_NOT_FOUND, data={'status': status.HTTP_404_NOT_FOUND, 'success': False, 'message': 'Không tìm thấy cầu thủ'})

      body_unicode = request.body.decode('utf-8') 	
      body = json.loads(body_unicode) 
      
      player = Player.objects.get(pk=id)
      for key, value in body.items():
        if key != 'id':
          setattr(player, key, value)
      player.save()
      
      data = {
        'status': status.HTTP_200_OK,
        'success': True,
        'message': 'Cập nhật cầu thủ thành công', 
        'result': {
          "name" : player.name,
          "image" : player.image, 
          "age" : player.age,
          "gender" : player.gender,
          "height" : player.height,
          "weight" : player.weight,
          "position" : player.position,
          "point" : player.point,
          "added_by" : player.added_by.name,
          "reported_by" : player.reported_by.username
        }
      }
      
      return JsonResponse(status=status.HTTP_200_OK, data=data)
    
    return payload

'''API for season detail'''
def create_season_team(request, id):
  if request.method == 'POST':
    token = request.headers.get('Authorization', None)
    ok, payload = verify_token(token)
    
    if ok:
      account = Account.objects.get(pk=payload['id'])
      if account.role != 'admin':
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': 'Không được cấp quyền thực hiện chức năng này'})
      
      if not Season.objects.filter(pk=id).exists():
        return JsonResponse(status=status.HTTP_404_NOT_FOUND, data={'status': status.HTTP_404_NOT_FOUND, 'success': False, 'message': 'Mùa giải không tồn tại'})
      
      body_unicode = request.body.decode('utf-8') 	
      body = json.loads(body_unicode) 
      
      season = Season.objects.get(pk=id)
      for team_id in body['team_ids']:
        if not Team.objects.filter(pk=team_id).exists():
          continue
        
        if Season_Detail.objects.filter(season_id=season.id, team_id=team_id).exists():
          continue
        
        team = Team.objects.get(pk=team_id)
        season_detail = Season_Detail(season=season, team=team, reported_by=account, total_points=0)      
        season_detail.save()
      
      return JsonResponse(status=status.HTTP_200_OK, data={'status': status.HTTP_200_OK, 'success': True, 'message': 'Tạo đội bóng cho mùa giải thành công'})
    
    return payload

'''API for utils'''
def count_players_of_team(request, id):
  if request.method == 'GET':
    if not Team.objects.filter(pk=id).exists():
      return JsonResponse(status=status.HTTP_404_NOT_FOUND, data={'status': status.HTTP_404_NOT_FOUND, 'success': False, 'message': 'Không tìm thấy đội bóng'})
    
    team = Team.objects.get(pk=id)
    player_count = Player.objects.filter(added_by=team.id).count()
    
    return JsonResponse(status=status.HTTP_200_OK, data={'status': status.HTTP_200_OK, 'success': True, 'message': 'Query thành công', 'result': {'team': team.name, 'total_players': player_count}})

'''API for create match'''
def create_match_schedule(request, id):
  if request.method == 'POST':
    token = request.headers.get('Authorization', None)
    ok, payload = verify_token(token)
    
    if ok:
      account = Account.objects.get(pk=payload['id'])
      if account.role != 'admin':
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': 'Không được cấp quyền thực hiện chức năng này'})
      
      num_teams = Season_Detail.objects.filter(season_id=id).values('season_id').annotate(dcount=Count('team_id'))
      num_teams = list(num_teams)[0]['dcount']
      season = Season.objects.get(pk=id)
      if num_teams < season.max_numbers_of_teams:
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={'status': status.HTTP_403_FORBIDDEN, 'success': False, 'message': 'Chưa đủ số đội như đã đăng ký'})
      
      query_set = list(Season_Detail.objects.filter(season_id=id).values('team_id'))
      team_ids = []
      for val in query_set:
        team_ids.append(val['team_id'])
        
      matches = list(combinations(team_ids, 2))
      for match in matches:
        team_1 = Team.objects.get(pk=match[0])
        team_2 = Team.objects.get(pk=match[1])
        match_day = gen_date(season.start_date, season.end_date)
        temp = Match(season=season, first_team=team_1, second_team=team_2, result="0-0", match_day=match_day)
        temp.save()

      season.is_start = True
      season.save()
      return JsonResponse(status=status.HTTP_201_CREATED, data={'status': status.HTTP_201_CREATED, 'success': True, 'message': 'Tạo lịch thi đấu thành công'})
    return payload
    

def update_match_result(request, id):
  if request.method == 'PUT':
    token = request.headers.get('Authorization', None)
    ok, payload = verify_token(token)
    
    if ok:
      account = Account.objects.get(pk=payload['id'])
      if account.role != 'admin':
        return JsonResponse(status=status.HTTP_403_FORBIDDEN, data={"status": status.HTTP_403_FORBIDDEN, "success": False, 'message': 'Không được cấp quyền thực hiện chức năng này'})
      
      body_unicode = request.body.decode('utf-8')
      body = json.loads(body_unicode)
      
      if not Match.objects.filter(pk=id).exists():
        return JsonResponse(status=status.HTTP_404_NOT_FOUND, data={'status': status.HTTP_404_NOT_FOUND, 'success': False, 'message': 'Trận đấu không tồn tại'})
        
      match = Match.objects.get(pk=id)
      match.result = body['result']
      match.save()
      
       
      # update point for team in the season
      season = Season.objects.get(pk=match.season.id)
      team_1 = Team.objects.get(pk=match.first_team.id)
      team_2 = Team.objects.get(pk=match.second_team.id)
      season_detail_team_1 = Season_Detail.objects.get(season=season, team=team_1)
      season_detail_team_2 = Season_Detail.objects.get(season=season, team=team_2)

      point_team_1, point_team_2 = match.result.split('-')
      if int(point_team_1) == int(point_team_2):
        season_detail_team_1.total_points += 1
        season_detail_team_2.total_points += 1
      elif int(point_team_1) > int(point_team_2):
        season_detail_team_1.total_points += 3
      else:
        season_detail_team_2.total_points += 3
        
      season_detail_team_1.save()
      season_detail_team_2.save()
      
      # update rank in the season
      season_detail = Season_Detail.objects.filter(season_id=season.id)
      season_team_detail = list(season_detail.values('team_id').order_by('-total_points').values('team_id'))
      
      rank = []
      for value in season_team_detail:
        team = Team.objects.get(pk=value['team_id'])
        rank.append(team.name)
      
      season.rank = rank
      season.save()
      
      data = {
        'status': status.HTTP_200_OK,
        'success': True,
        'message': 'Cập nhật kết quả trận đấu thành công', 
        'result': {
          'match_id': id,
          'season_id': season.id,
          'result': match.result,          
        }
      }
      
      return JsonResponse(status=status.HTTP_200_OK, data=data)
    return payload
  
def get_match(request, id):
  if request.method == 'GET':
    if not Match.objects.filter(pk=id).exists():
      return JsonResponse(status=status.HTTP_404_NOT_FOUND, data={'status': status.HTTP_404_NOT_FOUND, 'success': False, 'message': 'Không tìm thấy trận đấu này'})
    
    match = list(Match.objects.filter(pk=id).values())
    season = list(Season.objects.filter(pk=match[0]['season_id']).values())[0]
    first_team = list(Team.objects.filter(pk=match[0]['first_team_id']).values())[0]
    second_team = list(Team.objects.filter(pk=match[0]['second_team_id']).values())[0]
    
    result = {
      "id": match[0]['id'],
      "season": season,
      "first_team": first_team,
      "second_team": second_team,
      "result": match[0]['result'],
      "match_day": json.dumps(match[0]['match_day'], default=myconverter)
    }
    
    return JsonResponse(status=status.HTTP_200_OK, data={'status': status.HTTP_200_OK, 'success': True, 'result': result})

def get_season_rank(request, id):
  if request.method == 'GET':
    if not Season_Detail.objects.filter(season_id=id).exists():
      return JsonResponse(status=status.HTTP_404_NOT_FOUND, data={'status': status.HTTP_404_NOT_FOUND, 'success': False, 'message': 'Không tìm thấy mùa giải'})
    
    season = list(Season_Detail.objects.filter(season_id=id).values('season_id').order_by('-total_points').values('team_id', 'total_points'))
    rank = []
    for idx, ele in enumerate(season):
      team = list(Team.objects.filter(pk=ele['team_id']).values())[0]
      rank.append(team)
      rank[idx]['total_points'] = ele['total_points']
        
    return JsonResponse(status=status.HTTP_200_OK, data={'status': status.HTTP_200_OK, 'success': True, 'result': rank})
    
def home(request):
  if request.method == 'GET':
    return JsonResponse(status=status.HTTP_200_OK, data={'status': status.HTTP_200_OK, 'success': True, 'message': 'Server sẵn sàng lắng nghe...'})
  
def delete_all(request):
  Match.objects.all().delete()
  return JsonResponse(status=status.HTTP_200_OK, data={'status': status.HTTP_200_OK})