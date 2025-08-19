import React from 'react';
import './Modal.css';

const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content delete-modal">
        <h3>Are you sure you want to delete this item?</h3>
        <div className="modal-actions">
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="delete-button" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;