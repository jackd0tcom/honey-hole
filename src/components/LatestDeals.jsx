import { useState } from "react";
import { useEffect } from "react";
import DealCard from "./DealCard.jsx";

const LatestDeals = ({ deals }) => {
  const [sortedDeals, setSortedDeals] = useState([]);

  useEffect(() => {
    setSortedDeals(deals.slice(0, 4));
  }, [deals]);

  return (
    <>
      <h2>Just Added</h2>
      <div className="deals-grid">
        {sortedDeals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </>
  );
};

export default LatestDeals;
