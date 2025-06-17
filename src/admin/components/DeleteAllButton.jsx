import { useState } from "react";

const DeleteAllButton = ({ onRefreshDeals }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAll = async () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }

    if (!window.confirm("Are you absolutely sure you want to delete ALL deals? This action cannot be undone.")) {
      setIsConfirming(false);
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch("/wp-json/honey-hole/v1/delete-posts", {
        method: "POST",
        headers: {
          "X-WP-Nonce": window.honeyHoleAdmin.nonce,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_ids: "all" // Special flag to delete all
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete all deals");
      }

      // Call the callback to refresh the deals list
      if (onRefreshDeals) {
        onRefreshDeals();
      }

      // Show success message
      alert("All deals have been deleted successfully!");
    } catch (error) {
      console.error("Error deleting all deals:", error);
      alert("Failed to delete all deals. Please try again.");
    } finally {
      setIsDeleting(false);
      setIsConfirming(false);
    }
  };

  return (
    <div className="honey-hole-delete-all-container">
      <div className="honey-hole-delete-all-warning">
        <h3>⚠️ Danger Zone</h3>
        <p>This action will permanently delete ALL deals from your database. This cannot be undone.</p>
      </div>
      <button
        className={`button ${isConfirming ? 'button-primary' : 'button-secondary'} ${isDeleting ? 'disabled' : ''}`}
        onClick={handleDeleteAll}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : isConfirming ? "Click again to confirm" : "Delete All Deals"}
      </button>
      {isConfirming && !isDeleting && (
        <button
          className="button"
          onClick={() => setIsConfirming(false)}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default DeleteAllButton; 