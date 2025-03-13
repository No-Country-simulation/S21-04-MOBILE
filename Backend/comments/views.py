from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Comment
from .serializers import CommentSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from posts.models import Post
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by('created_at')
    serializer_class = CommentSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['comment']
    filterset_fields = ['user', 'post']
    ordering_fields = ['created_at', 'updated_at']

    @swagger_auto_schema(
        operation_description="Retrieve a list of comments for a specific post",
        responses={200: CommentSerializer(many=True)}
    )
    def list(self, request, post_id=None):
        queryset = self.filter_queryset(self.get_queryset().filter(post_id=post_id))
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_description="Create a new comment for a specific post",
        request_body=CommentSerializer,
        responses={201: CommentSerializer()}
    )
    def create(self, request, post_id=None):
        data = request.data.copy()
        data['post'] = post_id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)