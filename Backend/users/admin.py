from django.contrib import admin
from .models import User
from unfold.admin import ModelAdmin

class UserAdmin(ModelAdmin):
    list_display = ['email', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser']
    list_filter = ['is_active', 'is_staff', 'is_superuser']
    search_fields = ['email', 'first_name', 'last_name']

admin.site.register(User, UserAdmin)