/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/App.jsx":
/*!********************************!*\
  !*** ./src/components/App.jsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DealGrid_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DealGrid.jsx */ "./src/components/DealGrid.jsx");
/* harmony import */ var _FilterBar_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FilterBar.jsx */ "./src/components/FilterBar.jsx");
/* harmony import */ var _SearchBar_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SearchBar.jsx */ "./src/components/SearchBar.jsx");
/* harmony import */ var _Hero_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Hero.jsx */ "./src/components/Hero.jsx");
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  _regeneratorRuntime = function _regeneratorRuntime() {
    return r;
  };
  var t,
    r = {},
    e = Object.prototype,
    n = e.hasOwnProperty,
    o = "function" == typeof Symbol ? Symbol : {},
    i = o.iterator || "@@iterator",
    a = o.asyncIterator || "@@asyncIterator",
    u = o.toStringTag || "@@toStringTag";
  function c(t, r, e, n) {
    return Object.defineProperty(t, r, {
      value: e,
      enumerable: !n,
      configurable: !n,
      writable: !n
    });
  }
  try {
    c({}, "");
  } catch (t) {
    c = function c(t, r, e) {
      return t[r] = e;
    };
  }
  function h(r, e, n, o) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype);
    return c(a, "_invoke", function (r, e, n) {
      var o = 1;
      return function (i, a) {
        if (3 === o) throw Error("Generator is already running");
        if (4 === o) {
          if ("throw" === i) throw a;
          return {
            value: t,
            done: !0
          };
        }
        for (n.method = i, n.arg = a;;) {
          var u = n.delegate;
          if (u) {
            var c = d(u, n);
            if (c) {
              if (c === f) continue;
              return c;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (1 === o) throw o = 4, n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          o = 3;
          var h = s(r, e, n);
          if ("normal" === h.type) {
            if (o = n.done ? 4 : 2, h.arg === f) continue;
            return {
              value: h.arg,
              done: n.done
            };
          }
          "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg);
        }
      };
    }(r, n, new Context(o || [])), !0), a;
  }
  function s(t, r, e) {
    try {
      return {
        type: "normal",
        arg: t.call(r, e)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  r.wrap = h;
  var f = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var l = {};
  c(l, i, function () {
    return this;
  });
  var p = Object.getPrototypeOf,
    y = p && p(p(x([])));
  y && y !== e && n.call(y, i) && (l = y);
  var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l);
  function g(t) {
    ["next", "throw", "return"].forEach(function (r) {
      c(t, r, function (t) {
        return this._invoke(r, t);
      });
    });
  }
  function AsyncIterator(t, r) {
    function e(o, i, a, u) {
      var c = s(t[o], t, i);
      if ("throw" !== c.type) {
        var h = c.arg,
          f = h.value;
        return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) {
          e("next", t, a, u);
        }, function (t) {
          e("throw", t, a, u);
        }) : r.resolve(f).then(function (t) {
          h.value = t, a(h);
        }, function (t) {
          return e("throw", t, a, u);
        });
      }
      u(c.arg);
    }
    var o;
    c(this, "_invoke", function (t, n) {
      function i() {
        return new r(function (r, o) {
          e(t, n, r, o);
        });
      }
      return o = o ? o.then(i, i) : i();
    }, !0);
  }
  function d(r, e) {
    var n = e.method,
      o = r.i[n];
    if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f;
    var i = s(o, r.i, e.arg);
    if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f;
    var a = i.arg;
    return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f);
  }
  function w(t) {
    this.tryEntries.push(t);
  }
  function m(r) {
    var e = r[4] || {};
    e.type = "normal", e.arg = t, r[4] = e;
  }
  function Context(t) {
    this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0);
  }
  function x(r) {
    if (null != r) {
      var e = r[i];
      if (e) return e.call(r);
      if ("function" == typeof r.next) return r;
      if (!isNaN(r.length)) {
        var o = -1,
          a = function e() {
            for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e;
            return e.value = t, e.done = !0, e;
          };
        return a.next = a;
      }
    }
    throw new TypeError(_typeof(r) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) {
    var r = "function" == typeof t && t.constructor;
    return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name));
  }, r.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t;
  }, r.awrap = function (t) {
    return {
      __await: t
    };
  }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () {
    return this;
  }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(h(t, e, n, o), i);
    return r.isGeneratorFunction(e) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, g(v), c(v, u, "Generator"), c(v, i, function () {
    return this;
  }), c(v, "toString", function () {
    return "[object Generator]";
  }), r.keys = function (t) {
    var r = Object(t),
      e = [];
    for (var n in r) e.unshift(n);
    return function t() {
      for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t;
      return t.done = !0, t;
    };
  }, r.values = x, Context.prototype = {
    constructor: Context,
    reset: function reset(r) {
      if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t);
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0][4];
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(r) {
      if (this.done) throw r;
      var e = this;
      function n(t) {
        a.type = "throw", a.arg = r, e.next = t;
      }
      for (var o = e.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i[4],
          u = this.prev,
          c = i[1],
          h = i[2];
        if (-1 === i[0]) return n("end"), !1;
        if (!c && !h) throw Error("try statement without catch or finally");
        if (null != i[0] && i[0] <= u) {
          if (u < c) return this.method = "next", this.arg = t, n(c), !0;
          if (u < h) return n(h), !1;
        }
      }
    },
    abrupt: function abrupt(t, r) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var n = this.tryEntries[e];
        if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) {
          var o = n;
          break;
        }
      }
      o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null);
      var i = o ? o[4] : {};
      return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i);
    },
    complete: function complete(t, r) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f;
    },
    finish: function finish(t) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var e = this.tryEntries[r];
        if (e[2] === t) return this.complete(e[4], e[3]), m(e), f;
      }
    },
    "catch": function _catch(t) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var e = this.tryEntries[r];
        if (e[0] === t) {
          var n = e[4];
          if ("throw" === n.type) {
            var o = n.arg;
            m(e);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(r, e, n) {
      return this.delegate = {
        i: x(r),
        r: e,
        n: n
      }, "next" === this.method && (this.arg = t), f;
    }
  }, r;
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}





