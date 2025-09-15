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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DealGrid_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DealGrid.jsx */ "./src/frontend/components/DealGrid.jsx");
/* harmony import */ var _FilterBar_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FilterBar.jsx */ "./src/frontend/components/FilterBar.jsx");
/* harmony import */ var _SearchBar_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SearchBar.jsx */ "./src/frontend/components/SearchBar.jsx");
/* harmony import */ var _EmailSignup_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EmailSignup.jsx */ "./src/frontend/components/EmailSignup.jsx");
/* harmony import */ var _LatestDeals_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./LatestDeals.jsx */ "./src/frontend/components/LatestDeals.jsx");
/* harmony import */ var _Hero_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Hero.jsx */ "./src/frontend/components/Hero.jsx");
/* harmony import */ var _DealsVideo_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DealsVideo.jsx */ "./src/frontend/components/DealsVideo.jsx");
/* harmony import */ var _DealOMeterGraphic_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./DealOMeterGraphic.jsx */ "./src/frontend/components/DealOMeterGraphic.jsx");
/* harmony import */ var _HeroEmailSignup_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./HeroEmailSignup.jsx */ "./src/frontend/components/HeroEmailSignup.jsx");











const App = () => {
  const [deals, setDeals] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [filters, setFilters] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({
    category: "",
    sortBy: "date",
    searchQuery: ""
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
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
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "honey-hole-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "honey-hole-header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Hero_jsx__WEBPACK_IMPORTED_MODULE_7__["default"], null), error && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "honey-hole-error"
  }, error)), loading ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "honey-hole-loading"
  }, "Loading deals...") : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DealGrid_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
    deals: deals
  }));
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
  const star = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "star"
  }, "\u2605");
  if (categories[0].name === "Big Sale") {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      onMouseEnter: () => {
        setHover(true);
      },
      onMouseLeave: () => {
        setHover(false);
      },
      className: "deal-card big-sale",
      style: {
        backgroundImage: `url(${background_image})`
      }
    }, badge && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "deal-badge big-sale-badge"
    }, badge), hover && promo_code && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "hh-promo-code-wrapper"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Use Code: ", promo_code)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: product_url,
      className: "deal-card-link big-sale-card",
      target: "_blank",
      rel: "noopener noreferrer"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "big-sale-title-wrapper"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
      className: "big-sale-title"
    }, title)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "deal-image-wrapper big-sale-img"
    }, image_url ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "deal-image",
      style: {
        backgroundImage: `url(${image_url})`
      }
    }) :
    // <img src={image_url} alt={title} />
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "no-image"
    }, "No Image Available")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "big-sale-title-wrapper"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
      className: "big-sale-description"
    }, description))));
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    onMouseEnter: () => {
      setHover(true);
    },
    onMouseLeave: () => {
      setHover(false);
    },
    className: "deal-card"
  }, badge && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-badge"
  }, badge), newDeal && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-badge"
  }, "New!"), hover && promo_code && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hh-promo-code-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Use Code: ", promo_code)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: product_url,
    className: "deal-card-link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-o-meter-card"
  }, sales_price ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "deal-o-meter-card-img",
    src: getDealMeter(discount_percentage),
    alt: ""
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "deal-o-meter-card-img",
    src: "https://outdoorempire.com/wp-content/uploads/2025/07/Green-Deal-O-Meter.png",
    alt: "Great Price"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-image-wrapper"
  }, image_url ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-image",
    style: {
      backgroundImage: `url(${image_url})`
    }
  }) :
  // <img src={image_url} alt={title} />
  (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "no-image"
  }, "No Image Available")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "deal-title"
  }, title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-pricing"
  }, sales_price ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `sales-price ${getPriceClass(discount_percentage)}`
  }, USDollar.format(sales_price)), original_price && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "original-price"
  }, USDollar.format(original_price)), discount_percentage > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `discount ${getDiscountClass(discount_percentage)}`
  }, discount_percentage, "% OFF")) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "sales-price great-price"
  }, USDollar.format(original_price)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "great-deal-label"
  }, "Great Price!"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-seller"
  }, seller))));
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






