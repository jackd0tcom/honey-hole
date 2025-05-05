import { useState } from "react";

const FilterBar = ({ categories, setCategories }) => {
  const [active, setActive] = useState("");
  return (
    <div className="honey-hole-filter-bar">
      <div className="honey-hole-categories">
        <button
          onClick={() => {
            setCategories("all");
            console.log("all");
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            setCategories("camping-gear");
          }}
        >
          Camping Gear
        </button>
        <button
          onClick={() => {
            setCategories("fishing-gear");
          }}
        >
          Fishing Gear
        </button>
        <button
          onClick={() => {
            setCategories("hiking-gear");
          }}
        >
          Hiking Gear
        </button>
        <button
          onClick={() => {
            setCategories("hunting-gear");
          }}
        >
          Hunting Gear
        </button>
        <button
          onClick={() => {
            setCategories("outdoor-gear");
          }}
        >
          Outdoor Gear
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
