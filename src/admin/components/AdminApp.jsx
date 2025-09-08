import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import DealList from "./DealList";
import AddDealButton from "./AddDealButton";
import CategoryFilter from "./CategoryFilter";
import DeleteAllButton from "./DeleteAllButton";

const AdminApp = () => {
  const [deals, setDeals] = useState([]);
  const [originalDeals, setOriginalDeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all-deals");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [dealsData, categoriesData] = await Promise.all([
          fetchDeals(),
          fetchCategories(),
        ]);
        setDeals(dealsData);
        setOriginalDeals(dealsData);
        setSelectedCategory("all-deals");
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchDeals = async (category = "all", search = "") => {
    try {
      let url = "/wp-json/honey-hole/v1/deals";
      const params = new URLSearchParams();

      if (category !== "all") {
        params.append("category", category);
      }
      if (search) {
        params.append("search", search);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch deals");
      return await response.json();
    } catch (err) {
      console.error("Error fetching deals:", err);
      throw err;
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/wp-json/honey-hole/v1/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      return await response.json();
    } catch (err) {
      console.error("Error fetching categories:", err);
      throw err;
    }
  };

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    try {
      if (category === "all-deals") {
        setDeals(originalDeals);
      } else {
        const filteredDeals = originalDeals.filter((deal) => {
          return (
            deal.categories &&
            deal.categories.length > 0 &&
            deal.categories[0].slug === category
          );
        });
        setDeals(filteredDeals);
      }
    } catch (err) {
      console.error("Error filtering deals:", err);
      setError(err.message);
    }
  };

  const handleSearch = async (query) => {
    if (query !== "") {
      setDeals(
        deals.filter((deal) => {
          return deal.title.toLowerCase().includes(query.toLowerCase());
        })
      );
    } else setDeals(originalDeals);
  };

  const handleRefreshDeals = async () => {
    try {
      const dealsData = await fetchDeals(selectedCategory, searchQuery);
      setDeals(dealsData);
      setOriginalDeals(dealsData);
    } catch (err) {
      setError(err.message);
    }
  };

  // const handleDealUpdate = async () => {
  //   try {
  //     const dealsData = await fetchDeals(selectedCategory, searchQuery);
  //     setDeals(dealsData);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };
  if (loading)
    return <div className="honey-hole-loading">Loading deals...</div>;
  if (error) return <div className="honey-hole-error">Error: {error}</div>;

  return (
    <div className="honey-hole-admin">
      <div className="honey-hole-menu-container">
        <a href="https://outdoorempire.com/thehoneyhole/" target="_blank">
          <div className="honey-hole-logo">
            <img
              src="https://outdoorempire.com/wp-content/uploads/2025/06/the-honey-hole-font-logo.png"
              alt="Honey Hole"
            />
          </div>
        </a>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <SearchBar onSearch={handleSearch} />
        <AddDealButton />
        <a href="/wp-admin/admin.php?page=honey-hole-export" className="button button-secondary">
          Export Deals
        </a>
      </div>
      <DealList deals={deals} />
      <DeleteAllButton onRefreshDeals={handleRefreshDeals} />
    </div>
  );
};

export default AdminApp;
