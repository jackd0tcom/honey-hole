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

/***/ "./src/frontend/components/App.jsx":
/*!*****************************************!*\
  !*** ./src/frontend/components/App.jsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DealGrid_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DealGrid.jsx */ "./src/frontend/components/DealGrid.jsx");
/* harmony import */ var _FilterBar_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FilterBar.jsx */ "./src/frontend/components/FilterBar.jsx");
/* harmony import */ var _SearchBar_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SearchBar.jsx */ "./src/frontend/components/SearchBar.jsx");
/* harmony import */ var _EmailSignup_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EmailSignup.jsx */ "./src/frontend/components/EmailSignup.jsx");
/* harmony import */ var _LatestDeals_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LatestDeals.jsx */ "./src/frontend/components/LatestDeals.jsx");
/* harmony import */ var _Hero_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Hero.jsx */ "./src/frontend/components/Hero.jsx");
/* harmony import */ var _DealsVideo_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DealsVideo.jsx */ "./src/frontend/components/DealsVideo.jsx");
/* harmony import */ var _DealOMeterGraphic_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DealOMeterGraphic.jsx */ "./src/frontend/components/DealOMeterGraphic.jsx");
/* harmony import */ var _HeroEmailSignup_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./HeroEmailSignup.jsx */ "./src/frontend/components/HeroEmailSignup.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__);











