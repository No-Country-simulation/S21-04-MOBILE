from django.urls import path
from .views import CommentViewSet

urlpatterns = [
    path('comments/', CommentViewSet.as_view({'get': 'list', 'post': 'create'}), name='comments'),
    path('comments/<int:pk>/', CommentViewSet.as_view({'get': 'retrieve', 'patch': 'update', 'delete': 'destroy'}), name='comment'),
]