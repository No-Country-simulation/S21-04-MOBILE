from django.urls import path
from .views import LikeViewSet

urlpatterns = [
    path('likes/<int:post_id>/', LikeViewSet.as_view({'get': 'list', 'post': 'create'}), name='likes-list'),
    path('likes/<int:pk>/', LikeViewSet.as_view({'get': 'retrieve', 'patch': 'update', 'delete': 'destroy'}), name='likes-detail'),
]