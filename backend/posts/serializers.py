from rest_framework import serializers
from .models import Post, Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'username', 'text', 'created_datetime']
        read_only_fields = ['id', 'created_datetime']


class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['username', 'text']


class PostSerializer(serializers.ModelSerializer):
    likes_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()
    comments = CommentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Post
        fields = ['id', 'username', 'created_datetime', 'title', 'content', 'likes', 'likes_count', 'comments', 'comments_count']
        read_only_fields = ['id', 'created_datetime', 'likes_count', 'comments_count']


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['username', 'title', 'content']


class PostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'content']