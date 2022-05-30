from django.urls import path
from . import views

urlpatterns = [
    path('signup', views.signup, name='signup'),
    path('login', views.login, name='login'),
    path('users', views.get_all_users, name='get-all-users'),
    path('user/<id>', views.get_user, name='get-user'),
    path('season', views.create_season, name='create-season'),
    #path('season/<id>', views.update_season, name='update-season'),
    path('seasons', views.get_all_seasons, name='get-all-seasons'),
    path('season/<id>', views.get_season, name='get-season'),
    path('team', views.create_team, name='create-team'),
    path('teams', views.get_all_teams, name='get-all-teams'),
    path('team/<id>', views.get_team, name='get-team'),
    path('player', views.create_player, name='create-player'),
    path('players', views.get_all_players, name='get-all-players'),
    path('players/<id>', views.get_player, name='get-player'),
]