const App = () => {
  const [deals, setDeals] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [filters, setFilters] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    category: "",
    sortBy: "date",
    searchQuery: ""
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    fetchDeals();
  }, []);
  const fetchDeals = async () => {
    try {
      setLoading(true);
      const response = await fetch(honeyHoleData.apiUrl, {
        headers: {
          "X-WP-Nonce": honeyHoleData.nonce
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch deals");
      }
      const data = await response.json();
      setDeals(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
    className: "honey-hole-wrapper",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
      className: "honey-hole-header",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_Hero_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], {}), error && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
        className: "honey-hole-error",
        children: error
      })]
    }), loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
      className: "honey-hole-loading",
      children: "Loading deals..."
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_DealGrid_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
      deals: deals
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./src/frontend/components/DealCard.jsx":
/*!**********************************************!*\
  !*** ./src/frontend/components/DealCard.jsx ***!
  \**********************************************/
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
  deal
}) => {
  const {
    title,
    image_url,
    original_price,
    sales_price,
    rating,
    product_url,
    promo_code,
    seller,
    categories,
    background_image,
    description,
    badge,
    date_added
  } = deal;
  const [hover, setHover] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [newDeal, setNewDeal] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const isNewDeal = () => {
      const now = new Date();
      const added = new Date(date_added);
      const diffInMs = now - added;
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours <= 36) {
        setNewDeal(true);
      }
    };
    isNewDeal();
  }, []);
  const discount_percentage = sales_price && original_price ? Math.round((original_price - sales_price) / original_price * 100) : 0;
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });
  const getDiscountClass = percentage => {
    if (percentage >= 60) return "red-discount";
    if (percentage >= 50) return "orange-discount";
    if (percentage >= 40) return "yellow-discount";
    if (percentage >= 30) return "blue-discount";
    return "green-discount";
  };
  const getDealMeter = percentage => {
    if (percentage >= 60) return "https://outdoorempire.com/wp-content/uploads/2025/07/Red-Deal-O-Meter.png";
    if (percentage >= 50) return "https://outdoorempire.com/wp-content/uploads/2025/07/Orange-Deal-O-Meter.png";
    if (percentage >= 40) return "https://outdoorempire.com/wp-content/uploads/2025/07/Yellow-Deal-O-Meter.png";
    if (percentage >= 30) return "https://outdoorempire.com/wp-content/uploads/2025/07/Blue-Deal-O-Meter.png";
    return "https://outdoorempire.com/wp-content/uploads/2025/07/Green-Deal-O-Meter.png";
  };
  const getPriceClass = percentage => {
    if (percentage >= 60) return "red-deal";
    if (percentage >= 50) return "orange-deal";
    if (percentage >= 40) return "yellow-deal";
    if (percentage >= 30) return "blue-deal";
    return "green-deal";
  };
  const star = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
    className: "star",
    children: "\u2605"
  });
  if (categories[0].name === "Big Sale") {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      onMouseEnter: () => {
        setHover(true);
      },
      onMouseLeave: () => {
        setHover(false);
      },
      className: "deal-card big-sale",
      style: {
        backgroundImage: `url(${background_image})`
      },
      children: [badge && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "deal-badge big-sale-badge",
        children: badge
      }), hover && promo_code && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "hh-promo-code-wrapper",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("p", {
          children: ["Use Code: ", promo_code]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("a", {
        href: product_url,
        className: "deal-card-link big-sale-card",
        target: "_blank",
        rel: "noopener noreferrer",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "big-sale-title-wrapper",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h4", {
            className: "big-sale-title",
            children: title
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "deal-image-wrapper big-sale-img",
          children: image_url ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
            className: "deal-image",
            style: {
              backgroundImage: `url(${image_url})`
            }
          }) :
          /*#__PURE__*/
          // <img src={image_url} alt={title} />
          (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
            className: "no-image",
            children: "No Image Available"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "big-sale-title-wrapper",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h4", {
            className: "big-sale-description",
            children: description
          })
        })]
      })]
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    onMouseEnter: () => {
      setHover(true);
    },
    onMouseLeave: () => {
      setHover(false);
    },
    className: "deal-card",
    children: [badge && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "deal-badge",
      children: badge
    }), newDeal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "deal-badge",
      children: "New!"
    }), hover && promo_code && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "hh-promo-code-wrapper",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("p", {
        children: ["Use Code: ", promo_code]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("a", {
      href: product_url,
      className: "deal-card-link",
      target: "_blank",
      rel: "noopener noreferrer",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "deal-o-meter-card",
        children: sales_price ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
          className: "deal-o-meter-card-img",
          src: getDealMeter(discount_percentage),
          alt: ""
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
          className: "deal-o-meter-card-img",
          src: "https://outdoorempire.com/wp-content/uploads/2025/07/Green-Deal-O-Meter.png",
          alt: "Great Price"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "deal-image-wrapper",
        children: image_url ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "deal-image",
          style: {
            backgroundImage: `url(${image_url})`
          }
        }) :
        /*#__PURE__*/
        // <img src={image_url} alt={title} />
        (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "no-image",
          children: "No Image Available"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "deal-content",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3", {
          className: "deal-title",
          children: title
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "deal-pricing",
          children: sales_price ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
              className: `sales-price ${getPriceClass(discount_percentage)}`,
              children: USDollar.format(sales_price)
            }), original_price && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
              className: "original-price",
              children: USDollar.format(original_price)
            }), discount_percentage > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("span", {
              className: `discount ${getDiscountClass(discount_percentage)}`,
              children: [discount_percentage, "% OFF"]
            })]
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
              className: "sales-price great-price",
              children: USDollar.format(original_price)
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
              className: "great-deal-label",
              children: "Great Price!"
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "deal-seller",
          children: seller
        })]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DealCard);

/***/ }),

/***/ "./src/frontend/components/DealGrid.jsx":
/*!**********************************************!*\
  !*** ./src/frontend/components/DealGrid.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DealCard_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DealCard.jsx */ "./src/frontend/components/DealCard.jsx");
/* harmony import */ var _FilterBar_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FilterBar.jsx */ "./src/frontend/components/FilterBar.jsx");
/* harmony import */ var _Sorter_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Sorter.jsx */ "./src/frontend/components/Sorter.jsx");
/* harmony import */ var _InfiniteGrid_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./InfiniteGrid.jsx */ "./src/frontend/components/InfiniteGrid.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);