const DealGrid = ({
  deals
}) => {
  const [categories, setCategories] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("all");
  const [dealsArray, setDealsArray] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(deals);
  const [originalArray, setOriginalArray] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(deals);
  const [activeCategory, setActiveCategory] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [sort, setSort] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("newest");
  const [isMobile, setIsMobile] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [filtering, setFiltering] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (categories === "all") {
      setDealsArray(deals);
    } else setDealsArray(deals.filter(deal => {
      return deal.categories[0].slug === categories;
    }));
  }, [categories]);
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
  const getSavings = a => {
    if (!a.original_price || a.original_price === 0) return 0;
    return (a.original_price - a.sales_price) / a.original_price * 100;
  };
  const currentCategory = ["All Gear Deals", "Camping Gear", "Fishing Gear", "Hiking Gear", "Hunting Gear", "Outdoor Gear"];
  const categoryIcon = ["https://outdoorempire.com/wp-content/uploads/2025/06/campfire-white.png", "https://outdoorempire.com/wp-content/uploads/2025/06/OutdoorEmpire_Icons2021_Tent-17-white.png", "https://outdoorempire.com/wp-content/uploads/2025/06/OutdoorEmpire_Icons2021_Fish-10-white.png", "https://outdoorempire.com/wp-content/uploads/2025/06/OutdoorEmpire_Icons2021_GearRating-38-white.png", "https://outdoorempire.com/wp-content/uploads/2025/06/OutdoorEmpire_Icons2021_Antler-03-white.png", "https://outdoorempire.com/wp-content/uploads/2025/06/OutdoorEmpire_Icons2021_Tree_Water-31-white.png"];
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
  if (!deals || deals.length === 0) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "honey-hole-empty"
    }, "No deals found");
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, isMobile && filtering && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mobile-filter-overlay"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "modal-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_FilterBar_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
    categories: categories,
    setCategories: setCategories,
    activeCategory: activeCategory,
    setActiveCategory: setActiveCategory,
    isMobile: isMobile,
    setFiltering: setFiltering
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hh-grid-heading-wrapper"
  }, isMobile ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-grid-heading"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "deal-grid-icon",
    src: categoryIcon[activeCategory]
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "deal-grid-title"
  }, currentCategory[activeCategory]))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "hh-heading"
  }, "Honey Hole Deals"), " "), !isMobile && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Sorter_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
    sort: sort,
    setSort: setSort
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hh-main-bg"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hh-main-wrapper"
  }, isMobile ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mobile-filter-buttons"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    id: "mobile-filter-button",
    onClick: () => setFiltering(true)
  }, "Filter"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Sorter_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], null)) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_FilterBar_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
    categories: categories,
    setCategories: setCategories,
    activeCategory: activeCategory,
    setActiveCategory: setActiveCategory,
    isMobile: isMobile
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hh-deal-grid-wrapper"
  }, !isMobile && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-grid-heading"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "deal-grid-icon",
    src: categoryIcon[activeCategory]
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "deal-grid-title"
  }, currentCategory[activeCategory])), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deals-grid"
  }, dealsArray.map(deal => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DealCard_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
    promo: deal.promo_code,
    key: deal.id,
    deal: deal,
    categories: categories,
    seller: deal.seller
  })))))));
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const DealOMeterGraphic = () => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-o-meter-graphic-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dom-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dom-top"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Deal-O-Meter")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dom-middle"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "dom-copy"
  }, "Keep an eye on your local ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "Deal-O-Meter"), " to see how good of a deal you're getting!"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "dom-graphic",
    src: "https://outdoorempire.com/wp-content/uploads/2025/09/Deal-o-meter-meter-graphic-2.png",
    alt: ""
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dom-graphic-container"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dom-bottom"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "Only YOU can save on these deals!"))));
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


