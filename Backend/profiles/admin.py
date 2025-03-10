from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Profile, Social, Follower


class ProfileAdmin(ModelAdmin):
    list_display = ('user', 'bio')
    list_filter = ('user', 'bio')
    search_fields = ('user', 'bio')


class SocialAdmin(ModelAdmin):
    list_display = ('social_name', 'social_url')
    list_filter = ('social_name', 'social_url')
    search_fields = ('social_name', 'social_url')


class FollowerAdmin(ModelAdmin):
    list_display = ('follower', 'following', 'created_at')
    list_filter = ('follower', 'following', 'created_at')
    search_fields = ('follower', 'following', 'created_at')


admin.site.register(Profile, ProfileAdmin)
admin.site.register(Social, SocialAdmin)
admin.site.register(Follower, FollowerAdmin)
