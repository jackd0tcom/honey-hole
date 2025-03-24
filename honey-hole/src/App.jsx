import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        // Get the WordPress site URL from the container element or use development URL
        const container = document.getElementById("honey-hole-root");
        const siteUrl = container?.dataset.siteUrl || "http://honey-hole.local";

        console.log(
          "Fetching deals from:",
          `${siteUrl}/wp-json/honey-hole/v1/deals`
        );
        const response = await fetch(`${siteUrl}/wp-json/honey-hole/v1/deals`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched deals:", data);
        setDeals(data);
      } catch (err) {
        console.error("Error fetching deals:", err);
        setError("Failed to fetch deals");
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  // Get shortcode attributes from the container element or use defaults
  const container = document.getElementById("honey-hole-root");
  const category = container?.dataset.category || "";
  const count = parseInt(container?.dataset.count || "-1");
  const columns = parseInt(container?.dataset.columns || "3");

  // Filter deals by category if specified
  const filteredDeals = category
    ? deals.filter((deal) => deal.category === category)
    : deals;

  // Limit number of deals if count is specified
  const limitedDeals =
    count > 0 ? filteredDeals.slice(0, count) : filteredDeals;

  if (loading) return <div className="loading">Loading deals...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="honey-hole-deals">
      <div
        className="deals-grid"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {limitedDeals.map((deal) => (
          <div key={deal.id} className="deal-card">
            <a
              href={deal.deal_url}
              target="_blank"
              rel="noopener noreferrer"
              className="deal-card-link"
            >
              <div className="deal-image">
                {deal.image_url ? (
                  <img src={deal.image_url} alt={deal.title} />
                ) : (
                  <div className="no-image">No image</div>
                )}
              </div>
              <div className="deal-content">
                <h3 className="deal-title">{deal.title}</h3>
                <div className="deal-pricing">
                  <span className="sales-price">${deal.sales_price}</span>
                  {deal.original_price > 0 && (
                    <span className="original-price">
                      ${deal.original_price}
                    </span>
                  )}
                  {deal.discount > 0 && (
                    <span className="discount discount-high">
                      -{deal.discount}% Off
                    </span>
                  )}
                </div>
                <div className="deal-rating">
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${
                          star <= deal.rating ? "filled" : ""
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  {/* <span className="rating-value">{deal.rating.toFixed(1)}</span> */}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
