import { useState, useCallback, useEffect } from "react";
import DealCard from "./DealCard";
import ConfirmButton from "./ConfirmButton";

const DealList = ({ deals: initialDeals }) => {
  const [deals, setDeals] = useState(initialDeals);
  const [isConfirming, setIsConfirming] = useState(false);
  const [bulkDeals, setBulkDeals] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Update local state when initialDeals changes
  useEffect(() => {
    setDeals(initialDeals);
  }, [initialDeals]);

  useEffect(() => {
    console.log("isDeleting changed:", isDeleting);
    if (!isDeleting) {
      console.log("Refreshing deals after deletion");
      refreshDeals();
    }
  }, [isDeleting]);

  const refreshDeals = useCallback(async () => {
    console.log("Fetching updated deals");
    try {
      const response = await fetch("/wp-json/honey-hole/v1/deals");
      if (!response.ok) throw new Error("Failed to fetch deals");
      const updatedDeals = await response.json();
      setDeals(updatedDeals);
    } catch (error) {
      console.error("Error refreshing deals:", error);
    }
  }, []);

  const handleBulkToggle = useCallback(
    (deal) => {
      if (bulkDeals.includes(deal.id)) {
        const newBulkDeals = bulkDeals.filter((id) => id !== deal.id);
        setBulkDeals(newBulkDeals);
        setIsConfirming(newBulkDeals.length > 0);
      } else {
        setBulkDeals([...bulkDeals, deal.id]);
        setIsConfirming(true);
      }
    },
    [bulkDeals, setBulkDeals, setIsConfirming]
  );

  // Group deals by category
  const groupedDeals = deals.reduce((acc, deal) => {
    const category = deal.categories[0]?.name || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(deal);
    return acc;
  }, {});

  return (
    <>
      {isConfirming ? (
        <ConfirmButton
          isConfirming={isConfirming}
          setIsConfirming={setIsConfirming}
          bulkDeals={bulkDeals}
          setBulkDeals={setBulkDeals}
          isDeleting={isDeleting}
          setIsDeleting={setIsDeleting}
          onCancel={() => {
            setBulkDeals([]);
            setIsConfirming(false);
          }}
        />
      ) : (
        ""
      )}
      <div className="honey-hole-deals-container">
        {Object.entries(groupedDeals).map(([category, categoryDeals]) => (
          <div key={category} className="honey-hole-category-section">
            <h2 className="honey-hole-category-title">{category}</h2>
            <div className="honey-hole-deals-grid">
              {categoryDeals.map((deal) => (
                <DealCard
                  key={deal.id}
                  deal={deal}
                  onUpdate={refreshDeals}
                  bulkDeals={bulkDeals}
                  setBulkDeals={setBulkDeals}
                  isConfirming={isConfirming}
                  setIsConfirming={setIsConfirming}
                  handleBulkToggle={() => handleBulkToggle(deal)}
                  isDeleting={isDeleting}
                  setIsDeleting={setIsDeleting}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DealList;
