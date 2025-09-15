import { render, useState, useEffect } from "@wordpress/element";
import DealGrid from "./DealGrid.jsx";
import FilterBar from "./FilterBar.jsx";
import SearchBar from "./SearchBar.jsx";
import EmailSignup from "./EmailSignup.jsx";
import LatestDeals from "./LatestDeals.jsx";
import Hero from "./Hero.jsx";
import DealsVideo from "./DealsVideo.jsx";
import DealOMeterGraphic from "./DealOMeterGraphic.jsx";
import HeroEmailSignup from "./HeroEmailSignup.jsx";

const App = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    sortBy: "date",
    searchQuery: "",
  });

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      setLoading(true);
      const response = await fetch(honeyHoleData.apiUrl, {
        headers: {
          "X-WP-Nonce": honeyHoleData.nonce,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch deals");
      }

      const data = await response.json();
      setDeals(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="honey-hole-wrapper">
      <div className="honey-hole-header">
        <Hero />
        {/* <div className="hero-header-two"> */}
        {/* <DealOMeterGraphic /> */}
        {/* <HeroEmailSignup /> */}
        {/* </div> */}
        {error && <div className="honey-hole-error">{error}</div>}
      </div>
      {loading ? (
        <div className="honey-hole-loading">Loading deals...</div>
      ) : (
        <DealGrid deals={deals} />
      )}
    </div>
  );
};

export default App;
