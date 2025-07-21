/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/react-dom/client.js":
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var m = __webpack_require__(/*! react-dom */ "react-dom");
if (false) // removed by dead control flow
{} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ }),

/***/ "./src/admin/components/AddDealButton.jsx":
/*!************************************************!*\
  !*** ./src/admin/components/AddDealButton.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const AddDealButton = () => {
  const handleClick = () => {
    window.location.href = '/wp-admin/admin.php?page=honey-hole-add-deal';
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "honey-hole-actions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "hh-add-deal-button button button-primary",
    onClick: handleClick
  }, "Add Deal"));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddDealButton);

/***/ }),

/***/ "./src/admin/components/AdminApp.jsx":
/*!*******************************************!*\
  !*** ./src/admin/components/AdminApp.jsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SearchBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SearchBar */ "./src/admin/components/SearchBar.jsx");
/* harmony import */ var _DealList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DealList */ "./src/admin/components/DealList.jsx");
/* harmony import */ var _AddDealButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AddDealButton */ "./src/admin/components/AddDealButton.jsx");
/* harmony import */ var _CategoryFilter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CategoryFilter */ "./src/admin/components/CategoryFilter.jsx");
/* harmony import */ var _DeleteAllButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DeleteAllButton */ "./src/admin/components/DeleteAllButton.jsx");







const AdminApp = () => {
  const [deals, setDeals] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [originalDeals, setOriginalDeals] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [categories, setCategories] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [selectedCategory, setSelectedCategory] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("all-deals");
  const [searchQuery, setSearchQuery] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [dealsData, categoriesData] = await Promise.all([fetchDeals(), fetchCategories()]);
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
  const handleCategoryChange = async category => {
    setSelectedCategory(category);
    try {
      if (category === "all-deals") {
        setDeals(originalDeals);
      } else {
        const filteredDeals = originalDeals.filter(deal => {
          return deal.categories && deal.categories.length > 0 && deal.categories[0].slug === category;
        });
        setDeals(filteredDeals);
      }
    } catch (err) {
      console.error("Error filtering deals:", err);
      setError(err.message);
    }
  };
  const handleSearch = async query => {
    if (query !== "") {
      setDeals(deals.filter(deal => {
        return deal.title.toLowerCase().includes(query.toLowerCase());
      }));
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
  if (loading) return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "honey-hole-loading"
  }, "Loading deals...");
  if (error) return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "honey-hole-error"
  }, "Error: ", error);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "honey-hole-admin"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "honey-hole-menu-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://outdoorempire.com/thehoneyhole/",
    target: "_blank"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "honey-hole-logo"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: "https://outdoorempire.com/wp-content/uploads/2025/06/the-honey-hole-font-logo.png",
    alt: "Honey Hole"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CategoryFilter__WEBPACK_IMPORTED_MODULE_4__["default"], {
    categories: categories,
    selectedCategory: selectedCategory,
    onCategoryChange: handleCategoryChange
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SearchBar__WEBPACK_IMPORTED_MODULE_1__["default"], {
    onSearch: handleSearch
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_AddDealButton__WEBPACK_IMPORTED_MODULE_3__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DealList__WEBPACK_IMPORTED_MODULE_2__["default"], {
    deals: deals
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DeleteAllButton__WEBPACK_IMPORTED_MODULE_5__["default"], {
    onRefreshDeals: handleRefreshDeals
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdminApp);

/***/ }),

/***/ "./src/admin/components/CategoryFilter.jsx":
/*!*************************************************!*\
  !*** ./src/admin/components/CategoryFilter.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hh-admin-filter-bar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hh-categories"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: `button ${selectedCategory === 'all-deals' ? 'active' : ''}`,
    onClick: () => onCategoryChange('all-deals')
  }, "All Deals"), categories.map(category => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: category.id,
    className: `button ${selectedCategory === category.slug ? 'active' : ''}`,
    onClick: () => onCategoryChange(category.slug)
  }, category.name))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CategoryFilter);

/***/ }),

/***/ "./src/admin/components/ConfirmButton.jsx":
/*!************************************************!*\
  !*** ./src/admin/components/ConfirmButton.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const ConfirmButton = ({
  isConfirming,
  setIsConfirming,
  bulkDeals,
  setBulkDeals,
  setIsDeleting,
  isDeleting,
  onCancel
}) => {
  const handleBulkDelete = async () => {
    try {
      setIsDeleting(true);
      console.log("Deleting", bulkDeals);
      const headers = {
        "X-WP-Nonce": honeyHoleAdmin.nonce,
        "Content-Type": "application/json"
      };
      const response = await fetch(`/wp-json/honey-hole/v1/delete-posts?post_ids=${bulkDeals}`, {
        method: "POST",
        headers: headers,
        credentials: "include"
      });
      if (!response.ok) {
        const errorData = await response.text();
        console.error("Delete failed:", response.status, errorData);
        throw new Error("Failed to delete deal");
      }
      setBulkDeals([]);
      setIsConfirming(false);
      setIsDeleting(false);
    } catch (error) {
      console.log("Error deleting Deal", error);
    }
  };
  const handleCancel = () => {
    setBulkDeals([]);
    setIsConfirming(false);
    if (onCancel) {
      onCancel();
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, isDeleting && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hh-deleting-overlay"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hh-deleting-spinner"
  }, "Deleting...")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hh-confirm-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Are you sure you want to delete?"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleBulkDelete
  }, "Delete Selected"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleCancel
  }, "Cancel")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConfirmButton);

/***/ }),

