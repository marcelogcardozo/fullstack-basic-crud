import React, { useState } from 'react';
import './PostForm.css';

const PostForm = ({ onSubmit, allUsers = [] }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({ title, content });
      setTitle('');
      setContent('');
    }
  };

  const isFormValid = title.trim() && content.trim();

  return (
    <div className="post-form-container">
      <h2>What's on your mind?</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Hello world"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            placeholder="Content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
          />
        </div>
        
        <button 
          type="submit" 
          className={`create-button ${!isFormValid ? 'disabled' : ''}`}
          disabled={!isFormValid}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default PostForm;