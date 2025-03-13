from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from .models import Like
from .serializers import LikeSerializer
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['user', 'post']
    search_fields = ['user__first_name', 'post__description']

    @swagger_auto_schema(
        operation_description="Retrieve a list of likes for a specific post",
        responses={200: LikeSerializer(many=True)}
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
        operation_description="Create a new like for a specific post",
        request_body=LikeSerializer,
        responses={201: LikeSerializer()}
    )
    def create(self, request, post_id=None):
        data = request.data.copy()
        data['post'] = post_id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)