const DealGrid = ({
  deals
}) => {
  const [categories, setCategories] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("all");
  const [dealsArray, setDealsArray] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(deals);
  const [activeCategory, setActiveCategory] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [sort, setSort] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("newest");
  const [isMobile, setIsMobile] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [filtering, setFiltering] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const currentCategory = ["All Gear Deals", "Camping Gear", "Fishing Gear", "Hiking Gear", "Hunting Gear", "Outdoor Gear"];
  const categoryIcon = ["https://outdoorempire.com/wp-content/uploads/2025/06/campfire-white.png", "https://outdoorempire.com/wp-content/uploads/2025/06/OutdoorEmpire_Icons2021_Tent-17-white.png", "https://outdoorempire.com/wp-content/uploads/2025/06/OutdoorEmpire_Icons2021_Fish-10-white.png", "https://outdoorempire.com/wp-content/uploads/2025/06/OutdoorEmpire_Icons2021_GearRating-38-white.png", "https://outdoorempire.com/wp-content/uploads/2025/06/OutdoorEmpire_Icons2021_Antler-03-white.png", "https://outdoorempire.com/wp-content/uploads/2025/06/OutdoorEmpire_Icons2021_Tree_Water-31-white.png"];
  const getSavings = a => {
    if (!a.original_price || a.original_price === 0) return 0;
    return (a.original_price - a.sales_price) / a.original_price * 100;
  };

  // Category sorting
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (categories === "all") {
      setDealsArray(deals);
    } else setDealsArray(deals.filter(deal => {
      return deal.categories[0].slug === categories;
    }));
  }, [categories]);

  // Mobile checking
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Parameter Filtering
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let sortedDeals = [...dealsArray];
    if (sort === "newest") {
      sortedDeals.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
    } else if (sort === "oldest") {
      sortedDeals.sort((a, b) => new Date(a.date_added) - new Date(b.date_added));
    } else if (sort === "low") {
      sortedDeals.sort((a, b) => a.sales_price - b.sales_price);
    } else if (sort === "high") {
      sortedDeals.sort((a, b) => b.sales_price - a.sales_price);
    } else if (sort === "savings") {
      sortedDeals.sort((a, b) => getSavings(b) - getSavings(a));
    } else if (sort === "rating") {
      sortedDeals.sort((a, b) => b.rating - a.rating);
    }
    setDealsArray(sortedDeals);
  }, [sort]);

  // Error handling
  if (!deals || deals.length === 0) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "honey-hole-empty",
      children: "No deals found"
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: [isMobile && filtering && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "mobile-filter-overlay",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "modal-wrapper",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_FilterBar_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
          categories: categories,
          setCategories: setCategories,
          activeCategory: activeCategory,
          setActiveCategory: setActiveCategory,
          isMobile: isMobile,
          setFiltering: setFiltering
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "hh-grid-heading-wrapper",
      children: [isMobile ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "deal-grid-heading",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
            className: "deal-grid-icon",
            src: categoryIcon[activeCategory]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h2", {
            className: "deal-grid-title",
            children: currentCategory[activeCategory]
          })]
        })]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h2", {
          className: "hh-heading",
          children: "Honey Hole Deals"
        }), " "]
      }), !isMobile && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Sorter_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
        sort: sort,
        setSort: setSort
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "hh-main-bg",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "hh-main-wrapper",
        children: [isMobile ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "mobile-filter-buttons",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
            id: "mobile-filter-button",
            onClick: () => setFiltering(true),
            children: "Filter"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Sorter_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {})]
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_FilterBar_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
            categories: categories,
            setCategories: setCategories,
            activeCategory: activeCategory,
            setActiveCategory: setActiveCategory,
            isMobile: isMobile
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "hh-deal-grid-wrapper",
          children: [!isMobile && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "deal-grid-heading",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
              className: "deal-grid-icon",
              src: categoryIcon[activeCategory]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h2", {
              className: "deal-grid-title",
              children: currentCategory[activeCategory]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_InfiniteGrid_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
            dealsArray: dealsArray,
            categories: categories
          })]
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DealGrid);

