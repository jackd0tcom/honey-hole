import { useState } from "react";

const FilterBar = ({ categories, setCategories }) => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="hh-filter-bar">
      <h4 id="hh-filter">Filter</h4>
      <div className="hh-categories">
        <h4 className="hh-filter-subheading">Categories</h4>
        <button
          className="hh-filter-button"
          id={activeCategory === 0 ? "hh-active-category" : ""}
          onClick={() => {
            setActiveCategory(0);
            setCategories("all");
          }}
        >
          <p className="hh-filter-icon">+</p>
          <h2 className="hh-filter-heading">All Gear Deals</h2>
        </button>
        <button
          className="hh-filter-button"
          id={activeCategory === 1 ? "hh-active-category" : ""}
          onClick={() => {
            setActiveCategory(1);
            setCategories("camping-gear");
          }}
        >
          <p className="hh-filter-icon">+</p>
          <h2 className="hh-filter-heading">Camping Gear</h2>
        </button>
        <button
          className="hh-filter-button"
          id={activeCategory === 2 ? "hh-active-category" : ""}
          onClick={() => {
            setActiveCategory(2);
            setCategories("fishing-gear");
          }}
        >
          <p className="hh-filter-icon">+</p>
          <h2 className="hh-filter-heading">Fishing Gear</h2>
        </button>
        <button
          className="hh-filter-button"
          id={activeCategory === 3 ? "hh-active-category" : ""}
          onClick={() => {
            setActiveCategory(3);
            setCategories("hiking-gear");
          }}
        >
          <p className="hh-filter-icon">+</p>
          <h2 className="hh-filter-heading">Hiking Gear</h2>
        </button>
        <button
          className="hh-filter-button"
          id={activeCategory === 4 ? "hh-active-category" : ""}
          onClick={() => {
            setActiveCategory(4);
            setCategories("hunting-gear");
          }}
        >
          <p className="hh-filter-icon">+</p>
          <h2 className="hh-filter-heading">Hunting Gear</h2>
        </button>
        <button
          className="hh-filter-button"
          id={activeCategory === 5 ? "hh-active-category" : ""}
          onClick={() => {
            setActiveCategory(5);
            setCategories("outdoor-gear");
          }}
        >
          <p className="hh-filter-icon">+</p>
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
