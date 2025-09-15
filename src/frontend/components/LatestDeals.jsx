import { useState } from "react";
import { useEffect } from "react";
import DealCard from "./DealCard.jsx";

const LatestDeals = ({ deals }) => {
  const [sortedDeals, setSortedDeals] = useState([]);

  useEffect(() => {
    setSortedDeals(
      deals
        .filter((deal) => {
          return deal.categories[0].name !== "Big Sale";
        })
        .slice(0, 4)
    );
  }, [deals]);

  return (
    <>
      <div class="category-section">
        <p id="hh-affiliate-disclaimer">
          DISCLAIMER: Outdoor Empire does not sell the products on this page.
          Some or all links are affiliate links which means we may earn a small
          commission if you make a purchase, at no cost to you. As an Amazon
          Associate I earn from qualifying purchases. Discounts and availability
          are not guaranteed. Verify all information at respective retailers
          before making a purchase.{" "}
          <a
            href="https://outdoorempire.com/affiliate-disclaimer/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </p>
        <h2>Just Added</h2>
        <div className="deals-grid">
          {sortedDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>
    </>
  );
};

export default LatestDeals;
