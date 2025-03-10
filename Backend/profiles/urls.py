from .views import ProfileViewSet, SocialViewSet, FollowerViewSet
from django.urls import path

urlpatterns = [
    path('profile/', ProfileViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('profile/<int:pk>/', ProfileViewSet.as_view({'get': 'retrieve', 'patch': 'update', 'delete': 'destroy'})),
    path('social/', SocialViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('social/<int:pk>/', SocialViewSet.as_view({'get': 'retrieve', 'patch': 'update', 'delete': 'destroy'})),
    path('follower/', FollowerViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('follower/<int:pk>/', FollowerViewSet.as_view({'get': 'retrieve', 'patch': 'update', 'delete': 'destroy'})),
]