/***/ "./src/admin/components/DealCard.jsx":
/*!*******************************************!*\
  !*** ./src/admin/components/DealCard.jsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const DealCard = ({
  deal,
  onUpdate,
  handleBulkToggle,
  setIsDeleting,
  bulkDeals
}) => {
  const [isUpdating, setIsUpdating] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });
  const formattedPrice = USDollar.format(deal.sales_price);
  const handleVisibilityToggle = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/wp-json/honey-hole/v1/deals/${deal.id}/visibility`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": honeyHoleAdmin.visibility_nonce
        },
        body: JSON.stringify({
          is_visible: !deal.is_visible
        })
      });
      if (!response.ok) throw new Error("Failed to update visibility");
      onUpdate();
    } catch (error) {
      console.error("Error updating visibility:", error);
    } finally {
      setIsUpdating(false);
    }
  };
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this deal?")) return;
    setIsUpdating(true);
    setIsDeleting(true);
    try {
      console.log("Deleting deal:", deal.id);
      const headers = {
        "X-WP-Nonce": honeyHoleAdmin.nonce,
        "Content-Type": "application/json"
      };
      const response = await fetch(`/wp-json/honey-hole/v1/delete-post/${deal.id}`, {
        method: "POST",
        headers: headers,
        credentials: "include"
      });
      if (!response.ok) {
        const errorData = await response.text();
        console.error("Delete failed:", response.status, errorData);
        throw new Error("Failed to delete deal");
      }
      if (typeof onUpdate === "function") {
        onUpdate();
      }
    } catch (error) {
      console.error("Error deleting deal:", error);
    } finally {
      setIsUpdating(false);
      setIsDeleting(false);
    }
  };
  const discount = deal.original_price > 0 ? Math.round((deal.original_price - deal.sales_price) / deal.original_price * 100) : 0;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "honey-hole-deal-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-card-header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hh-bulk-toggle"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "checkbox",
    checked: bulkDeals.includes(deal.id),
    onChange: () => handleBulkToggle(deal.id)
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-actions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: `/wp-admin/admin.php?page=honey-hole-edit-deal&id=${deal.id}`,
    className: "button"
  }, "Edit"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "button",
    onClick: handleDelete,
    disabled: isUpdating
  }, "Delete"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-image"
  }, deal.image_url ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: deal.image_url,
    alt: deal.title,
    className: "deal-thumbnail-image"
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "no-image"
  }, "No Image")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "deal-title"
  }, deal.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-pricing"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "sales-price"
  }, formattedPrice), deal.original_price && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "original-price"
  }, USDollar.format(deal.original_price)), deal.discount_percentage && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "discount"
  }, deal.discount_percentage, "% OFF")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-rating"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rating-stars"
  }, [...Array(5)].map((_, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    key: i,
    className: `star ${i < deal.rating ? "filled" : ""}`
  }, "\u2605"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rating-count"
  }, deal.rating)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-seller"
  }, deal.seller), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-tags"
  }, deal.tags && deal.tags.join(", ")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-date"
  }, "Added: ", new Date(deal.date_added).toLocaleDateString()), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: deal.product_url,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "button affiliate-link"
  }, "View Deal")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DealCard);

/***/ }),

/***/ "./src/admin/components/DealList.jsx":
/*!*******************************************!*\
  !*** ./src/admin/components/DealList.jsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DealCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DealCard */ "./src/admin/components/DealCard.jsx");
/* harmony import */ var _ConfirmButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConfirmButton */ "./src/admin/components/ConfirmButton.jsx");




