import React, { useState } from 'react';
import MentionInput from './MentionInput';
import MentionText from './MentionText';
import './Comments.css';

const Comments = ({ comments, onAddComment, onDeleteComment, postId, currentUser, allUsers = [] }) => {
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (newComment.trim()) {
      onAddComment(postId, newComment.trim());
      setNewComment('');
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60));
    
    if (diff < 60) {
      return `${diff}m ago`;
    } else if (diff < 1440) {
      return `${Math.floor(diff / 60)}h ago`;
    } else {
      return `${Math.floor(diff / 1440)}d ago`;
    }
  };

  return (
    <div className="comments-section">
      <button 
        className="comments-toggle"
        onClick={() => setShowComments(!showComments)}
      >
        💬 {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
      </button>

      {showComments && (
        <div className="comments-container">
          <form onSubmit={handleSubmit} className="comment-form">
            <MentionInput
              value={newComment}
              onChange={setNewComment}
              onSubmit={handleSubmit}
              placeholder="Add a comment... (type @ to mention users)"
              className="comment-input"
              allUsers={allUsers}
            />
            <button 
              type="submit" 
              className="comment-submit"
              disabled={!newComment.trim()}
            >
              Post
            </button>
          </form>

          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <div className="comment-info">
                    <span className="comment-author">@{comment.username}</span>
                    <span className="comment-time">{formatTime(new Date(comment.created_datetime || comment.createdAt))}</span>
                  </div>
                  {comment.username === currentUser && (
                    <button 
                      className="comment-delete-button"
                      onClick={() => onDeleteComment(postId, comment.id)}
                      title="Delete comment"
                    >
                      🗑️
                    </button>
                  )}
                </div>
                <MentionText text={comment.text} className="comment-text" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;