const DealsVideo = () => {
  const [videoUrl, setVideoUrl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("https://www.youtube.com/embed/BVzmHPOdVBs?si=YSZ5NaCJ0IjQOFcd");
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const fetchVideoSettings = async () => {
      try {
        const response = await fetch("/wp-json/honey-hole/v1/video-settings");
        if (response.ok) {
          const data = await response.json();
          setVideoUrl(data.video_url);
        }
      } catch (error) {
        console.error("Error fetching video settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideoSettings();
  }, []);
  if (loading) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Loading video...");
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("iframe", {
    id: "deal-video",
    width: "100%",
    height: "auto",
    src: videoUrl,
    title: "YouTube video player",
    frameBorder: "0",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
    referrerPolicy: "strict-origin-when-cross-origin",
    allowFullScreen: true
  }));
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const EmailSignup = () => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "hh-email-section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "hh-email-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "hh-email-container-one"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "hh-email-image"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "hh-email-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Get the Best Deals and Win Free Gear!"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    method: "post",
    class: "af-form-wrapper",
    "accept-charset": "UTF-8",
    action: "https://www.aweber.com/scripts/addlead.pl"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hidden"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    name: "meta_web_form_id",
    value: "894900673"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    name: "meta_split_id",
    value: ""
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    name: "listname",
    value: "awlist6324539"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    name: "redirect",
    value: "https://www.aweber.com/thankyou-coi.htm?m=text",
    id: "redirect_8e911f903751383335eaae138e94c2b8"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    name: "meta_adtracking",
    value: "Honey_Hole_unstyled_form"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    name: "meta_message",
    value: "1"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    name: "meta_required",
    value: "email"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    name: "meta_tooltip",
    value: ""
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "af-form-894900673",
    class: "af-form"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "hh-input-wrapper",
    class: "af-body af-standards"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "af-element"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "af-textWrap"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    placeholder: "Email",
    class: "text",
    id: "awf_field-118013225",
    type: "email",
    name: "email",
    tabindex: "500",
    onfocus: " if (this.value == '') { this.value = ''; }",
    onblur: "if (this.value == '') { this.value='';}"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "af-clear"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "af-element hh-email-submit-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: "hh-email-submit",
    name: "submit",
    class: "submit",
    type: "submit",
    value: "Subscribe",
    tabindex: "501"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "af-clear"
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hidden"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: "https://forms.aweber.com/form/displays.htm?id=HJwsnAwMbOzM",
    alt: ""
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    class: "hh-email-disclaimer"
  }, "We email once per week, sometimes more. Unsubscribe at any time."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    class: "hh-email-disclaimer"
  }, "We respect your", " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    id: "hh-email-disclaimer-link",
    href: "https://www.aweber.com/privacy.htm",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "email privacy")))))));
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




const FilterBar = ({
  categories,
  setCategories,
  activeCategory,
  setActiveCategory,
  isMobile,
  setFiltering
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sidebar"
  }, isMobile && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mobile-sidebar-header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Filter"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "mobile-close",
    onClick: () => setFiltering(false)
  }, "\xD7")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hh-filter-bar"
  }, !isMobile && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    id: "hh-filter"
  }, "Filter"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hh-categories"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "hh-filter-subheading"
  }, "Categories"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "hh-filter-button",
    id: activeCategory === 0 ? "hh-active-category" : "",
    onClick: () => {
      setActiveCategory(0);
      setCategories("all");
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "hh-filter-icon"
  }, "+"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "hh-filter-heading"
  }, "All Gear Deals")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "hh-filter-button",
    id: activeCategory === 1 ? "hh-active-category" : "",
    onClick: () => {
      setActiveCategory(1);
      setCategories("camping-gear");
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "hh-filter-icon"
  }, "+"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "hh-filter-heading"
  }, "Camping Gear")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "hh-filter-button",
    id: activeCategory === 2 ? "hh-active-category" : "",
    onClick: () => {
      setActiveCategory(2);
      setCategories("fishing-gear");
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "hh-filter-icon"
  }, "+"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "hh-filter-heading"
  }, "Fishing Gear")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "hh-filter-button",
    id: activeCategory === 3 ? "hh-active-category" : "",
    onClick: () => {
      setActiveCategory(3);
      setCategories("hiking-gear");
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "hh-filter-icon"
  }, "+"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "hh-filter-heading"
  }, "Hiking Gear")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "hh-filter-button",
    id: activeCategory === 4 ? "hh-active-category" : "",
    onClick: () => {
      setActiveCategory(4);
      setCategories("hunting-gear");
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "hh-filter-icon"
  }, "+"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "hh-filter-heading"
  }, "Hunting Gear")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "hh-filter-button",
    id: activeCategory === 5 ? "hh-active-category" : "",
    onClick: () => {
      setActiveCategory(5);
      setCategories("outdoor-gear");
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "hh-filter-icon"
  }, "+"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "hh-filter-heading"
  }, "Outdoor Gear")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SideBar__WEBPACK_IMPORTED_MODULE_1__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_EmailSignup__WEBPACK_IMPORTED_MODULE_2__["default"], null));
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const Hero = () => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "honey-hole-hero"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "honey-hole-hero-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "honey-hole-hero-image"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: "https://outdoorempire.com/wp-content/uploads/2025/02/the-honey-hole-transparent.png",
    alt: ""
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "honey-hole-hero-copy"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "We Find the Best Outdoor Gear Deals to Save You Time and Money!"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "honey-hole-hero-copy-text"
  }, "We manually crawl catalogs, ads, and websites of top outdoor gear brands and retailers in search of discounted outdoor gear to create this curated list that will save you hours of shopping around."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "honey-hole-hero-copy-text"
  }, "Deal prices are valid at time of posting, but could change at any moment."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    id: "honey-hole-updated"
  }, "Last Updated: ", formattedDate)))));
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const HeroEmailSignup = () => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "hh-hero-email-section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "hh-email-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "hh-email-container-one"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "hh-hero-email-image"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "hh-email-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Get the Best Deals and Win Free Gear!"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    method: "post",
    class: "af-form-wrapper",
    "accept-charset": "UTF-8",
    action: "https://www.aweber.com/scripts/addlead.pl"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hidden"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    name: "meta_web_form_id",
    value: "894900673"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    name: "meta_split_id",
    value: ""
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    name: "listname",
    value: "awlist6324539"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    name: "redirect",
    value: "https://www.aweber.com/thankyou-coi.htm?m=text",
    id: "redirect_8e911f903751383335eaae138e94c2b8"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    name: "meta_adtracking",
    value: "Honey_Hole_unstyled_form"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    name: "meta_message",
    value: "1"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    name: "meta_required",
    value: "email"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    name: "meta_tooltip",
    value: ""
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "af-form-894900673",
    class: "af-form"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "hh-hero-input-wrapper",
    class: "af-body af-standards"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "af-element hero-email-input"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "af-textWrap"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    placeholder: "Email",
    class: "text",
    id: "awf_field-118013225",
    type: "email",
    name: "email",
    value: "",
    tabindex: "500",
    onfocus: " if (this.value == '') { this.value = ''; }",
    onblur: "if (this.value == '') { this.value='';}"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "af-clear"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "af-element hh-hero-email-submit-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: "hh-email-submit",
    name: "submit",
    class: "submit",
    type: "submit",
    value: "Subscribe",
    tabindex: "501"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "af-clear"
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hidden"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: "https://forms.aweber.com/form/displays.htm?id=HJwsnAwMbOzM",
    alt: ""
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    class: "hh-email-disclaimer"
  }, "We email once per week, sometimes more. Unsubscribe at any time."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    class: "hh-email-disclaimer"
  }, "We respect your", " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    id: "hh-email-disclaimer-link",
    href: "https://www.aweber.com/privacy.htm",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "email privacy")))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeroEmailSignup);

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




