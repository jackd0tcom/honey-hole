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
          All Gear Deals
        </button>
        <button
          id={activeCategory === 1 ? "hh-active-category" : ""}
          onClick={() => {
            setActiveCategory(1);
            setCategories("camping-gear");
          }}
        >
          Camping Gear
        </button>
        <button
          id={activeCategory === 2 ? "hh-active-category" : ""}
          onClick={() => {
            setActiveCategory(2);
            setCategories("fishing-gear");
          }}
        >
          Fishing Gear
        </button>
        <button
          id={activeCategory === 3 ? "hh-active-category" : ""}
          onClick={() => {
            setActiveCategory(3);
            setCategories("hiking-gear");
          }}
        >
          Hiking Gear
        </button>
        <button
          id={activeCategory === 4 ? "hh-active-category" : ""}
          onClick={() => {
            setActiveCategory(4);
            setCategories("hunting-gear");
          }}
        >
          Hunting Gear
        </button>
        <button
          id={activeCategory === 5 ? "hh-active-category" : ""}
          onClick={() => {
            setActiveCategory(5);
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
