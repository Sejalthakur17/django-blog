from django.urls import path
from backend.blog import views   
from .views import PostListView, PostDetailView, PostCreateView, PostUpdateView, PostDeleteView, UserPostListView
from django.urls import path
from .views import PostListCreateAPIView, PostDetailAPIView
from django.urls import path
from .views import get_posts


urlpatterns = [
    path('posts/', get_posts),
    path('api/posts/', PostListCreateAPIView.as_view()),
    path('api/posts/<int:pk>/', PostDetailAPIView.as_view()),   path('', PostListView.as_view(), name='blog-home'),
    path('user/<str:username>', UserPostListView.as_view(), name='user-posts'),
    path('post/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('post/new/', PostCreateView.as_view(), name='post-create'),
    path('post/<int:pk>/update', PostUpdateView.as_view(), name='post-update'),
    path('post/<int:pk>/delete', PostDeleteView.as_view(), name='post-delete'),
    path('about/', views.about, name='blog-about')
]
