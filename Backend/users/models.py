from django.contrib.auth.models import AbstractUser
from django.db import models
from .manager import UserManager


class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f'email: {self.email}, Name: {self.first_name} {self.last_name}' 
    
    def __get_full_name__(self):
        return self.first_name + self.last_name

    def __get_short_name__(self):
        return self.first_name