var App = function App() {
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    deals = _useState2[0],
    setDeals = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  var _useState7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
      category: '',
      sortBy: 'date',
      searchQuery: ''
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    filters = _useState8[0],
    setFilters = _useState8[1];
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    fetchDeals();
  }, []);
  var fetchDeals = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var response, data;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            setLoading(true);
            _context.next = 4;
            return fetch(honeyHoleData.apiUrl, {
              headers: {
                'X-WP-Nonce': honeyHoleData.nonce
              }
            });
          case 4:
            response = _context.sent;
            if (response.ok) {
              _context.next = 7;
              break;
            }
            throw new Error('Failed to fetch deals');
          case 7:
            _context.next = 9;
            return response.json();
          case 9:
            data = _context.sent;
            setDeals(data);
            setLoading(false);
            _context.next = 18;
            break;
          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            setError(_context.t0.message);
            setLoading(false);
          case 18:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 14]]);
    }));
    return function fetchDeals() {
      return _ref.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React.createElement("div", {
    className: "honey-hole-deals"
  }, /*#__PURE__*/React.createElement(_Hero_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/React.createElement("div", {
    className: "deals-filter"
  }, /*#__PURE__*/React.createElement(_FilterBar_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
    filters: filters,
    onFilterChange: setFilters
  })), error && /*#__PURE__*/React.createElement("div", {
    className: "honey-hole-error"
  }, error), loading ? /*#__PURE__*/React.createElement("div", {
    className: "honey-hole-loading"
  }, "Loading deals...") : /*#__PURE__*/React.createElement(_DealGrid_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
    deals: deals
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./src/components/DealCard.jsx":
/*!*************************************!*\
  !*** ./src/components/DealCard.jsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var DealCard = function DealCard(_ref) {
  var deal = _ref.deal;
  var title = deal.title,
    image_url = deal.image_url,
    original_price = deal.original_price,
    sales_price = deal.sales_price,
    rating = deal.rating,
    product_url = deal.product_url;
  var discount_percentage = Math.round((original_price - sales_price) / original_price * 100);
  var getDiscountClass = function getDiscountClass(percentage) {
    if (percentage >= 50) return 'discount-high';
    if (percentage >= 30) return 'discount-medium';
    return 'discount-low';
  };
  var getPriceClass = function getPriceClass(percentage) {
    if (percentage >= 50) return 'sales-price-high';
    if (percentage >= 30) return 'sales-price-medium';
    return 'sales-price-low';
  };
  var star = /*#__PURE__*/React.createElement("span", {
    className: "star"
  }, "\u2605");
  return /*#__PURE__*/React.createElement("div", {
    className: "deal-card"
  }, /*#__PURE__*/React.createElement("a", {
    href: product_url,
    className: "deal-card-link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "deal-image"
  }, image_url ? /*#__PURE__*/React.createElement("img", {
    src: image_url,
    alt: title
  }) : /*#__PURE__*/React.createElement("div", {
    className: "no-image"
  }, "No Image Available")), /*#__PURE__*/React.createElement("div", {
    className: "deal-content"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "deal-title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "deal-pricing"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sales-price ".concat(getPriceClass(discount_percentage))
  }, "$", sales_price), original_price && /*#__PURE__*/React.createElement("span", {
    className: "original-price"
  }, "$", original_price), discount_percentage > 0 && /*#__PURE__*/React.createElement("span", {
    className: "discount ".concat(getDiscountClass(discount_percentage))
  }, discount_percentage, "% OFF")), /*#__PURE__*/React.createElement("div", {
    className: "deal-rating"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rating-stars"
  }, Array.from({
    length: 5
  }, function (_, i) {
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      className: "star ".concat(i < rating ? 'filled' : '')
    }, "\u2605");
  })), /*#__PURE__*/React.createElement("span", {
    className: "rating-value"
  }, rating, ".0")))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DealCard);

/***/ }),

