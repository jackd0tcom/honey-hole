import React, { useState, useEffect } from "react";
import AddDealButton from "./AddDealButton";
import DeleteAllButton from "./DeleteAllButton";
import DealCard from "./DealCard";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar.jsx";

const DealsManager = () => {
  const [deals, setDeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDeals();
    fetchCategories();
  }, []);

  const fetchDeals = async () => {
    try {
      const response = await fetch("/wp-json/honey-hole/v1/deals");
      if (!response.ok) throw new Error("Failed to fetch deals");
      const data = await response.json();
      setDeals(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/wp-json/honey-hole/v1/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredDeals = deals.filter((deal) => {
    const matchesCategory =
      selectedCategory === "all" || deal.category === selectedCategory;
    const matchesSearch =
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const groupedDeals = filteredDeals.reduce((acc, deal) => {
    const category = deal.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(deal);
    return acc;
  }, {});

  if (loading)
    return <div className="honey-hole-loading">Loading deals...</div>;
  if (error) return <div className="honey-hole-error">Error: {error}</div>;

  return (
    <div className="honey-hole-admin">
      <div className="honey-hole-header">
        <div className="honey-hole-logo">
          <img src={honeyHoleAdmin.logoUrl} alt="Honey Hole" />
        </div>
        <div className="honey-hole-controls">
          <SearchBar onSearch={handleSearch} />
          <div className="honey-hole-button-group">
          <AddDealButton />
            <DeleteAllButton onDeleteAll={fetchDeals} />
          </div>
        </div>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="honey-hole-deals-container">
        {Object.entries(groupedDeals).map(([category, categoryDeals]) => (
          <div key={category} className="honey-hole-category-section">
            <h2 className="honey-hole-category-title">{category}</h2>
            <div className="honey-hole-deals-grid">
              {categoryDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} onUpdate={fetchDeals} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealsManager;