const DealList = ({
  deals: initialDeals
}) => {
  const [deals, setDeals] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialDeals);
  const [isConfirming, setIsConfirming] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [bulkDeals, setBulkDeals] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [isDeleting, setIsDeleting] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [sort, setSort] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("newest");

  // Update local state when initialDeals changes
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setDeals(initialDeals);
  }, [initialDeals]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    console.log("isDeleting changed:", isDeleting);
    if (!isDeleting) {
      console.log("Refreshing deals after deletion");
      refreshDeals();
    }
  }, [isDeleting]);
  const refreshDeals = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    console.log("Fetching updated deals");
    try {
      const response = await fetch("/wp-json/honey-hole/v1/deals");
      if (!response.ok) throw new Error("Failed to fetch deals");
      const updatedDeals = await response.json();
      setDeals(updatedDeals);
    } catch (error) {
      console.error("Error refreshing deals:", error);
    }
  }, []);
  const handleBulkToggle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(deal => {
    if (bulkDeals.includes(deal.id)) {
      const newBulkDeals = bulkDeals.filter(id => id !== deal.id);
      setBulkDeals(newBulkDeals);
      setIsConfirming(newBulkDeals.length > 0);
    } else {
      setBulkDeals([...bulkDeals, deal.id]);
      setIsConfirming(true);
    }
  }, [bulkDeals, setBulkDeals, setIsConfirming]);

  // Group deals by category
  const groupedDeals = deals.reduce((acc, deal) => {
    const category = deal.categories[0]?.name || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(deal);
    return acc;
  }, {});
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, isConfirming ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ConfirmButton__WEBPACK_IMPORTED_MODULE_2__["default"], {
    isConfirming: isConfirming,
    setIsConfirming: setIsConfirming,
    bulkDeals: bulkDeals,
    setBulkDeals: setBulkDeals,
    isDeleting: isDeleting,
    setIsDeleting: setIsDeleting,
    onCancel: () => {
      setBulkDeals([]);
      setIsConfirming(false);
    }
  }) : "", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "honey-hole-deals-container"
  }, Object.entries(groupedDeals).map(([category, categoryDeals]) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: category,
    className: "honey-hole-category-section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "honey-hole-category-title"
  }, category), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "honey-hole-deals-grid"
  }, categoryDeals.map(deal => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DealCard__WEBPACK_IMPORTED_MODULE_1__["default"], {
    key: deal.id,
    deal: deal,
    onUpdate: refreshDeals,
    bulkDeals: bulkDeals,
    setBulkDeals: setBulkDeals,
    isConfirming: isConfirming,
    setIsConfirming: setIsConfirming,
    handleBulkToggle: () => handleBulkToggle(deal),
    isDeleting: isDeleting,
    setIsDeleting: setIsDeleting
  })))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DealList);

/***/ }),

/***/ "./src/admin/components/DeleteAllButton.jsx":
/*!**************************************************!*\
  !*** ./src/admin/components/DeleteAllButton.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const DeleteAllButton = ({
  onRefreshDeals
}) => {
  const [isConfirming, setIsConfirming] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isDeleting, setIsDeleting] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const handleDeleteAll = async () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    if (!window.confirm("Are you absolutely sure you want to delete ALL deals? This action cannot be undone.")) {
      setIsConfirming(false);
      return;
    }
    setIsDeleting(true);
    try {
      const response = await fetch("/wp-json/honey-hole/v1/delete-posts", {
        method: "POST",
        headers: {
          "X-WP-Nonce": window.honeyHoleAdmin.nonce,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          post_ids: "all" // Special flag to delete all
        })
      });
      if (!response.ok) {
        throw new Error("Failed to delete all deals");
      }

      // Call the callback to refresh the deals list
      if (onRefreshDeals) {
        onRefreshDeals();
      }

      // Show success message
      alert("All deals have been deleted successfully!");
    } catch (error) {
      console.error("Error deleting all deals:", error);
      alert("Failed to delete all deals. Please try again.");
    } finally {
      setIsDeleting(false);
      setIsConfirming(false);
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "honey-hole-delete-all-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "honey-hole-delete-all-warning"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "\u26A0\uFE0F Danger Zone"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "This action will permanently delete ALL deals from your database. This cannot be undone.")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: `button ${isConfirming ? 'button-primary' : 'button-secondary'} ${isDeleting ? 'disabled' : ''}`,
    onClick: handleDeleteAll,
    disabled: isDeleting
  }, isDeleting ? "Deleting..." : isConfirming ? "Click again to confirm" : "Delete All Deals"), isConfirming && !isDeleting && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "button",
    onClick: () => setIsConfirming(false),
    style: {
      marginLeft: "10px"
    }
  }, "Cancel"));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DeleteAllButton);

/***/ }),

/***/ "./src/admin/components/SearchBar.jsx":
/*!********************************************!*\
  !*** ./src/admin/components/SearchBar.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);



const SearchBar = ({
  onSearch
}) => {
  const [searchValue, setSearchValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');

  // Debounce the search to avoid too many re-renders
  const debouncedSearch = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((0,lodash__WEBPACK_IMPORTED_MODULE_1__.debounce)(value => {
    onSearch(value);
  }, 300), [onSearch]);
  const handleChange = e => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "honey-hole-search"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    className: "honey-hole-search-input",
    placeholder: "Search deals...",
    value: searchValue,
    onChange: handleChange
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchBar);

/***/ }),

/***/ "./src/admin/styles/admin.css":
/*!************************************!*\
  !*** ./src/admin/styles/admin.css ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["lodash"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

module.exports = window["ReactDOM"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _components_AdminApp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/AdminApp */ "./src/admin/components/AdminApp.jsx");
/* harmony import */ var _styles_admin_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles/admin.css */ "./src/admin/styles/admin.css");






// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('honey-hole-admin-root');
  if (container) {
    const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(container);
    root.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)((react__WEBPACK_IMPORTED_MODULE_0___default().StrictMode), null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_AdminApp__WEBPACK_IMPORTED_MODULE_2__["default"], null)));
  }
});
})();

/******/ })()
;
//# sourceMappingURL=honey-hole-admin.js.map