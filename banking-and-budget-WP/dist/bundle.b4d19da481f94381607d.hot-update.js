/*! For license information please see bundle.b4d19da481f94381607d.hot-update.js.LICENSE.txt */
"use strict";self.webpackHotUpdatebanking_and_budget("bundle",{"./src/components/panels/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "PanelSectionHolder": () => (/* binding */ PanelSectionHolder),\n/* harmony export */   "PanelSections": () => (/* binding */ PanelSections)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar PanelSectionHolder = function PanelSectionHolder(_ref) {\n  var _ref$children = _ref.children,\n      children = _ref$children === void 0 ? [] : _ref$children,\n      _ref$panelIdx = _ref.panelIdx,\n      panelIdx = _ref$panelIdx === void 0 ? 0 : _ref$panelIdx,\n      selectedIndex = _ref.selectedIndex;\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    var targetRadio = document.querySelectorAll("[data-panelradio=\\"main\\"]");\n    targetRadio[panelIdx].checked = true;\n    var targetEl = document.querySelectorAll(".section-item");\n    targetEl.forEach(function (panel, idx) {\n      panelIdx > idx ? panel.classList.add("force-hide") : panel.classList.remove("force-hide");\n    });\n  }, [panelIdx]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "section-container"\n  }, children, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "section-marker"\n  }, children.map(function (panel, idx) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      key: idx,\n      className: "rdo-container",\n      style: {\n        top: "".concat(2 * idx, "rem")\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {\n      "data-panelradio": "main",\n      type: "radio",\n      name: "panel-selector",\n      id: "panelIndex".concat(idx),\n      className: "customRdo",\n      onClick: function onClick() {\n        selectedIndex(idx);\n      }\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {\n      "for": "panelIndex".concat(idx),\n      className: "panel-selector-label"\n    }));\n  })));\n};\n\nvar PanelSections = function PanelSections(_ref2) {\n  var _ref2$children = _ref2.children,\n      children = _ref2$children === void 0 ? null : _ref2$children,\n      _ref2$color = _ref2.color,\n      color = _ref2$color === void 0 ? "transparent" : _ref2$color;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "section-item",\n    style: {\n      backgroundColor: color\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, children));\n};\n\n\n\n//# sourceURL=webpack://banking-and-budget/./src/components/panels/index.js?')}},(function(e){e.h=()=>"c6d638f174e3f4ca97cf"}));