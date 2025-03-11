from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import AllowAny
from .models import Post, Sample, Idea, Normal
from .serializers import PostSerializer, PostCreateSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['user__id', 'title', 'content']

    def get_serializer_class(self):
        if self.action == 'create' or self.action == 'update':
            return PostCreateSerializer
        return PostSerializer