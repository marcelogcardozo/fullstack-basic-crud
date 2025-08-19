import React, { useState } from 'react';
import './Modal.css';

const EditModal = ({ post, onSave, onCancel }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onSave({
        ...post,
        title: title.trim(),
        content: content.trim()
      });
    }
  };

  const isFormValid = title.trim() && content.trim();

  return (
    <div className="modal-overlay">
      <div className="modal-content edit-modal">
        <h3>Edit item</h3>
        
        <div className="form-group">
          <label htmlFor="edit-title">Title</label>
          <input
            type="text"
            id="edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="edit-content">Content</label>
          <textarea
            id="edit-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="Content here"
          />
        </div>
        
        <div className="modal-actions">
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button 
            className={`save-button ${!isFormValid ? 'disabled' : ''}`}
            onClick={handleSave}
            disabled={!isFormValid}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;