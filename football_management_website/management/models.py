from django.db import models
from django.contrib.postgres.fields import ArrayField


# Create your models here.

#User model
class Account(models.Model):
  username = models.CharField(max_length=20,null=True, unique=True)
  password = models.CharField(max_length=100,null=False)
  role = models.CharField(max_length=10,null=False)
  
  def __str__(self):
    return self.username
 
#Season model 
class Season(models.Model):
  name = models.CharField(max_length=200, unique=True)
  logo = models.CharField(max_length=200, blank=True, null=True)
  start_date = models.DateField()
  end_date = models.DateField()
  max_numbers_of_teams = models.PositiveIntegerField()
  rank = ArrayField(models.CharField(max_length=100), blank=True, null=True)
  reported_by = models.ForeignKey(Account, on_delete=models.CASCADE)
  
  def __str__(self):
    return self.name

  
#Team model
class Team(models.Model):
  name = models.CharField(max_length=100,unique=True)
  logo = models.CharField(max_length=200, null=True, blank=True)
  coach = models.CharField(max_length=100, unique=True)
  max_numbers_of_players = models.PositiveIntegerField()
  reported_by = models.ForeignKey(Account, on_delete=models.CASCADE)
  

  def __str__(self):
    return "{} ({})".format(self.name, self.coach)

  
class Player(models.Model):
  name = models.CharField(max_length=100)
  image = models.CharField(max_length=100, null=True, blank=True)
  age = models.PositiveIntegerField(null=True, blank=True)
  gender = models.CharField(max_length=5, null=True, blank=True)
  height = models.FloatField(null=True, blank=True)
  weight = models.FloatField(null=True, blank=True)
  position = models.CharField(max_length=50, blank=True, null=True)
  point = models.FloatField(null=True,blank=True) #điểm đánh giá cầu thủ
  reported_by = models.ForeignKey(Account, on_delete=models.CASCADE)
  
  def __str__(self):
    return self.name
  
    
class Season_Detail(models.Model):
  season = models.ForeignKey(Season, on_delete=models.CASCADE)
  team = models.ForeignKey(Team, on_delete=models.CASCADE)
  reported_by = models.ForeignKey(Account, on_delete=models.CASCADE)
