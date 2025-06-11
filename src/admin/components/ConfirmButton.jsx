import { useState } from "react";

const ConfirmButton = ({
  isConfirming,
  setIsConfirming,
  bulkDeals,
  setBulkDeals,
  setIsDeleting,
  isDeleting,
  onCancel,
}) => {
  const handleBulkDelete = async () => {
    try {
      setIsDeleting(true);
      console.log("Deleting", bulkDeals);
      const headers = {
        "X-WP-Nonce": honeyHoleAdmin.nonce,
        "Content-Type": "application/json",
      };
      const response = await fetch(
        `/wp-json/honey-hole/v1/delete-posts?post_ids=${bulkDeals}`,
        {
          method: "POST",
          headers: headers,
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Delete failed:", response.status, errorData);
        throw new Error("Failed to delete deal");
      }
      setBulkDeals([]);
      setIsConfirming(false);
      setIsDeleting(false);
    } catch (error) {
      console.log("Error deleting Deal", error);
    }
  };
  const handleCancel = () => {
    setBulkDeals([]);
    setIsConfirming(false);
    if (onCancel) {
      onCancel();
    }
  };
  return (
    <>
      {isDeleting && (
        <div className="hh-deleting-overlay">
          <div className="hh-deleting-spinner">Deleting...</div>
        </div>
      )}
      <div className="hh-confirm-wrapper">
        <p>Are you sure you want to delete?</p>
        <button onClick={handleBulkDelete}>Delete Selected</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </>
  );
};

export default ConfirmButton;
