import React, { useState } from 'react';

const DeleteAllButton = ({ onDeleteAll }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch('/wp-admin/admin-ajax.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          action: 'delete_all_deals',
          honey_hole_nonce: honeyHoleAdmin.nonce,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete all deals');
      }

      onDeleteAll();
      setShowConfirm(false);
    } catch (error) {
      console.error('Error deleting all deals:', error);
      alert('Failed to delete all deals. Please try again.');
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div className="delete-all-button-container">
      <button 
        className="honey-hole-delete-all-button" 
        onClick={handleClick}
      >
        Delete All Deals
      </button>

      {showConfirm && (
        <div className="honey-hole-confirm-dialog">
          <div className="honey-hole-confirm-content">
            <h3>Confirm Delete All Deals</h3>
            <p>Are you sure you want to delete all deals? This action cannot be undone.</p>
            <div className="honey-hole-confirm-buttons">
              <button 
                className="honey-hole-confirm-button" 
                onClick={handleConfirm}
              >
                Yes, Delete All
              </button>
              <button 
                className="honey-hole-cancel-button" 
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAllButton; 