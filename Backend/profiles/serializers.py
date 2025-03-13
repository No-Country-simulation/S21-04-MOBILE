from rest_framework import serializers
from .models import Profile, Social, Follower
from users.models import User
from django.urls import reverse

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

class ProfileSerializer(serializers.ModelSerializer):
    socials = SocialSerializer(many=True, read_only=True)
    followers_count = serializers.SerializerMethodField()
    followers_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = '__all__'
        partial = True

    def get_followers_count(self, obj):
        return Follower.objects.filter(following=obj.user).count()

    def get_followers_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(reverse('user-followers', kwargs={'user_id': obj.user.id}))
        return None

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

        return profile