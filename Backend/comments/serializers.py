from rest_framework import serializers
from django.shortcuts import get_object_or_404
from .models import Comment
from posts.models import Post
from users.models import User

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

    def validate(self, data):
        if not data.get('comment'):
            raise serializers.ValidationError('Comment cannot be empty.')
        return data

    def create(self, validated_data):
        return Comment.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.comment = validated_data.get('comment', instance.comment)
        instance.save()
        return instance
