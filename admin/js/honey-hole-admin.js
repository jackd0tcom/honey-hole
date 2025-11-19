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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const AddDealButton = () => {
  const handleClick = () => {
    window.location.href = '/wp-admin/admin.php?page=honey-hole-add-deal';
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "honey-hole-actions",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
      className: "hh-add-deal-button button button-primary",
      onClick: handleClick,
      children: "Add Deal"
    })
  });
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







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
  if (loading) return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
    className: "honey-hole-loading",
    children: "Loading deals..."
  });
  if (error) return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    className: "honey-hole-error",
    children: ["Error: ", error]
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    className: "honey-hole-admin",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "honey-hole-menu-container",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
        href: "https://outdoorempire.com/thehoneyhole/",
        target: "_blank",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "honey-hole-logo",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
            src: "https://outdoorempire.com/wp-content/uploads/2025/06/the-honey-hole-font-logo.png",
            alt: "Honey Hole"
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_CategoryFilter__WEBPACK_IMPORTED_MODULE_4__["default"], {
        categories: categories,
        selectedCategory: selectedCategory,
        onCategoryChange: handleCategoryChange
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_SearchBar__WEBPACK_IMPORTED_MODULE_1__["default"], {
        onSearch: handleSearch
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_AddDealButton__WEBPACK_IMPORTED_MODULE_3__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
        href: "/wp-admin/admin.php?page=honey-hole-export",
        className: "button button-secondary",
        children: "Export Deals"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_DealList__WEBPACK_IMPORTED_MODULE_2__["default"], {
      deals: deals
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_DeleteAllButton__WEBPACK_IMPORTED_MODULE_5__["default"], {
      onRefreshDeals: handleRefreshDeals
    })]
  });
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "hh-admin-filter-bar",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "hh-categories",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
        className: `button ${selectedCategory === 'all-deals' ? 'active' : ''}`,
        onClick: () => onCategoryChange('all-deals'),
        children: "All Deals"
      }), categories.map(category => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
        className: `button ${selectedCategory === category.slug ? 'active' : ''}`,
        onClick: () => onCategoryChange(category.slug),
        children: category.name
      }, category.id))]
    })
  });
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [isDeleting && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "hh-deleting-overlay",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "hh-deleting-spinner",
        children: "Deleting..."
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "hh-confirm-wrapper",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
        children: "Are you sure you want to delete?"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
        onClick: handleBulkDelete,
        children: "Delete Selected"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
        onClick: handleCancel,
        children: "Cancel"
      })]
    })]
  });
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


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
  const getDealMeter = percentage => {
    if (percentage >= 60) return "https://outdoorempire.com/wp-content/uploads/2025/07/Red-Deal-O-Meter.png";
    if (percentage >= 50) return "https://outdoorempire.com/wp-content/uploads/2025/07/Orange-Deal-O-Meter.png";
    if (percentage >= 40) return "https://outdoorempire.com/wp-content/uploads/2025/07/Yellow-Deal-O-Meter.png";
    if (percentage >= 30) return "https://outdoorempire.com/wp-content/uploads/2025/07/Blue-Deal-O-Meter.png";
    return "https://outdoorempire.com/wp-content/uploads/2025/07/Green-Deal-O-Meter.png";
  };
  const discount = deal.original_price > 0 ? Math.round((deal.original_price - deal.sales_price) / deal.original_price * 100) : 0;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "honey-hole-deal-card",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "deal-card-header",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "hh-bulk-toggle",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
          type: "checkbox",
          checked: bulkDeals.includes(deal.id),
          onChange: () => handleBulkToggle(deal.id)
        })
      }), deal.categories[0].name !== "Big Sale" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "deal-rating",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "deal-o-meter-card",
          children: !deal.rating ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
            className: "deal-o-meter-card-img",
            src: getDealMeter(deal.discount_percentage),
            alt: ""
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
            className: "deal-o-meter-card-img",
            src: getDealMeter(deal.rating * 14),
            alt: "Great Price"
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "deal-actions",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("a", {
          href: `/wp-admin/admin.php?page=honey-hole-edit-deal&id=${deal.id}`,
          className: "button",
          children: "Edit"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
          className: "button",
          onClick: handleDelete,
          disabled: isUpdating,
          children: "Delete"
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "deal-image",
      children: [deal.image_url ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
        src: deal.image_url,
        alt: deal.title,
        className: "deal-thumbnail-image"
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "no-image",
        children: "No Image"
      }), deal.badge && !deal.promo_code && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
        className: "hh-admin-deal-badge",
        children: deal.badge
      }), deal.promo_code && !deal.badge && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
        className: "hh-admin-deal-badge",
        children: deal.promo_code
      }), deal.promo_code && deal.badge && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "hh-admin-deal-promo-code",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          children: deal.promo_code
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          children: deal.badge
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "deal-content",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3", {
        className: "deal-title",
        children: deal.title
      }), deal.categories[0].name !== "Big Sale" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: "deal-pricing",
          children: [deal.sales_price && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
              className: "sales-price",
              children: formattedPrice
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
              className: "original-price",
              children: USDollar.format(deal.original_price)
            })]
          }), !deal.sales_price && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
            className: "original-price-only",
            children: USDollar.format(deal.original_price)
          }), deal.discount_percentage && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("span", {
            className: "discount",
            children: [deal.discount_percentage, "% OFF"]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "deal-seller",
          children: deal.seller ? deal.seller : "No Seller Saved"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "deal-tags",
        children: deal.tags && deal.tags.join(", ")
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "deal-date",
        children: ["Added: ", new Date(deal.date_added).toLocaleDateString()]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("a", {
        href: deal.product_url,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "button affiliate-link",
        children: "View Deal"
      })]
    })]
  });
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: [isConfirming ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_ConfirmButton__WEBPACK_IMPORTED_MODULE_2__["default"], {
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
    }) : "", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "honey-hole-deals-container",
      children: Object.entries(groupedDeals).map(([category, categoryDeals]) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "honey-hole-category-section",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h2", {
          className: "honey-hole-category-title",
          children: category
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "honey-hole-deals-grid",
          children: categoryDeals.map(deal => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_DealCard__WEBPACK_IMPORTED_MODULE_1__["default"], {
            deal: deal,
            onUpdate: refreshDeals,
            bulkDeals: bulkDeals,
            setBulkDeals: setBulkDeals,
            isConfirming: isConfirming,
            setIsConfirming: setIsConfirming,
            handleBulkToggle: () => handleBulkToggle(deal),
            isDeleting: isDeleting,
            setIsDeleting: setIsDeleting
          }, deal.id))
        })]
      }, category))
    })]
  });
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "honey-hole-delete-all-container",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "honey-hole-delete-all-warning",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3", {
        children: "\u26A0\uFE0F Danger Zone"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
        children: "This action will permanently delete ALL deals from your database. This cannot be undone."
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
      className: `button ${isConfirming ? 'button-primary' : 'button-secondary'} ${isDeleting ? 'disabled' : ''}`,
      onClick: handleDeleteAll,
      disabled: isDeleting,
      children: isDeleting ? "Deleting..." : isConfirming ? "Click again to confirm" : "Delete All Deals"
    }), isConfirming && !isDeleting && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
      className: "button",
      onClick: () => setIsConfirming(false),
      style: {
        marginLeft: "10px"
      },
      children: "Cancel"
    })]
  });
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    className: "honey-hole-search",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
      type: "text",
      className: "honey-hole-search-input",
      placeholder: "Search deals...",
      value: searchValue,
      onChange: handleChange
    })
  });
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

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





// Wait for DOM to be ready

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('honey-hole-admin-root');
  if (container) {
    const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(container);
    root.render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().StrictMode), {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_AdminApp__WEBPACK_IMPORTED_MODULE_2__["default"], {})
    }));
  }
});
})();

/******/ })()
;
//# sourceMappingURL=honey-hole-admin.js.map