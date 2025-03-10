from rest_framework import serializers
from .models import Post, Sample, Idea, Normal
from users.models import User
from likes.models import Like
from comments.models import Comment

class SampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sample
        fields = ['post', 'description']

class IdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idea
        fields = ['post', 'description']

class NormalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Normal
        fields = ['post', 'description']

class PostSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'type', 'media_url', 'user', 'description', 'likes_count', 'comments_count']

    def get_likes_count(self, obj):
        return Like.objects.filter(post=obj).count()

    def get_comments_count(self, obj):
        return Comment.objects.filter(post=obj).count()

    def get_description(self, obj):
        if obj.type == 'sample':
            return obj.sample.description if hasattr(obj, 'sample') else ''
        elif obj.type == 'ideas':
            return obj.idea.description if hasattr(obj, 'idea') else ''
        elif obj.type == 'normal':
            return obj.normal.description if hasattr(obj, 'normal') else ''
        return ''


class PostCreateSerializer(serializers.ModelSerializer):
    class SampleCreateSerializer(serializers.ModelSerializer):
        class Meta:
            model = Sample
            fields = ['description']
    
    class IdeaCreateSerializer(serializers.ModelSerializer):
        class Meta:
            model = Idea
            fields = ['description']

    class NormalCreateSerializer(serializers.ModelSerializer):
        class Meta:
            model = Normal
            fields = ['description']

    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    description = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Post
        fields = ['id', 'type', 'media_url', 'user', 'description']

    def create(self, validated_data):
        description = validated_data.pop('description')
        post = Post.objects.create(**validated_data)
        if post.type == 'sample':
            Sample.objects.create(post=post, description=description)
        elif post.type == 'ideas':
            Idea.objects.create(post=post, description=description)
        elif post.type == 'normal':
            Normal.objects.create(post=post, description=description)
        return post