/***/ }),

/***/ "./src/frontend/components/DealOMeterGraphic.jsx":
/*!*******************************************************!*\
  !*** ./src/frontend/components/DealOMeterGraphic.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const DealOMeterGraphic = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "deal-o-meter-graphic-wrapper",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "dom-container",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "dom-top",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
          children: "Deal-O-Meter"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "dom-middle",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
          className: "dom-copy",
          children: ["Keep an eye on your local ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
            children: "Deal-O-Meter"
          }), " to see how good of a deal you're getting!"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
          className: "dom-graphic",
          src: "https://outdoorempire.com/wp-content/uploads/2025/09/Deal-o-meter-meter-graphic-2.png",
          alt: ""
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "dom-graphic-container"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "dom-bottom",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h5", {
          children: "Only YOU can save on these deals!"
        })
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DealOMeterGraphic);

/***/ }),

/***/ "./src/frontend/components/DealsVideo.jsx":
/*!************************************************!*\
  !*** ./src/frontend/components/DealsVideo.jsx ***!
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


const DealsVideo = () => {
  const [videoUrl, setVideoUrl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('https://www.youtube.com/embed/SMiEJ0qDJ8I?si=y-zCwgrDLO7z7NUO');
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const fetchVideoSettings = async () => {
      try {
        const response = await fetch('/wp-json/honey-hole/v1/video-settings');
        if (response.ok) {
          const data = await response.json();
          setVideoUrl(data.video_url);
        }
      } catch (error) {
        console.error('Error fetching video settings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideoSettings();
  }, []);
  if (loading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      children: "Loading video..."
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("iframe", {
      id: "deal-video",
      width: "100%",
      height: "auto",
      src: videoUrl,
      title: "YouTube video player",
      frameBorder: "0",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      referrerPolicy: "strict-origin-when-cross-origin",
      allowFullScreen: true
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DealsVideo);

/***/ }),

/***/ "./src/frontend/components/EmailSignup.jsx":
/*!*************************************************!*\
  !*** ./src/frontend/components/EmailSignup.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const EmailSignup = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      id: "hh-email-section",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        class: "hh-email-wrapper",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          class: "hh-email-container-one",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            class: "hh-email-image"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            class: "hh-email-content",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
              children: "Get the Best Deals and Win Free Gear!"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
              method: "post",
              class: "af-form-wrapper",
              "accept-charset": "UTF-8",
              action: "https://www.aweber.com/scripts/addlead.pl",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "hidden",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "hidden",
                  name: "meta_web_form_id",
                  value: "894900673"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "hidden",
                  name: "meta_split_id",
                  value: ""
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "hidden",
                  name: "listname",
                  value: "awlist6324539"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "hidden",
                  name: "redirect",
                  value: "https://www.aweber.com/thankyou-coi.htm?m=text",
                  id: "redirect_8e911f903751383335eaae138e94c2b8"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "hidden",
                  name: "meta_adtracking",
                  value: "Honey_Hole_unstyled_form"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "hidden",
                  name: "meta_message",
                  value: "1"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "hidden",
                  name: "meta_required",
                  value: "email"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "hidden",
                  name: "meta_tooltip",
                  value: ""
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                id: "af-form-894900673",
                class: "af-form",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  id: "hh-input-wrapper",
                  class: "af-body af-standards",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    class: "af-element",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                      class: "af-textWrap",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                        placeholder: "Email",
                        class: "text",
                        id: "awf_field-118013225",
                        type: "email",
                        name: "email",
                        value: "",
                        tabindex: "500",
                        onfocus: " if (this.value == '') { this.value = ''; }",
                        onblur: "if (this.value == '') { this.value='';}"
                      })
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                      class: "af-clear"
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    class: "af-element hh-email-submit-wrapper",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                      id: "hh-email-submit",
                      name: "submit",
                      class: "submit",
                      type: "submit",
                      value: "Subscribe",
                      tabindex: "501"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                      class: "af-clear"
                    })]
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "hidden",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                  src: "https://forms.aweber.com/form/displays.htm?id=HJwsnAwMbOzM",
                  alt: ""
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              class: "hh-email-disclaimer",
              children: "We email once per week, sometimes more. Unsubscribe at any time."
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
              class: "hh-email-disclaimer",
              children: ["We respect your", " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                id: "hh-email-disclaimer-link",
                href: "https://www.aweber.com/privacy.htm",
                target: "_blank",
                rel: "noopener noreferrer",
                children: "email privacy"
              })]
            })]
          })]
        })
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmailSignup);

/***/ }),

