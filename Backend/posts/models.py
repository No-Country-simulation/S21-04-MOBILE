from django.db import models
from users.models import User

class Post(models.Model):
    TYPE_CHOICES = [
        ('normal', 'Normal'),
        ('sample', 'Sample'),
        ('ideas', 'Ideas')
    ]
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    media_url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    likes = models.ManyToManyField(User, related_name='likes', blank=True)
    comments = models.ManyToManyField(User, related_name='comments', blank=True)

    def __str__(self):
        return f"{self.type.capitalize()} Post"
    
    def get_description(self):
        if self.type == 'normal':
            return self.normal.description
        elif self.type == 'sample':
            return self.sample.description
        elif self.type == 'ideas':
            return self.idea.description


class Sample(models.Model):
    post = models.OneToOneField(Post, on_delete=models.CASCADE, related_name='sample')
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Sample post: {self.post.id}"


class Idea(models.Model):
    post = models.OneToOneField(Post, on_delete=models.CASCADE, related_name='idea')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Idea post: {self.post.id}"


class Normal(models.Model):
    post = models.OneToOneField(Post, on_delete=models.CASCADE, related_name='normal')
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Normal post: {self.post.id}"
