from django.db import models

# Create your models here.

# Create User model
class Account(models.Model):
  username = models.CharField(max_length=20,null=True, unique=True)
  password = models.CharField(max_length=100,null=False)
  role = models.CharField(max_length=10,null=False)
  
  def __str__(self):
    return self.username
