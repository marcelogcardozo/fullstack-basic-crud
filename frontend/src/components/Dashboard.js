import React, { useState, useEffect } from 'react';
import PostForm from './PostForm';
import PostList from './PostList';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import { postsAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = ({ username, onLogout }) => {
  const [posts, setPosts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [allUsers, setAllUsers] = useState(new Set());

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await postsAPI.getAllPosts();
      setPosts(response.data);
      
      // Extract all users from posts and comments
      const users = new Set();
      response.data.forEach(post => {
        users.add(post.username);
        if (post.comments) {
          post.comments.forEach(comment => {
            users.add(comment.username);
          });
        }
      });
      setAllUsers(users);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      // Fallback para localStorage em caso de erro
      const savedPosts = localStorage.getItem('codeleap_posts');
      if (savedPosts) {
        const parsedPosts = JSON.parse(savedPosts);
        setPosts(parsedPosts);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('codeleap_posts', JSON.stringify(posts));
    
    // Update users list when posts change
    const users = new Set();
    posts.forEach(post => {
      users.add(post.username);
      if (post.comments) {
        post.comments.forEach(comment => {
          users.add(comment.username);
        });
      }
    });
    setAllUsers(users);
  }, [posts]);

  const addPost = async (newPost) => {
    try {
      const postData = {
        ...newPost,
        username,
      };
      const response = await postsAPI.createPost(postData);
      setPosts([response.data, ...posts]);
    } catch (error) {
      console.error('Erro ao criar post:', error);
      // Fallback para funcionamento local
      const post = {
        id: Date.now(),
        ...newPost,
        username,
        created_datetime: new Date().toISOString(),
        likes: [],
        likesCount: 0,
        comments: [],
        commentsCount: 0
      };
      setPosts([post, ...posts]);
    }
  };

  const deletePost = async (id) => {
    try {
      await postsAPI.deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Erro ao deletar post:', error);
      // Fallback para funcionamento local
      setPosts(posts.filter(post => post.id !== id));
    }
    setShowDeleteModal(false);
    setSelectedPost(null);
  };

  const editPost = async (updatedPost) => {
    try {
      await postsAPI.updatePost(updatedPost.id, updatedPost);
      setPosts(posts.map(post => 
        post.id === updatedPost.id ? { ...post, ...updatedPost } : post
      ));
    } catch (error) {
      console.error('Erro ao editar post:', error);
      // Fallback para funcionamento local
      setPosts(posts.map(post => 
        post.id === updatedPost.id ? { ...post, ...updatedPost } : post
      ));
    }
    setShowEditModal(false);
    setSelectedPost(null);
  };

  const handleDeleteClick = (post) => {
    setSelectedPost(post);
    setShowDeleteModal(true);
  };

  const handleEditClick = (post) => {
    setSelectedPost(post);
    setShowEditModal(true);
  };

  const handleLike = async (postId) => {
    try {
      const response = await postsAPI.toggleLike(postId, username);
      setPosts(posts.map(post => 
        post.id === postId ? response.data : post
      ));
    } catch (error) {
      console.error('Erro ao alterar like:', error);
      // Fallback para funcionamento local
      setPosts(posts.map(post => {
        if (post.id === postId) {
          const hasLiked = post.likes && post.likes.includes(username);
          const newLikes = hasLiked 
            ? post.likes.filter(user => user !== username)
            : [...(post.likes || []), username];
          
          return {
            ...post,
            likes: newLikes,
            likes_count: newLikes.length
          };
        }
        return post;
      }));
    }
  };

  const handleAddComment = async (postId, commentText) => {
    try {
      const commentData = {
        username,
        text: commentText
      };
      await postsAPI.addComment(postId, commentData);
      
      // Reload the posts to get the updated comments
      loadPosts();
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
      // Fallback para funcionamento local
      setPosts(posts.map(post => {
        if (post.id === postId) {
          const newComment = {
            id: Date.now(),
            text: commentText,
            username,
            created_datetime: new Date().toISOString()
          };
          const newComments = [...(post.comments || []), newComment];
          
          return {
            ...post,
            comments: newComments,
            comments_count: newComments.length
          };
        }
        return post;
      }));
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await postsAPI.deleteComment(postId, commentId);
      
      // Reload the posts to get the updated comments
      loadPosts();
    } catch (error) {
      console.error('Erro ao deletar comentário:', error);
      // Fallback para funcionamento local
      setPosts(posts.map(post => {
        if (post.id === postId) {
          const newComments = (post.comments || []).filter(comment => comment.id !== commentId);
          
          return {
            ...post,
            comments: newComments,
            comments_count: newComments.length
          };
        }
        return post;
      }));
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>CodeLeap Network</h1>
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>
      
      <div className="dashboard-content">
        <PostForm onSubmit={addPost} allUsers={Array.from(allUsers)} />
        <PostList 
          posts={posts}
          currentUser={username}
          onDelete={handleDeleteClick}
          onEdit={handleEditClick}
          onLike={handleLike}
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
          allUsers={Array.from(allUsers)}
        />
      </div>

      {showDeleteModal && (
        <DeleteModal
          onConfirm={() => deletePost(selectedPost.id)}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {showEditModal && (
        <EditModal
          post={selectedPost}
          onSave={editPost}
          onCancel={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;