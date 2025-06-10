/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/react-dom/client.js":
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var m = __webpack_require__(/*! react-dom */ "react-dom");
if (false) {} else {
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
    className: "honey-hole-deals"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Hero_jsx__WEBPACK_IMPORTED_MODULE_7__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_LatestDeals_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], {
    deals: deals
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_EmailSignup_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DealsVideo_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], null), error && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "honey-hole-error"
  }, error), loading ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
    product_url
  } = deal;
  const discount_percentage = Math.round((original_price - sales_price) / original_price * 100);
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });
  const getDiscountClass = percentage => {
    if (percentage >= 50) return "discount-high";
    if (percentage >= 30) return "discount-medium";
    return "discount-low";
  };
  const getPriceClass = percentage => {
    if (percentage >= 50) return "sales-price-high";
    if (percentage >= 30) return "sales-price-medium";
    return "sales-price-low";
  };
  const star = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "star"
  }, "\u2605");
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: product_url,
    className: "deal-card-link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-image"
  }, image_url ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: image_url,
    alt: title
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "no-image"
  }, "No Image Available")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "deal-title"
  }, title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-pricing"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `sales-price ${getPriceClass(discount_percentage)}`
  }, USDollar.format(sales_price)), original_price && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "original-price"
  }, USDollar.format(original_price)), discount_percentage > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `discount ${getDiscountClass(discount_percentage)}`
  }, discount_percentage, "% OFF")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deal-rating"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rating-stars"
  }, Array.from({
    length: 5
  }, (_, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    key: i,
    className: `star ${i < rating ? "filled" : ""}`
  }, "\u2605"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rating-value"
  }, rating, ".0")))));
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





const DealGrid = ({
  deals
}) => {
  const [categories, setCategories] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("all");
  const [dealsArray, setDealsArray] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(deals);
  const [originalArray, setOriginalArray] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(deals);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (categories === "all") {
      setDealsArray(deals);
    } else setDealsArray(deals.filter(deal => {
      return deal.categories[0].slug === categories;
    }));
  }, [categories]);
  const test = () => {
    console.log(deals[0].categories[0].slug);
  };
  if (!deals || deals.length === 0) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "honey-hole-empty"
    }, "No deals found");
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_FilterBar_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
    categories: categories,
    setCategories: setCategories
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "deals-grid"
  }, dealsArray.map(deal => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DealCard_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
    key: deal.id,
    deal: deal,
    categories: categories
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DealGrid);

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
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("iframe", {
    id: "deal-video",
    width: "100%",
    height: "auto",
    src: "https://www.youtube.com/embed/SMiEJ0qDJ8I?si=y-zCwgrDLO7z7NUO",
    title: "YouTube video player",
    frameborder: "0",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
    referrerpolicy: "strict-origin-when-cross-origin",
    allowfullscreen: true
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
    value: "",
    tabindex: "500",
    onfocus: " if (this.value == '') { this.value = ''; }",
    onblur: "if (this.value == '') { this.value='';}"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "af-clear"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "af-element buttonContainer"
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
  }, "email privacy")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "hh-email-container-two-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "hh-email-container-two"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Get Sweet Outdoor Gear Deals in Your Inbox \uD83E\uDD11\uD83C\uDFD5\uFE0F\uD83D\uDD25"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Receive outdoor stories, tips, and deal alerts. Plus, be entered into our weekly gear giveaway when you sign up for", " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "italic"
  }, "The Honey Hole"), " email newsletter!"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Join thousands of outdoor enthusiasts who love saving money and discovering the best gear."))))));
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


const FilterBar = ({
  categories,
  setCategories
}) => {
  const [activeCategory, setActiveCategory] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hh-filter-bar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hh-categories"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    id: activeCategory === 0 ? "hh-active-category" : "",
    onClick: () => {
      setActiveCategory(0);
      setCategories("all");
    }
  }, "All Gear Deals"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    id: activeCategory === 1 ? "hh-active-category" : "",
    onClick: () => {
      setActiveCategory(1);
      setCategories("camping-gear");
    }
  }, "Camping Gear"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    id: activeCategory === 2 ? "hh-active-category" : "",
    onClick: () => {
      setActiveCategory(2);
      setCategories("fishing-gear");
    }
  }, "Fishing Gear"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    id: activeCategory === 3 ? "hh-active-category" : "",
    onClick: () => {
      setActiveCategory(3);
      setCategories("hiking-gear");
    }
  }, "Hiking Gear"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    id: activeCategory === 4 ? "hh-active-category" : "",
    onClick: () => {
      setActiveCategory(4);
      setCategories("hunting-gear");
    }
  }, "Hunting Gear"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    id: activeCategory === 5 ? "hh-active-category" : "",
    onClick: () => {
      setActiveCategory(5);
      setCategories("outdoor-gear");
    }
  }, "Outdoor Gear")));
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
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "We Find the Best Outdoor Gear Deals to Save You Time and Money!"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "We manually crawl catalogs, ads, and websites of top outdoor gear brands and retailers in search of discounted outdoor gear to create this curated list that will save you hours of shopping around."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Deal prices are valid at time of posting, but could change at any moment."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    id: "honey-hole-updated"
  }, "Last Updated: ", formattedDate)))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hero);

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
    setSortedDeals(deals.slice(0, 4));
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