from rest_framework import serializers
from .models import Post, Sample, Idea, Normal
from users.models import User
from likes.models import Like
from comments.models import Comment
from django.urls import reverse

class SampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sample
        fields = ['post', 'description']

class IdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idea
        fields = ['title', 'post', 'description']

class NormalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Normal
        fields = ['post', 'description']

class PostSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    likes_url = serializers.SerializerMethodField()
    comments_url = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'type', 'media_url', 'user', 'description', 'likes_count', 'comments_count', 'likes_url', 'comments_url']

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

    def get_likes_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(reverse('likes-list', kwargs={'post_id': obj.id}))
        return None

    def get_comments_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(reverse('comments', kwargs={'post_id': obj.id}))
        return None

class PostCreateSerializer(serializers.ModelSerializer):
    class SampleCreateSerializer(serializers.ModelSerializer):
        class Meta:
            model = Sample
            fields = ['description']
    
    class IdeaCreateSerializer(serializers.ModelSerializer):
        class Meta:
            model = Idea
            fields = ['title', 'description']

    class NormalCreateSerializer(serializers.ModelSerializer):
        class Meta:
            model = Normal
            fields = ['description']

    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    title = serializers.CharField(write_only=True, required=False)
    description = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Post
        fields = ['id', 'type', 'media_url', 'user', 'title', 'description']

    def validate(self, data):
        if data['type'] == 'ideas' and 'title' not in data:
            raise serializers.ValidationError({"title": "This field is required for ideas type."})
        return data

    def create(self, validated_data):
        title = validated_data.pop('title', None)
        description = validated_data.pop('description')
        post = Post.objects.create(**validated_data)
        if post.type == 'sample':
            Sample.objects.create(post=post, description=description)
        elif post.type == 'ideas':
            Idea.objects.create(post=post, title=title, description=description)
        elif post.type == 'normal':
            Normal.objects.create(post=post, description=description)
        return post