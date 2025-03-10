from rest_framework import serializers
from .models import Profile, Social, Follower
from users.models import User

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        partial = True

    def validate(self, data):
        if 'bio' in data:
            if len(data['bio']) > 500:
                raise serializers.ValidationError('Bio must be less than 500 characters')
        return data

    def create(self, validated_data):
        profile = Profile.objects.create(**validated_data)
        
        # Crear las entradas de Social asociadas al perfil
        social_names = ['Facebook', 'Twitter', 'Instagram', 'Youtube', 'TikTok', 'Other']
        for social_name in social_names:
            Social.objects.create(profile=profile, social_name=social_name, social_url='')

        # Crear las entradas de Follower asociadas al perfil
        users = User.objects.all()
        for user in users:
            if user != profile.user:
                Follower.objects.create(follower=profile.user, following=user)
                Follower.objects.create(follower=user, following=profile.user)

        return profile


class SocialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Social
        fields = '__all__'
        partial = True

    def validate(self, data):
        if 'social_name' in data:
            if data['social_name'] not in ['Facebook', 'Twitter', 'Instagram', 'Youtube', 'TikTok', 'Other']:
                raise serializers.ValidationError('Invalid social name')
        return data

    def create(self, validated_data):
        return Social.objects.create(**validated_data)


class FollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follower
        fields = '__all__'
    
    def validate(self, data):
        if 'follower' in data and 'following' in data:
            if data['follower'] == data['following']:
                raise serializers.ValidationError('You cannot follow yourself')
        return data

    def create(self, validated_data):
        return Follower.objects.create(**validated_data)