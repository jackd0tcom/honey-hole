import { useState } from "react";
import { useEffect } from "react";
import DealCard from "./DealCard.jsx";
import FilterBar from "./FilterBar.jsx";
import Sorter from "./Sorter.jsx";

const DealGrid = ({ deals }) => {
  const [categories, setCategories] = useState("all");
  const [dealsArray, setDealsArray] = useState(deals);
  const [originalArray, setOriginalArray] = useState(deals);
  const [activeCategory, setActiveCategory] = useState(0);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    if (categories === "all") {
      setDealsArray(deals);
    } else
      setDealsArray(
        deals.filter((deal) => {
          return deal.categories[0].slug === categories;
        })
      );
  }, [categories]);

  const getSavings = (a) => {
    if (!a.original_price || a.original_price === 0) return 0;
    return ((a.original_price - a.sales_price) / a.original_price) * 100;
  };

  const currentCategory = [
    "All Gear Deals",
    "Camping Gear",
    "Fishing Gear",
    "Hiking Gear",
    "Hunting Gear",
    "Outdoor Gear",
  ];

  const categoryIcon = [
    "https://outdoorempire.com/wp-content/uploads/2025/06/campfire-white.png",
    "https://outdoorempire.com/wp-content/uploads/2025/06/OutdoorEmpire_Icons2021_Tent-17-white.png",
    "https://outdoorempire.com/wp-content/uploads/2025/06/OutdoorEmpire_Icons2021_Fish-10-white.png",
    "https://outdoorempire.com/wp-content/uploads/2025/06/OutdoorEmpire_Icons2021_GearRating-38-white.png",
    "https://outdoorempire.com/wp-content/uploads/2025/06/OutdoorEmpire_Icons2021_Antler-03-white.png",
    "https://outdoorempire.com/wp-content/uploads/2025/06/OutdoorEmpire_Icons2021_Tree_Water-31-white.png",
  ];

  useEffect(() => {
    console.log("sorting");
    let sortedDeals = [...dealsArray];

    if (sort === "newest") {
      sortedDeals.sort(
        (a, b) => new Date(b.date_added) - new Date(a.date_added)
      );
    } else if (sort === "oldest") {
      sortedDeals.sort(
        (a, b) => new Date(a.date_added) - new Date(b.date_added)
      );
    } else if (sort === "low") {
      sortedDeals.sort((a, b) => a.sales_price - b.sales_price);
    } else if (sort === "high") {
      sortedDeals.sort((a, b) => b.sales_price - a.sales_price);
    } else if (sort === "savings") {
      sortedDeals.sort((a, b) => getSavings(b) - getSavings(a));
    } else if (sort === "rating") {
      sortedDeals.sort((a, b) => b.rating - a.rating);
    }

    setDealsArray(sortedDeals);
  }, [sort]);

  const test = () => {
    console.log(deals[0].categories[0].slug);
  };

  if (!deals || deals.length === 0) {
    return <div className="honey-hole-empty">No deals found</div>;
  }

  return (
    <>
      <div className="hh-grid-heading-wrapper">
        <h2 className="hh-heading">Honey Hole Deals</h2>{" "}
        <Sorter sort={sort} setSort={setSort} />
      </div>
      <div className="hh-main-bg">
        <div className="hh-main-wrapper">
          <FilterBar
            categories={categories}
            setCategories={setCategories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <div className="hh-deal-grid-wrapper">
            <div className="deal-grid-heading">
              <img
                className="deal-grid-icon"
                src={categoryIcon[activeCategory]}
              />
              <h2 className="deal-grid-title">
                {currentCategory[activeCategory]}
              </h2>
            </div>
            <div className="deals-grid">
              {dealsArray.map((deal) => (
                <DealCard
                  promo={deal.promo_code}
                  key={deal.id}
                  deal={deal}
                  categories={categories}
                  seller={deal.seller}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealGrid;