/***/ "./src/frontend/components/FilterBar.jsx":
/*!***********************************************!*\
  !*** ./src/frontend/components/FilterBar.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SideBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SideBar */ "./src/frontend/components/SideBar.jsx");
/* harmony import */ var _EmailSignup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EmailSignup */ "./src/frontend/components/EmailSignup.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




const FilterBar = ({
  categories,
  setCategories,
  activeCategory,
  setActiveCategory,
  isMobile,
  setFiltering
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "sidebar",
    children: [isMobile && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "mobile-sidebar-header",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
        children: "Filter"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
        className: "mobile-close",
        onClick: () => setFiltering(false),
        children: "\xD7"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "hh-filter-bar",
      children: [!isMobile && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h4", {
        id: "hh-filter",
        children: "Filter"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "hh-categories",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h4", {
          className: "hh-filter-subheading",
          children: "Categories"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("button", {
          className: "hh-filter-button",
          id: activeCategory === 0 ? "hh-active-category" : "",
          onClick: () => {
            setActiveCategory(0);
            setCategories("all");
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
            className: "hh-filter-icon",
            children: "+"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h2", {
            className: "hh-filter-heading",
            children: "All Gear Deals"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("button", {
          className: "hh-filter-button",
          id: activeCategory === 1 ? "hh-active-category" : "",
          onClick: () => {
            setActiveCategory(1);
            setCategories("camping-gear");
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
            className: "hh-filter-icon",
            children: "+"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h2", {
            className: "hh-filter-heading",
            children: "Camping Gear"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("button", {
          className: "hh-filter-button",
          id: activeCategory === 2 ? "hh-active-category" : "",
          onClick: () => {
            setActiveCategory(2);
            setCategories("fishing-gear");
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
            className: "hh-filter-icon",
            children: "+"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h2", {
            className: "hh-filter-heading",
            children: "Fishing Gear"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("button", {
          className: "hh-filter-button",
          id: activeCategory === 3 ? "hh-active-category" : "",
          onClick: () => {
            setActiveCategory(3);
            setCategories("hiking-gear");
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
            className: "hh-filter-icon",
            children: "+"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h2", {
            className: "hh-filter-heading",
            children: "Hiking Gear"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("button", {
          className: "hh-filter-button",
          id: activeCategory === 4 ? "hh-active-category" : "",
          onClick: () => {
            setActiveCategory(4);
            setCategories("hunting-gear");
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
            className: "hh-filter-icon",
            children: "+"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h2", {
            className: "hh-filter-heading",
            children: "Hunting Gear"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("button", {
          className: "hh-filter-button",
          id: activeCategory === 5 ? "hh-active-category" : "",
          onClick: () => {
            setActiveCategory(5);
            setCategories("outdoor-gear");
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
            className: "hh-filter-icon",
            children: "+"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h2", {
            className: "hh-filter-heading",
            children: "Outdoor Gear"
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_SideBar__WEBPACK_IMPORTED_MODULE_1__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_EmailSignup__WEBPACK_IMPORTED_MODULE_2__["default"], {})]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FilterBar);

/***/ }),

/***/ "./src/frontend/components/Hero.jsx":
/*!******************************************!*\
  !*** ./src/frontend/components/Hero.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const Hero = () => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      class: "honey-hole-hero",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        class: "honey-hole-hero-content",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          class: "honey-hole-hero-image",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
            src: "https://outdoorempire.com/wp-content/uploads/2025/02/the-honey-hole-transparent.png",
            alt: ""
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          class: "honey-hole-hero-copy",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
            children: "We Find the Best Outdoor Gear Deals to Save You Time and Money!"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "honey-hole-hero-copy-text",
            children: "We manually crawl catalogs, ads, and websites of top outdoor gear brands and retailers in search of discounted outdoor gear to create this curated list that will save you hours of shopping around."
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "honey-hole-hero-copy-text",
            children: "Deal prices are valid at time of posting, but could change at any moment."
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
            id: "honey-hole-updated",
            children: ["Last Updated: ", formattedDate]
          })]
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hero);

/***/ }),

/***/ "./src/frontend/components/HeroEmailSignup.jsx":
/*!*****************************************************!*\
  !*** ./src/frontend/components/HeroEmailSignup.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const HeroEmailSignup = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      class: "hh-hero-email-section",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        class: "hh-email-wrapper",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          class: "hh-email-container-one",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            class: "hh-hero-email-image"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            class: "hh-email-content",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
              children: "Get the Best Deals and Win Free Gear!"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
              method: "post",
              class: "af-form-wrapper",
              "accept-charset": "UTF-8",
              action: "https://www.aweber.com/scripts/addlead.pl",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "hidden",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "hidden",
                  name: "meta_web_form_id",
                  value: "894900673"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "hidden",
                  name: "meta_split_id",
                  value: ""
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "hidden",
                  name: "listname",
                  value: "awlist6324539"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "hidden",
                  name: "redirect",
                  value: "https://www.aweber.com/thankyou-coi.htm?m=text",
                  id: "redirect_8e911f903751383335eaae138e94c2b8"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "hidden",
                  name: "meta_adtracking",
                  value: "Honey_Hole_unstyled_form"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "hidden",
                  name: "meta_message",
                  value: "1"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "hidden",
                  name: "meta_required",
                  value: "email"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "hidden",
                  name: "meta_tooltip",
                  value: ""
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                id: "af-form-894900673",
                class: "af-form",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  id: "hh-hero-input-wrapper",
                  class: "af-body af-standards",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    class: "af-element hero-email-input",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                      class: "af-textWrap",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                        placeholder: "Email",
                        class: "text",
                        id: "awf_field-118013225",
                        type: "email",
                        name: "email",
                        value: "",
                        tabindex: "500",
                        onfocus: " if (this.value == '') { this.value = ''; }",
                        onblur: "if (this.value == '') { this.value='';}"
                      })
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                      class: "af-clear"
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    class: "af-element hh-hero-email-submit-wrapper",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                      id: "hh-email-submit",
                      name: "submit",
                      class: "submit",
                      type: "submit",
                      value: "Subscribe",
                      tabindex: "501"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                      class: "af-clear"
                    })]
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "hidden",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                  src: "https://forms.aweber.com/form/displays.htm?id=HJwsnAwMbOzM",
                  alt: ""
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              class: "hh-email-disclaimer",
              children: "We email once per week, sometimes more. Unsubscribe at any time."
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
              class: "hh-email-disclaimer",
              children: ["We respect your", " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                id: "hh-email-disclaimer-link",
                href: "https://www.aweber.com/privacy.htm",
                target: "_blank",
                rel: "noopener noreferrer",
                children: "email privacy"
              })]
            })]
          })]
        })
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeroEmailSignup);

/***/ }),

/***/ "./src/frontend/components/InfiniteGrid.jsx":
/*!**************************************************!*\
  !*** ./src/frontend/components/InfiniteGrid.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DealCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DealCard */ "./src/frontend/components/DealCard.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const InfiniteGrid = ({
  dealsArray,
  categories
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "deals-grid",
    children: dealsArray.map(deal => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_DealCard__WEBPACK_IMPORTED_MODULE_0__["default"], {
      promo: deal.promo_code,
      deal: deal,
      categories: categories,
      seller: deal.seller
    }, deal.id))
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InfiniteGrid);

/***/ }),

/***/ "./src/frontend/components/LatestDeals.jsx":
/*!*************************************************!*\
  !*** ./src/frontend/components/LatestDeals.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DealCard_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DealCard.jsx */ "./src/frontend/components/DealCard.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);




const LatestDeals = ({
  deals
}) => {
  const [sortedDeals, setSortedDeals] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setSortedDeals(deals.filter(deal => {
      return deal.categories[0].name !== "Big Sale";
    }).slice(0, 4));
  }, [deals]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      class: "category-section",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("p", {
        id: "hh-affiliate-disclaimer",
        children: ["DISCLAIMER: Outdoor Empire does not sell the products on this page. Some or all links are affiliate links which means we may earn a small commission if you make a purchase, at no cost to you. As an Amazon Associate I earn from qualifying purchases. Discounts and availability are not guaranteed. Verify all information at respective retailers before making a purchase.", " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
          href: "https://outdoorempire.com/affiliate-disclaimer/",
          target: "_blank",
          rel: "noopener noreferrer",
          children: "Learn More"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h2", {
        children: "Just Added"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "deals-grid",
        children: sortedDeals.map(deal => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_DealCard_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
          deal: deal
        }, deal.id))
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LatestDeals);

/***/ }),

/***/ "./src/frontend/components/SearchBar.jsx":
/*!***********************************************!*\
  !*** ./src/frontend/components/SearchBar.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const SearchBar = ({
  value,
  onChange
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "honey-hole-search",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
      type: "text",
      placeholder: "Search deals...",
      value: value,
      onChange: e => onChange(e.target.value),
      className: "honey-hole-search-input"
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchBar);

/***/ }),

/***/ "./src/frontend/components/SideBar.jsx":
/*!*********************************************!*\
  !*** ./src/frontend/components/SideBar.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DealsVideo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DealsVideo */ "./src/frontend/components/DealsVideo.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const SideBar = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "sidebar-wrapper",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_DealsVideo__WEBPACK_IMPORTED_MODULE_0__["default"], {})
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SideBar);

/***/ }),

/***/ "./src/frontend/components/Sorter.jsx":
/*!********************************************!*\
  !*** ./src/frontend/components/Sorter.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const Sorter = ({
  sort,
  setSort
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "sorter-wrapper",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
        name: "sort",
        id: "sort",
        onChange: e => {
          setSort(e.target.value);
          console.log(e.target.value);
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
          value: "newest",
          children: "Newest First"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
          value: "oldest",
          children: "Oldest First"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
          value: "low",
          children: "Price Low to High"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
          value: "high",
          children: "Price High to Low"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
          value: "savings",
          children: "Savings % Off"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
          value: "rating",
          children: "Deal Rating"
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sorter);

/***/ }),

/***/ "./src/frontend/components/styles.css":
/*!********************************************!*\
  !*** ./src/frontend/components/styles.css ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

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
/*!*******************************!*\
  !*** ./src/frontend/index.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/App */ "./src/frontend/components/App.jsx");
/* harmony import */ var _components_styles_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/styles.css */ "./src/frontend/components/styles.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





// Wait for the DOM to be ready

document.addEventListener('DOMContentLoaded', () => {
  // Find the container
  const container = document.getElementById('honey-hole-app');
  if (container) {
    // Create a root
    const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(container);

    // Render the app
    root.render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().StrictMode), {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_App__WEBPACK_IMPORTED_MODULE_2__["default"], {})
    }));
  }
});
})();

/******/ })()
;
//# sourceMappingURL=honey-hole-frontend.js.map