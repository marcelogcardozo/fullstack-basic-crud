import React from 'react';
import Comments from './Comments';
import MentionText from './MentionText';
import './PostItem.css';

const PostItem = ({ post, currentUser, onDelete, onEdit, onLike, onAddComment, onDeleteComment, allUsers = [] }) => {
  const isOwner = post.username === currentUser;
  const hasLiked = post.likes && post.likes.includes(currentUser);
  
  const formatTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60));
    
    if (diff < 60) {
      return `${diff} minutes ago`;
    } else if (diff < 1440) {
      return `${Math.floor(diff / 60)} hours ago`;
    } else {
      return `${Math.floor(diff / 1440)} days ago`;
    }
  };

  return (
    <div className="post-item">
      <div className="post-header">
        <h3 className="post-title">{post.title}</h3>
        {isOwner && (
          <div className="post-actions">
            <button 
              className="action-button"
              onClick={() => onDelete(post)}
              title="Delete"
            >
              <img src="/lixeira.ico" alt="Delete" width="18" height="22" />
            </button>
            <button 
              className="action-button"
              onClick={() => onEdit(post)}
              title="Edit"
            >
              <img src="/editar.ico" alt="Edit" width="32" height="30" />
            </button>
          </div>
        )}
      </div>
      
      <div className="post-meta">
        <span className="post-author">@{post.username}</span>
        <span className="post-time">{formatTime(new Date(post.created_datetime || post.createdAt))}</span>
      </div>
      
      <div className="post-content">
        <MentionText text={post.content} />
      </div>
      
      <div className="post-footer">
        <button 
          className={`like-button ${hasLiked ? 'liked' : ''}`}
          onClick={() => onLike(post.id)}
          title={hasLiked ? 'Unlike' : 'Like'}
        >
          {hasLiked ? '❤️' : '🤍'} {post.likesCount || 0}
        </button>
      </div>

      <Comments 
        comments={post.comments || []}
        onAddComment={onAddComment}
        onDeleteComment={onDeleteComment}
        postId={post.id}
        currentUser={currentUser}
        allUsers={allUsers}
      />
    </div>
  );
};

export default PostItem;