const LatestDeals = ({
  deals
}) => {
  const [sortedDeals, setSortedDeals] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setSortedDeals(deals.filter(deal => {
      return deal.categories[0].name !== "Big Sale";
    }).slice(0, 4));
  }, [deals]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "category-section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    id: "hh-affiliate-disclaimer"
  }, "DISCLAIMER: Outdoor Empire does not sell the products on this page. Some or all links are affiliate links which means we may earn a small commission if you make a purchase, at no cost to you. As an Amazon Associate I earn from qualifying purchases. Discounts and availability are not guaranteed. Verify all information at respective retailers before making a purchase.", " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://outdoorempire.com/affiliate-disclaimer/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Learn More")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Just Added"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deals-grid"
  }, sortedDeals.map(deal => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DealCard_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
    key: deal.id,
    deal: deal
  })))));
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const SearchBar = ({
  value,
  onChange
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "honey-hole-search"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    placeholder: "Search deals...",
    value: value,
    onChange: e => onChange(e.target.value),
    className: "honey-hole-search-input"
  }));
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DealsVideo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DealsVideo */ "./src/frontend/components/DealsVideo.jsx");


const SideBar = () => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sidebar-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DealsVideo__WEBPACK_IMPORTED_MODULE_1__["default"], null));
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const Sorter = ({
  sort,
  setSort
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sorter-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    name: "sort",
    id: "sort",
    onChange: e => {
      setSort(e.target.value);
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "newest"
  }, "Newest First"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "oldest"
  }, "Oldest First"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "low"
  }, "Price Low to High"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "high"
  }, "Price High to Low"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "savings"
  }, "Savings % Off"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "rating"
  }, "Deal Rating"))));
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






// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Find the container
  const container = document.getElementById('honey-hole-app');
  if (container) {
    // Create a root
    const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(container);

    // Render the app
    root.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)((react__WEBPACK_IMPORTED_MODULE_0___default().StrictMode), null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_App__WEBPACK_IMPORTED_MODULE_2__["default"], null)));
  }
});
})();

/******/ })()
;
//# sourceMappingURL=honey-hole-frontend.js.map