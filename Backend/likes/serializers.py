from rest_framework import serializers
from users.models import User
from posts.models import Post
from .models import Like


class LikeSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())

    class Meta:
        model = Like
        fields = '__all__'

    def validate(self, data):
        user = data.get('user')
        post = data.get('post')
        if Like.objects.filter(user=user, post=post).exists():
            raise serializers.ValidationError('Ya existe un like para este post.')
        if not Post.objects.filter(id=post.id).exists():
            raise serializers.ValidationError('El post no existe.')
        if not User.objects.filter(id=user.id).exists():
            raise serializers.ValidationError('El usuario no existe.')
        return data

    def create(self, validated_data):
        like = Like.objects.create(**validated_data)
        return like

    def update(self, instance, validated_data):
        instance.user = validated_data.get('user', instance.user)
        instance.post = validated_data.get('post', instance.post)
        instance.save()
        return instance