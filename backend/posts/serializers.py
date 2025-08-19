from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    likes_count = serializers.ReadOnlyField()
    
    class Meta:
        model = Post
        fields = ['id', 'username', 'created_datetime', 'title', 'content', 'likes', 'likes_count']
        read_only_fields = ['id', 'created_datetime', 'likes_count']


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['username', 'title', 'content']


class PostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'content']