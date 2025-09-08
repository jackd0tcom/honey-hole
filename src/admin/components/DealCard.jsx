import { useState } from "react";

const DealCard = ({
  deal,
  onUpdate,
  handleBulkToggle,
  setIsDeleting,
  bulkDeals,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formattedPrice = USDollar.format(deal.sales_price);

  const handleVisibilityToggle = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(
        `/wp-json/honey-hole/v1/deals/${deal.id}/visibility`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-WP-Nonce": honeyHoleAdmin.visibility_nonce,
          },
          body: JSON.stringify({
            is_visible: !deal.is_visible,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update visibility");
      onUpdate();
    } catch (error) {
      console.error("Error updating visibility:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this deal?")) return;

    setIsUpdating(true);
    setIsDeleting(true);
    try {
      console.log("Deleting deal:", deal.id);
      const headers = {
        "X-WP-Nonce": honeyHoleAdmin.nonce,
        "Content-Type": "application/json",
      };
      const response = await fetch(
        `/wp-json/honey-hole/v1/delete-post/${deal.id}`,
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

      if (typeof onUpdate === "function") {
        onUpdate();
      }
    } catch (error) {
      console.error("Error deleting deal:", error);
    } finally {
      setIsUpdating(false);
      setIsDeleting(false);
    }
  };

  const getDealMeter = (percentage) => {
    if (percentage >= 60)
      return "https://outdoorempire.com/wp-content/uploads/2025/07/Red-Deal-O-Meter.png";
    if (percentage >= 50)
      return "https://outdoorempire.com/wp-content/uploads/2025/07/Orange-Deal-O-Meter.png";
    if (percentage >= 40)
      return "https://outdoorempire.com/wp-content/uploads/2025/07/Yellow-Deal-O-Meter.png";
    if (percentage >= 30)
      return "https://outdoorempire.com/wp-content/uploads/2025/07/Blue-Deal-O-Meter.png";
    return "https://outdoorempire.com/wp-content/uploads/2025/07/Green-Deal-O-Meter.png";
  };

  const discount =
    deal.original_price > 0
      ? Math.round(
          ((deal.original_price - deal.sales_price) / deal.original_price) * 100
        )
      : 0;

  return (
    <div className="honey-hole-deal-card">
      <div className="deal-card-header">
        {/* <div className="visibility-toggle" onClick={handleVisibilityToggle}>
                    <span className={`dashicons dashicons-${deal.is_visible ? 'visibility' : 'hidden'}`}></span>
                    <span className="visibility-status">
                        {deal.is_visible ? 'Visible' : 'Hidden'}
                    </span>
                </div> */}
        <div className="hh-bulk-toggle">
          <input
            type="checkbox"
            checked={bulkDeals.includes(deal.id)}
            onChange={() => handleBulkToggle(deal.id)}
          />
        </div>
        <div className="deal-rating">
          <div className="deal-o-meter-card">
            {!deal.rating ? (
              <img
                className="deal-o-meter-card-img"
                src={getDealMeter(deal.discount_percentage)}
                alt=""
              />
            ) : (
              <img
                className="deal-o-meter-card-img"
                src={getDealMeter(deal.rating * 14)}
                alt="Great Price"
              />
            )}
          </div>
        </div>
        <div className="deal-actions">
          <a
            href={`/wp-admin/admin.php?page=honey-hole-edit-deal&id=${deal.id}`}
            className="button"
          >
            Edit
          </a>
          <button
            className="button"
            onClick={handleDelete}
            disabled={isUpdating}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="deal-image">
        {deal.image_url ? (
          <img
            src={deal.image_url}
            alt={deal.title}
            className="deal-thumbnail-image"
          />
        ) : (
          <div className="no-image">No Image</div>
        )}
        {deal.badge && !deal.promo_code && (
          <p className="hh-admin-deal-badge">{deal.badge}</p>
        )}
        {deal.promo_code && !deal.badge && (
          <p className="hh-admin-deal-badge">{deal.promo_code}</p>
        )}
        {deal.promo_code && deal.badge && (
          <div className="hh-admin-deal-promo-code">
            <span>{deal.promo_code}</span>
            <span>{deal.badge}</span>
          </div>
        )}
      </div>

      <div className="deal-content">
        <h3 className="deal-title">{deal.title}</h3>

        <div className="deal-pricing">
          {deal.sales_price && (
            <>
              <span className="sales-price">{formattedPrice}</span>
              <span className="original-price">
                {USDollar.format(deal.original_price)}
              </span>
            </>
          )}
          {!deal.sales_price && (
            <span className="original-price-only">
              {USDollar.format(deal.original_price)}
            </span>
          )}
          {deal.discount_percentage && (
            <span className="discount">{deal.discount_percentage}% OFF</span>
          )}
        </div>

        <div className="deal-seller">
          {deal.seller ? deal.seller : "No Seller Saved"}
        </div>

        <div className="deal-tags">{deal.tags && deal.tags.join(", ")}</div>

        <div className="deal-date">
          Added: {new Date(deal.date_added).toLocaleDateString()}
        </div>

        <a
          href={deal.product_url}
          target="_blank"
          rel="noopener noreferrer"
          className="button affiliate-link"
        >
          View Deal
        </a>
      </div>
    </div>
  );
};

export default DealCard;
