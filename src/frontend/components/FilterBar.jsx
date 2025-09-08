import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import EmailSignup from "./EmailSignup";

const FilterBar = ({
  categories,
  setCategories,
  activeCategory,
  setActiveCategory,
  isMobile,
  setFiltering,
}) => {
  return (
    <div className="sidebar">
      {isMobile && (
        <div className="mobile-sidebar-header">
          <p>Filter</p>
          <p className="mobile-close" onClick={() => setFiltering(false)}>
            ×
          </p>
        </div>
      )}
      <div className="hh-filter-bar">
        {!isMobile && <h4 id="hh-filter">Filter</h4>}
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
      </div>
      <SideBar />
      <EmailSignup />
    </div>
  );
};

export default FilterBar;
