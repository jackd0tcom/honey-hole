import { useState, useMemo } from "react";
import { useEffect } from "react";
import DealCard from "./DealCard.jsx";
import FilterBar from "./FilterBar.jsx";
import Sorter from "./Sorter.jsx";
import InfiniteGrid from "./InfiniteGrid.jsx";

const isFeatured = (deal) =>
  deal.categories?.[0]?.name?.toLowerCase() === "featured";

/**
 * Reorders deals so featured cards:
 * - only appear in the upper half
 * - at most one per row (columnsPerRow)
 * - are spread across rows/columns
 */
export function distributeFeaturedDeals(deals, columnsPerRow = 4) {
  if (!deals?.length) return deals;

  const featured = [];
  const regular = [];

  for (const deal of deals) {
    (isFeatured(deal) ? featured : regular).push(deal);
  }

  if (featured.length === 0) return deals;

  const total = deals.length;
  const upperHalfEnd = Math.ceil(total / 2);

  // One slot per row in the upper half (enforces max 1 featured per row)
  const columnPattern = [0, 2, 1, 3]; // rotate columns for visual spacing
  const targetIndices = [];

  for (let row = 0; row * columnsPerRow < upperHalfEnd; row++) {
    const index =
      row * columnsPerRow + columnPattern[row % columnPattern.length];
    if (index < upperHalfEnd) {
      targetIndices.push(index);
    }
  }

  // Cap featured count to available upper-half row slots
  const featuredToPlace = featured.slice(0, targetIndices.length);
  const overflowFeatured = featured.slice(targetIndices.length);

  const result = new Array(total).fill(null);

  featuredToPlace.forEach((deal, i) => {
    result[targetIndices[i]] = deal;
  });

  // Fill empty slots with regular deals, then any overflow featured at the end
  const fillQueue = [...regular, ...overflowFeatured];
  let fillIndex = 0;

  for (let i = 0; i < total; i++) {
    if (result[i] === null) {
      result[i] = fillQueue[fillIndex++];
    }
  }

  return result;
}

const DealGrid = ({ deals }) => {
  const [categories, setCategories] = useState("all");
  const [activeCategory, setActiveCategory] = useState(0);
  const [sort, setSort] = useState("newest");
  const [isMobile, setIsMobile] = useState(false);
  const [filtering, setFiltering] = useState(false);

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

  const getSavings = (a) => {
    if (!a.original_price || a.original_price === 0) return 0;
    return ((a.original_price - a.sales_price) / a.original_price) * 100;
  };

  const dealsArray = useMemo(() => {
    let result =
      categories === "all"
        ? [...deals]
        : deals.filter((deal) => deal.categories[0].slug === categories);

    if (sort === "newest") {
      result.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
    } else if (sort === "oldest") {
      result.sort((a, b) => new Date(a.date_added) - new Date(b.date_added));
    } else if (sort === "low") {
      result.sort((a, b) => a.sales_price - b.sales_price);
    } else if (sort === "high") {
      result.sort((a, b) => b.sales_price - a.sales_price);
    } else if (sort === "savings") {
      result.sort((a, b) => getSavings(b) - getSavings(a));
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    const columnsPerRow = isMobile ? (window.innerWidth < 480 ? 2 : 3) : 4;
    return distributeFeaturedDeals(result, columnsPerRow);
  }, [deals, categories, sort, isMobile]);

  // Mobile checking
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Error handling
  if (!deals || deals.length === 0) {
    return <div className="honey-hole-empty">No deals found</div>;
  }

  return (
    <>
      {isMobile && filtering && (
        <div className="mobile-filter-overlay">
          <div className="modal-wrapper">
            <FilterBar
              categories={categories}
              setCategories={setCategories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              isMobile={isMobile}
              setFiltering={setFiltering}
            />
          </div>
        </div>
      )}
      <div className="hh-grid-heading-wrapper">
        {isMobile ? (
          <>
            {" "}
            <div className="deal-grid-heading">
              <img
                className="deal-grid-icon"
                src={categoryIcon[activeCategory]}
              />
              <h2 className="deal-grid-title">
                {currentCategory[activeCategory]}
              </h2>
            </div>
          </>
        ) : (
          <>
            {" "}
            <h2 className="hh-heading">Honey Hole Deals</h2>{" "}
          </>
        )}
        {!isMobile && <Sorter sort={sort} setSort={setSort} />}
      </div>
      <div className="hh-main-bg">
        <div className="hh-main-wrapper">
          {isMobile ? (
            <div className="mobile-filter-buttons">
              <button
                id="mobile-filter-button"
                onClick={() => setFiltering(true)}
              >
                Filter
              </button>
              <Sorter />
            </div>
          ) : (
            <>
              {" "}
              <FilterBar
                categories={categories}
                setCategories={setCategories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                isMobile={isMobile}
              />
            </>
          )}
          <div className="hh-deal-grid-wrapper">
            {!isMobile && (
              <div className="deal-grid-heading">
                <img
                  className="deal-grid-icon"
                  src={categoryIcon[activeCategory]}
                />
                <h2 className="deal-grid-title">
                  {currentCategory[activeCategory]}
                </h2>
              </div>
            )}
            <InfiniteGrid dealsArray={dealsArray} categories={categories} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DealGrid;
