from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list_create, name='post-list-create'),
    path('<int:pk>/', views.post_detail, name='post-detail'),
    path('<int:pk>/like/', views.toggle_like, name='toggle-like'),
    path('<int:pk>/comments/', views.add_comment, name='add-comment'),
    path('<int:pk>/comments/<int:comment_id>/', views.delete_comment, name='delete-comment'),
]