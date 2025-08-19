from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list_create, name='post-list-create'),
    path('<int:pk>/', views.post_detail, name='post-detail'),
]