from django.db import models


class Post(models.Model):
    username = models.CharField(max_length=100)
    created_datetime = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=200)
    content = models.TextField()
    likes = models.JSONField(default=list, blank=True)

    class Meta:
        ordering = ['-created_datetime']

    def __str__(self):
        return f"{self.title} - {self.username}"
    
    @property
    def likes_count(self):
        return len(self.likes)
    
    @property
    def comments_count(self):
        return self.comments.count()


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    username = models.CharField(max_length=100)
    text = models.TextField()
    created_datetime = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_datetime']

    def __str__(self):
        return f"Comment by {self.username} on {self.post.title}"
