from rest_framework import generics
from .models import Post
from .serializers import PostSerializer


# GET all posts + CREATE new post
class PostListCreateAPIView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


# GET single post + UPDATE + DELETE
class PostDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer