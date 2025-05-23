import { useState } from "react";
import { useEffect } from "react";
import DealCard from "./DealCard.jsx";
import FilterBar from "./FilterBar.jsx";

const DealGrid = ({ deals }) => {
  const [categories, setCategories] = useState("all");
  const [dealsArray, setDealsArray] = useState(deals);
  const [originalArray, setOriginalArray] = useState(deals);

  useEffect(() => {
    if (categories === "all") {
      setDealsArray(deals);
    } else
      setDealsArray(
        deals.filter((deal) => {
          return deal.categories[0] === categories;
        })
      );
  }, [categories]);

  if (!deals || deals.length === 0) {
    return <div className="honey-hole-empty">No deals found</div>;
  }

  return (
    <>
      <FilterBar categories={categories} setCategories={setCategories} />
      <div className="deals-grid">
        {dealsArray.map((deal) => (
          <DealCard key={deal.id} deal={deal} categories={categories} />
        ))}
      </div>
    </>
  );
};

export default DealGrid;
