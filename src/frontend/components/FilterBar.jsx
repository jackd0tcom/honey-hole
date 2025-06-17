import { useState } from "react";

const FilterBar = ({ categories, setCategories }) => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="hh-filter-bar">
      <div className="hh-categories">
        <button
          id={activeCategory === 0 ? "hh-active-category" : ""}
          onClick={() => {
            setActiveCategory(0);
            setCategories("all");
          }}
        >
          <img
            src="https://outdoorempire.com/wp-content/uploads/2025/06/campfire-white.png"
            alt=""
          />
          <h2 className="hh-filter-heading">All Gear Deals</h2>
        </button>
        <button
          id={activeCategory === 1 ? "hh-active-category" : ""}
          onClick={() => {
            setActiveCategory(1);
            setCategories("camping-gear");
          }}
        >
          <img
            src="https://outdoorempire.com/wp-content/uploads/2025/06/OutdoorEmpire_Icons2021_Tent-17-white.png"
            alt=""
          />
          <h2 className="hh-filter-heading">Camping Gear</h2>
        </button>
        <button
          id={activeCategory === 2 ? "hh-active-category" : ""}
          onClick={() => {
            setActiveCategory(2);
            setCategories("fishing-gear");
          }}
        >
          <img
            src="https://outdoorempire.com/wp-content/uploads/2025/06/OutdoorEmpire_Icons2021_Fish-10-white.png"
            alt=""
          />
          <h2 className="hh-filter-heading">Fishing Gear</h2>
        </button>
        <button
          id={activeCategory === 3 ? "hh-active-category" : ""}
          onClick={() => {
            setActiveCategory(3);
            setCategories("hiking-gear");
          }}
        >
          <img
            src="https://outdoorempire.com/wp-content/uploads/2025/06/OutdoorEmpire_Icons2021_GearRating-38-white.png"
            alt=""
          />
          <h2 className="hh-filter-heading">Hiking Gear</h2>
        </button>
        <button
          id={activeCategory === 4 ? "hh-active-category" : ""}
          onClick={() => {
            setActiveCategory(4);
            setCategories("hunting-gear");
          }}
        >
          <img
            src="https://outdoorempire.com/wp-content/uploads/2025/06/OutdoorEmpire_Icons2021_Antler-03-white.png"
            alt=""
          />
          <h2 className="hh-filter-heading">Hunting Gear</h2>
        </button>
        <button
          id={activeCategory === 5 ? "hh-active-category" : ""}
          onClick={() => {
            setActiveCategory(5);
            setCategories("outdoor-gear");
          }}
        >
          <img
            src="          https://outdoorempire.com/wp-content/uploads/2025/06/OutdoorEmpire_Icons2021_Tree_Water-31-white.png"
            alt=""
          />
          <h2 className="hh-filter-heading">Outdoor Gear</h2>
        </button>
      </div>
      {/* <div className="honey-hole-sort">
            <select
                value={filters.sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
            >
                <option value="date">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
                <option value="rating">Highest Rated</option>
            </select>
        </div> */}
    </div>
  );
};

export default FilterBar;
