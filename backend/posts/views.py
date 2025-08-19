from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Post, Comment
from .serializers import PostCreateSerializer, PostSerializer, PostUpdateSerializer, CommentCreateSerializer, CommentSerializer


@api_view(["GET", "POST"])
def post_list_create(request):
    """
    GET: List all posts
    POST: Create a new post
    """
    if request.method == "GET":
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = PostCreateSerializer(data=request.data)
        if serializer.is_valid():
            post = serializer.save()
            response_serializer = PostSerializer(post)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PATCH", "DELETE"])
def post_detail(request, pk):
    """
    Crud Test List - Post Detail

    GET: Retrieve a specific post
    PATCH: Update a post (title and content only)
    DELETE: Delete a post
    """
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = PostSerializer(post)
        return Response(serializer.data)

    elif request.method == "PATCH":
        serializer = PostUpdateSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            post = serializer.save()
            response_serializer = PostSerializer(post)
            return Response(response_serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
def toggle_like(request, pk):
    """
    Toggle like/unlike for a post
    """
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
    
    username = request.data.get('username')
    if not username:
        return Response({"error": "Username is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    if username in post.likes:
        post.likes.remove(username)
    else:
        post.likes.append(username)
    
    post.save()
    
    serializer = PostSerializer(post)
    return Response(serializer.data)


@api_view(["POST"])
def add_comment(request, pk):
    """
    Add a comment to a post
    """
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = CommentCreateSerializer(data=request.data)
    if serializer.is_valid():
        comment = serializer.save(post=post)
        response_serializer = CommentSerializer(comment)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_comment(request, pk, comment_id):
    """
    Delete a comment from a post
    """
    try:
        post = Post.objects.get(pk=pk)
        comment = Comment.objects.get(pk=comment_id, post=post)
    except Post.DoesNotExist:
        return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
    except Comment.DoesNotExist:
        return Response({"error": "Comment not found"}, status=status.HTTP_404_NOT_FOUND)
    
    comment.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
