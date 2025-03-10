from django.db import models
from users.models import User

class Profile(models.Model):
    bio = models.TextField(max_length=500, blank=True)
    gender = models.CharField(max_length=6, blank=True)
    photo_url = models.URLField(blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.username} Profile'


class Social(models.Model):
    social_name = models.CharField(max_length=50, choices=[('Facebook', 'Facebook'), ('Twitter', 'Twitter'), ('Instagram', 'Instagram'), ('Youtube', 'Youtube'), ('TikTok', 'TikTok'), ('spotify', 'Spotify'), ('Other', 'Other')])
    social_url = models.URLField()
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)


class Follower(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='follower')
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following')
    created_at = models.DateTimeField(auto_now_add=True)