/***/ "./src/components/DealGrid.jsx":
/*!*************************************!*\
  !*** ./src/components/DealGrid.jsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DealCard_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DealCard.jsx */ "./src/components/DealCard.jsx");

var DealGrid = function DealGrid(_ref) {
  var deals = _ref.deals;
  if (!deals || deals.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "honey-hole-empty"
    }, "No deals found");
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "deals-grid"
  }, deals.map(function (deal) {
    return /*#__PURE__*/React.createElement(_DealCard_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], {
      key: deal.id,
      deal: deal
    });
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DealGrid);

/***/ }),

/***/ "./src/components/FilterBar.jsx":
/*!**************************************!*\
  !*** ./src/components/FilterBar.jsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var FilterBar = function FilterBar(_ref) {
  var filters = _ref.filters,
    onFilterChange = _ref.onFilterChange;
  var handleCategoryChange = function handleCategoryChange(category) {
    onFilterChange(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        category: category
      });
    });
  };
  var handleSortChange = function handleSortChange(sortBy) {
    onFilterChange(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        sortBy: sortBy
      });
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "honey-hole-filter-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "honey-hole-categories"
  }, /*#__PURE__*/React.createElement("button", {
    className: "honey-hole-category ".concat(filters.category === '' ? 'active' : ''),
    onClick: function onClick() {
      return handleCategoryChange('');
    }
  }, "All"), /*#__PURE__*/React.createElement("button", {
    className: "honey-hole-category ".concat(filters.category === 'clothing' ? 'active' : ''),
    onClick: function onClick() {
      return handleCategoryChange('clothing');
    }
  }, "Clothing"), /*#__PURE__*/React.createElement("button", {
    className: "honey-hole-category ".concat(filters.category === 'footwear' ? 'active' : ''),
    onClick: function onClick() {
      return handleCategoryChange('footwear');
    }
  }, "Footwear"), /*#__PURE__*/React.createElement("button", {
    className: "honey-hole-category ".concat(filters.category === 'equipment' ? 'active' : ''),
    onClick: function onClick() {
      return handleCategoryChange('equipment');
    }
  }, "Equipment")), /*#__PURE__*/React.createElement("div", {
    className: "honey-hole-sort"
  }, /*#__PURE__*/React.createElement("select", {
    value: filters.sortBy,
    onChange: function onChange(e) {
      return handleSortChange(e.target.value);
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "date"
  }, "Newest"), /*#__PURE__*/React.createElement("option", {
    value: "price_asc"
  }, "Price: Low to High"), /*#__PURE__*/React.createElement("option", {
    value: "price_desc"
  }, "Price: High to Low"), /*#__PURE__*/React.createElement("option", {
    value: "discount"
  }, "Highest Discount"), /*#__PURE__*/React.createElement("option", {
    value: "rating"
  }, "Highest Rated"))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FilterBar);

/***/ }),

/***/ "./src/components/Hero.jsx":
/*!*********************************!*\
  !*** ./src/components/Hero.jsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Hero = function Hero() {
  var date = new Date();
  var formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return /*#__PURE__*/React.createElement("div", {
    "class": "honey-hole-hero"
  }, /*#__PURE__*/React.createElement("div", {
    "class": "honey-hole-hero-content"
  }, /*#__PURE__*/React.createElement("div", {
    "class": "honey-hole-hero-image"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://outdoorempire.com/wp-content/uploads/2025/02/the-honey-hole-transparent.png",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    "class": "honey-hole-hero-copy"
  }, /*#__PURE__*/React.createElement("h2", null, "We Find the Best Outdoor Gear Deals to Save You Time and Money!"), /*#__PURE__*/React.createElement("p", null, "We manually crawl catalogs, ads, and websites of top outdoor gear brands and retailers in search of discounted outdoor gear to create this curated list that will save you hours of shopping around."), /*#__PURE__*/React.createElement("p", null, "We update this page all the time with the best deals we find on gear for camping, hiking, backpacking, hunting, fishing, and more."), /*#__PURE__*/React.createElement("p", null, "Bookmark this page and check back often!"), /*#__PURE__*/React.createElement("p", null, "Deal prices are valid at time of posting, but could change at any moment."), /*#__PURE__*/React.createElement("p", {
    id: "honey-hole-updated"
  }, "Last Updated: ", formattedDate))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hero);

/***/ }),

/***/ "./src/components/SearchBar.jsx":
/*!**************************************!*\
  !*** ./src/components/SearchBar.jsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var SearchBar = function SearchBar(_ref) {
  var value = _ref.value,
    _onChange = _ref.onChange;
  return /*#__PURE__*/React.createElement("div", {
    className: "honey-hole-search"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search deals...",
    value: value,
    onChange: function onChange(e) {
      return _onChange(e.target.value);
    },
    className: "honey-hole-search-input"
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchBar);

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

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
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_App_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/App.jsx */ "./src/components/App.jsx");



// Initialize the app when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('honey-hole-app');
  if (container) {
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)(/*#__PURE__*/React.createElement(_components_App_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], null), container);
  }
});
})();

/******/ })()
;
//# sourceMappingURL=honey-hole-app.js.map