import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This will be replaced with actual WordPress REST API call
    const fetchDeals = async () => {
      try {
        // TODO: Replace with actual WordPress REST API endpoint
        const response = await fetch("/wp-json/honey-hole/v1/deals");
        const data = await response.json();
        setDeals(data);
      } catch (err) {
        setError("Failed to fetch deals");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) return <div className="loading">Loading deals...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="honey-hole-deals">
      <h1>Outdoor Gear Deals</h1>
      <div className="deals-grid">
        {deals.map((deal) => (
          <div key={deal.id} className="deal-card">
            <img src={deal.image_url} alt={deal.title} />
            <h2>{deal.title}</h2>
            <p className="price">${deal.price}</p>
            <p className="description">{deal.description}</p>
            <div className="deal-meta">
              <span className="category">{deal.category}</span>
              <span className="expires">Expires: {deal.expiration_date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
