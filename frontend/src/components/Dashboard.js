import React, { useState, useEffect } from 'react';
import PostForm from './PostForm';
import PostList from './PostList';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import './Dashboard.css';

const Dashboard = ({ username, onLogout }) => {
  const [posts, setPosts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [allUsers, setAllUsers] = useState(new Set());

  useEffect(() => {
    const savedPosts = localStorage.getItem('codeleap_posts');
    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts);
      setPosts(parsedPosts);
      
      // Extract all users from posts and comments
      const users = new Set();
      parsedPosts.forEach(post => {
        users.add(post.username);
        if (post.comments) {
          post.comments.forEach(comment => {
            users.add(comment.username);
          });
        }
      });
      setAllUsers(users);
    }
  }, []);

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

  const addPost = (newPost) => {
    const post = {
      id: Date.now(),
      ...newPost,
      username,
      createdAt: new Date(),
      likes: [],
      likesCount: 0,
      comments: [],
      commentsCount: 0
    };
    setPosts([post, ...posts]);
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
    setShowDeleteModal(false);
    setSelectedPost(null);
  };

  const editPost = (updatedPost) => {
    setPosts(posts.map(post => 
      post.id === updatedPost.id ? { ...post, ...updatedPost } : post
    ));
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

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const hasLiked = post.likes.includes(username);
        const newLikes = hasLiked 
          ? post.likes.filter(user => user !== username)
          : [...post.likes, username];
        
        return {
          ...post,
          likes: newLikes,
          likesCount: newLikes.length
        };
      }
      return post;
    }));
  };

  const handleAddComment = (postId, commentText) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now(),
          text: commentText,
          username,
          createdAt: new Date()
        };
        const newComments = [...post.comments, newComment];
        
        return {
          ...post,
          comments: newComments,
          commentsCount: newComments.length
        };
      }
      return post;
    }));
  };

  const handleDeleteComment = (postId, commentId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComments = post.comments.filter(comment => comment.id !== commentId);
        
        return {
          ...post,
          comments: newComments,
          commentsCount: newComments.length
        };
      }
      return post;
    }));
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