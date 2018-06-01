(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactSimpleTable"] = factory(require("react"));
	else
		root["ReactSimpleTable"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	__webpack_require__(13);
	
	var _Table = __webpack_require__(14);
	
	var _Table2 = _interopRequireDefault(_Table);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Table2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	if (false) {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;
	
	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };
	
	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(17)();
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(1);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (suffix) {
	    return function (WrappedElement) {
	
	        function ElementWithClassName(props, context) {
	            var className = "" + context.className + suffix;
	
	            return _react2.default.createElement(WrappedElement, Object.assign({}, props, {
	                className: className
	            }));
	        }
	
	        ElementWithClassName.contextTypes = {
	            className: _propTypes2.default.string
	        };
	
	        return ElementWithClassName;
	    };
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(1);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (semanticNodeName) {
	    return function (WrappedElement) {
	
	        function ElementWithCorrectDOMNode(props, context) {
	            var Element = context.semantic === false ? "div" : semanticNodeName;
	
	            return _react2.default.createElement(WrappedElement, Object.assign({}, props, {
	                Element: Element
	            }));
	        }
	
	        ElementWithCorrectDOMNode.contextTypes = {
	            semantic: _propTypes2.default.bool
	        };
	
	        return ElementWithCorrectDOMNode;
	    };
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomFromSeed = __webpack_require__(25);
	
	var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
	var alphabet;
	var previousSeed;
	
	var shuffled;
	
	function reset() {
	    shuffled = false;
	}
	
	function setCharacters(_alphabet_) {
	    if (!_alphabet_) {
	        if (alphabet !== ORIGINAL) {
	            alphabet = ORIGINAL;
	            reset();
	        }
	        return;
	    }
	
	    if (_alphabet_ === alphabet) {
	        return;
	    }
	
	    if (_alphabet_.length !== ORIGINAL.length) {
	        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
	    }
	
	    var unique = _alphabet_.split('').filter(function(item, ind, arr){
	       return ind !== arr.lastIndexOf(item);
	    });
	
	    if (unique.length) {
	        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
	    }
	
	    alphabet = _alphabet_;
	    reset();
	}
	
	function characters(_alphabet_) {
	    setCharacters(_alphabet_);
	    return alphabet;
	}
	
	function setSeed(seed) {
	    randomFromSeed.seed(seed);
	    if (previousSeed !== seed) {
	        reset();
	        previousSeed = seed;
	    }
	}
	
	function shuffle() {
	    if (!alphabet) {
	        setCharacters(ORIGINAL);
	    }
	
	    var sourceArray = alphabet.split('');
	    var targetArray = [];
	    var r = randomFromSeed.nextValue();
	    var characterIndex;
	
	    while (sourceArray.length > 0) {
	        r = randomFromSeed.nextValue();
	        characterIndex = Math.floor(r * sourceArray.length);
	        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
	    }
	    return targetArray.join('');
	}
	
	function getShuffled() {
	    if (shuffled) {
	        return shuffled;
	    }
	    shuffled = shuffle();
	    return shuffled;
	}
	
	/**
	 * lookup shuffled letter
	 * @param index
	 * @returns {string}
	 */
	function lookup(index) {
	    var alphabetShuffled = getShuffled();
	    return alphabetShuffled[index];
	}
	
	module.exports = {
	    characters: characters,
	    seed: setSeed,
	    lookup: lookup,
	    shuffled: getShuffled
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Body = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(1);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _Row = __webpack_require__(8);
	
	var _Row2 = _interopRequireDefault(_Row);
	
	var _addClassName = __webpack_require__(3);
	
	var _addClassName2 = _interopRequireDefault(_addClassName);
	
	var _provideCorrectDOMNode = __webpack_require__(4);
	
	var _provideCorrectDOMNode2 = _interopRequireDefault(_provideCorrectDOMNode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Body = exports.Body = function (_Component) {
	    _inherits(Body, _Component);
	
	    function Body(props) {
	        _classCallCheck(this, Body);
	
	        var _this = _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this, props));
	
	        _this.state = {
	            data: _this.props.data || [],
	            itemsWithInlinedDetails: []
	        };
	
	        _this.toggleDetails = _this.toggleDetails.bind(_this);
	        return _this;
	    }
	
	    _createClass(Body, [{
	        key: "componentWillReceiveProps",
	        value: function componentWillReceiveProps(_ref) {
	            var _ref$data = _ref.data,
	                data = _ref$data === undefined ? [] : _ref$data;
	
	            this.setState({
	                data: data,
	                itemsWithInlinedDetails: []
	            });
	        }
	    }, {
	        key: "toggleDetails",
	        value: function toggleDetails(clickedItem) {
	            if (this.props.detailsInlined) {
	                this.toggleInlinedDetailsRow(clickedItem);
	            } else {
	                this.toggleStandaloneDetailsRow(clickedItem);
	            }
	        }
	    }, {
	        key: "toggleStandaloneDetailsRow",
	        value: function toggleStandaloneDetailsRow(clickedItem) {
	            var indexOfClickedItem = this.state.data.indexOf(clickedItem);
	            var nextItem = this.state.data[indexOfClickedItem + 1];
	            var areDetailsCurrentlyVisible = nextItem && nextItem.isRowWithDetails;
	
	            if (areDetailsCurrentlyVisible) {
	                this.hideDetails(indexOfClickedItem);
	            } else {
	                this.showDetails(indexOfClickedItem);
	            }
	        }
	    }, {
	        key: "toggleInlinedDetailsRow",
	        value: function toggleInlinedDetailsRow(clickedItem) {
	            var indexOfClickedItem = this.state.data.indexOf(clickedItem);
	            var detailsAlreadyOpened = this.state.itemsWithInlinedDetails.includes(indexOfClickedItem);
	
	            if (detailsAlreadyOpened) {
	                this.hideInlinedDetails(indexOfClickedItem);
	            } else {
	                this.showInlinedDetails(indexOfClickedItem);
	            }
	        }
	    }, {
	        key: "hideDetails",
	        value: function hideDetails(indexOfClickedItem) {
	            var newData = [].concat(_toConsumableArray(this.state.data));
	            newData.splice(indexOfClickedItem + 1, 1);
	            this.setState({
	                data: newData
	            });
	        }
	    }, {
	        key: "showDetails",
	        value: function showDetails(indexOfClickedItem) {
	            var newData = [].concat(_toConsumableArray(this.state.data));
	            newData.splice(indexOfClickedItem + 1, 0, {
	                isRowWithDetails: true
	            });
	            this.setState({
	                data: newData
	            });
	        }
	    }, {
	        key: "hideInlinedDetails",
	        value: function hideInlinedDetails(indexOfClickedItem) {
	            var indexOfDetailedItems = this.state.itemsWithInlinedDetails.indexOf(indexOfClickedItem);
	            var newDetailedItems = [].concat(_toConsumableArray(this.state.itemsWithInlinedDetails));
	            newDetailedItems.splice(indexOfDetailedItems, 1);
	
	            this.setState({
	                itemsWithInlinedDetails: newDetailedItems
	            });
	        }
	    }, {
	        key: "showInlinedDetails",
	        value: function showInlinedDetails(indexOfClickedItem) {
	            var newDetailedItems = [].concat(_toConsumableArray(this.state.itemsWithInlinedDetails));
	            newDetailedItems.push(indexOfClickedItem);
	
	            this.setState({
	                itemsWithInlinedDetails: newDetailedItems
	            });
	        }
	    }, {
	        key: "getDetailsRowCells",
	        value: function getDetailsRowCells(dataOfClickedRow) {
	            return [{
	                colSpan: this.props.columns.length,
	                content: this.props.details(dataOfClickedRow),
	                className: "with-details"
	            }];
	        }
	    }, {
	        key: "getFullRowCells",
	        value: function getFullRowCells(dataOfClickedRow) {
	            var contentType = _typeof(dataOfClickedRow.content);
	            var content = null;
	
	            if (contentType === "function") {
	                content = dataOfClickedRow.content();
	            } else {
	                content = dataOfClickedRow.content;
	            }
	
	            return [{
	                colSpan: this.props.columns.length,
	                content: content,
	                className: "is-full"
	            }];
	        }
	    }, {
	        key: "getRowWithInlinedDetailsCells",
	        value: function getRowWithInlinedDetailsCells(row) {
	            var _this2 = this;
	
	            return [].concat(_toConsumableArray(this.props.columns.map(function (column) {
	                return _this2.getCell(column, row);
	            })), [{
	                content: this.props.details(row),
	                className: "with-details with-inlined-details"
	            }]);
	        }
	    }, {
	        key: "getStandardRowCells",
	        value: function getStandardRowCells(row) {
	            var _this3 = this;
	
	            return this.props.columns.map(function (column) {
	                return _this3.getCell(column, row);
	            });
	        }
	    }, {
	        key: "getCell",
	        value: function getCell(column, row) {
	            var _this4 = this;
	
	            var cellProperties = {};
	            var toggler = this.toggleDetails.bind(this, row);
	            var onClickHandlers = [];
	
	            cellProperties.content = column.component && typeof column.component === "function" ? column.component(row, toggler) : row[column.field];
	
	            if (this.props.details) {
	                onClickHandlers.push(toggler);
	            }
	
	            if (this.props.onRowClick) {
	                onClickHandlers.push(function (event) {
	                    return _this4.props.onRowClick(row, event);
	                });
	            }
	
	            if (onClickHandlers.length) {
	                cellProperties.onClick = function (event) {
	                    onClickHandlers.forEach(function (handler) {
	                        handler(event);
	                    });
	                };
	            }
	
	            cellProperties.absoluteWidth = column.absoluteWidth;
	
	            return cellProperties;
	        }
	    }, {
	        key: "getCellsForRowsInColumnsOrder",
	        value: function getCellsForRowsInColumnsOrder() {
	            var _this5 = this;
	
	            var data = this.state.data;
	            var lastFullRowIndex = -1;
	            return data.map(function (rowData, index) {
	                if (rowData.isRowWithDetails && _this5.props.detailsInlined !== true) {
	                    var dataOfPreviousRow = data[index - 1];
	                    return { cells: _this5.getDetailsRowCells(dataOfPreviousRow), className: _this5.getClassName(lastFullRowIndex, index) };
	                } else if (_this5.state.itemsWithInlinedDetails.indexOf(index) > -1 && _this5.props.detailsInlined && _this5.context.semantic === false) {
	                    return { cells: _this5.getRowWithInlinedDetailsCells(rowData), className: _this5.getClassName(lastFullRowIndex, index) };
	                } else if (rowData.fullRow) {
	                    lastFullRowIndex = index;
	                    return { cells: _this5.getFullRowCells(rowData) };
	                } else {
	                    return { cells: _this5.getStandardRowCells(rowData), className: _this5.getClassName(lastFullRowIndex, index) };
	                }
	            });
	        }
	    }, {
	        key: "getClassName",
	        value: function getClassName(lastFullRowIndex, currentRowIndex) {
	            return (currentRowIndex - lastFullRowIndex + 1) % 2 === 0 ? _Row.evenRowClassName : _Row.oddRowClassName;
	        }
	    }, {
	        key: "renderRows",
	        value: function renderRows() {
	            var _this6 = this;
	
	            return this.getCellsForRowsInColumnsOrder().map(function (row, index) {
	                return _react2.default.createElement(_Row2.default, {
	                    key: index,
	                    cells: row.cells,
	                    additionalClassName: row.className,
	                    rowWrapper: _this6.props.rowWrapper
	                });
	            });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var Element = this.props.Element;
	
	
	            return _react2.default.createElement(
	                Element,
	                { className: this.props.className },
	                this.renderRows()
	            );
	        }
	    }]);
	
	    return Body;
	}(_react.Component);
	
	Body.propTypes = {
	    columns: _propTypes2.default.array,
	    data: _propTypes2.default.array,
	    details: _propTypes2.default.func,
	    detailsInlined: _propTypes2.default.bool,
	    className: _propTypes2.default.string,
	    Element: _propTypes2.default.string,
	    onRowClick: _propTypes2.default.func,
	    rowWrapper: _propTypes2.default.func
	};
	
	Body.defaultProps = {
	    detailsInlined: false
	};
	
	Body.contextTypes = {
	    semantic: _propTypes2.default.bool
	};
	
	exports.default = (0, _provideCorrectDOMNode2.default)("tbody")((0, _addClassName2.default)("_body")(Body));

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Cell = Cell;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(1);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _addClassName = __webpack_require__(3);
	
	var _addClassName2 = _interopRequireDefault(_addClassName);
	
	var _provideCorrectDOMNode = __webpack_require__(4);
	
	var _provideCorrectDOMNode2 = _interopRequireDefault(_provideCorrectDOMNode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Cell(props) {
	    var Element = props.Element;
	
	    var styles = {};
	
	    if (props.absoluteWidth) {
	        styles.width = props.absoluteWidth + "px";
	    }
	
	    return _react2.default.createElement(
	        Element,
	        {
	            style: styles,
	            colSpan: props.colSpan,
	            onClick: props.onClick,
	            className: props.className + " " + props.additionalClassName
	        },
	        props.children
	    );
	}
	
	Cell.propTypes = {
	    additionalClassName: _propTypes2.default.string,
	    className: _propTypes2.default.string,
	    colSpan: _propTypes2.default.number,
	    onClick: _propTypes2.default.func,
	    children: _propTypes2.default.node,
	    absoluteWidth: _propTypes2.default.number
	};
	
	exports.default = (0, _provideCorrectDOMNode2.default)("td")((0, _addClassName2.default)("_cell")(Cell));

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.oddRowClassName = exports.evenRowClassName = undefined;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(1);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _Cell = __webpack_require__(7);
	
	var _Cell2 = _interopRequireDefault(_Cell);
	
	var _addClassName = __webpack_require__(3);
	
	var _addClassName2 = _interopRequireDefault(_addClassName);
	
	var _provideCorrectDOMNode = __webpack_require__(4);
	
	var _provideCorrectDOMNode2 = _interopRequireDefault(_provideCorrectDOMNode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var evenRowClassName = exports.evenRowClassName = "is-even";
	var oddRowClassName = exports.oddRowClassName = "is-odd";
	
	function Row(props) {
	    var Element = props.Element;
	
	
	    var cells = props.cells.map(function (cell, key) {
	        var cellAdditionalClassName = cell.className ? cell.className : "";
	
	        return _react2.default.createElement(
	            _Cell2.default,
	            {
	                key: key,
	                onClick: cell.onClick,
	                colSpan: cell.colSpan,
	                absoluteWidth: cell.absoluteWidth,
	                additionalClassName: cellAdditionalClassName
	            },
	            cell.content
	        );
	    });
	
	    var rowAdditionalClassName = props.additionalClassName ? props.additionalClassName : "";
	
	    var row = _react2.default.createElement(
	        Element,
	        { className: props.className + " " + rowAdditionalClassName },
	        cells
	    );
	
	    return props.rowWrapper ? props.rowWrapper(row, props.cells) : row;
	}
	
	Row.propTypes = {
	    cells: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
	    className: _propTypes2.default.string,
	    additionalClassName: _propTypes2.default.string,
	    Element: _propTypes2.default.string,
	    rowWrapper: _propTypes2.default.func
	};
	
	exports.default = (0, _provideCorrectDOMNode2.default)("tr")((0, _addClassName2.default)("_row")(Row));

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Column = Column;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(1);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _Sorter = __webpack_require__(12);
	
	var _Sorter2 = _interopRequireDefault(_Sorter);
	
	var _addClassName = __webpack_require__(3);
	
	var _addClassName2 = _interopRequireDefault(_addClassName);
	
	var _provideCorrectDOMNode = __webpack_require__(4);
	
	var _provideCorrectDOMNode2 = _interopRequireDefault(_provideCorrectDOMNode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Column(_ref) {
	    var column = _ref.column,
	        className = _ref.className,
	        Element = _ref.Element,
	        onReorder = _ref.onReorder;
	
	    var props = {
	        key: column.title,
	        "data-key": column.title,
	        className: className
	    };
	    var isSortable = column.isSortable === undefined ? true : column.isSortable;
	
	    if (isSortable && column.onSort) {
	        props.onClick = function () {
	            column.onSort(column);
	        };
	    }
	
	    if (onReorder) {
	        props.draggable = true;
	
	        props.onDragStart = function (event) {
	            event.dataTransfer.setData("text", column.title);
	        };
	
	        props.onDragOver = function (event) {
	            event.preventDefault();
	        };
	
	        props.onDragEnter = function (event) {
	            event.target.classList.add("drop-target-entered");
	        };
	
	        props.onDragLeave = function (event) {
	            event.target.classList.remove("drop-target-entered");
	        };
	
	        props.onDrop = function (event) {
	            event.preventDefault();
	            event.target.classList.remove("drop-target-entered");
	            var sourceColumnKey = event.dataTransfer.getData("text");
	            var targetColumnKey = event.target.getAttribute("data-key");
	            onReorder(sourceColumnKey, targetColumnKey);
	        };
	    }
	
	    if (typeof column.absoluteWidth === "number") {
	        props.style = {
	            width: column.absoluteWidth + "px"
	        };
	    }
	
	    return column.headerComponent && typeof column.headerComponent === "function" ? _react2.default.createElement(
	        Element,
	        props,
	        column.headerComponent(function () {
	            return renderTitle(column.title);
	        }, function () {
	            return renderSorter(column, isSortable);
	        })
	    ) : _react2.default.createElement(
	        Element,
	        props,
	        renderTitle(column.title),
	        renderSorter(column, isSortable)
	    );
	}
	
	function renderTitle(title) {
	    return typeof title === "function" && (0, _react.isValidElement)(title()) ? renderTitleAsComponent(title) : renderTitleAsString(title);
	}
	
	function renderTitleAsString(title) {
	    return title ? title : null;
	}
	
	function renderTitleAsComponent(Title) {
	    return _react2.default.createElement(Title, null);
	}
	
	function renderSorter(column, isSortable) {
	    return isSortable ? _react2.default.createElement(_Sorter2.default, {
	        sorted: column.sorted,
	        sorterComponent: column.sorterComponent
	    }) : null;
	}
	
	Column.propTypes = {
	    column: _propTypes2.default.object,
	    className: _propTypes2.default.string,
	    Element: _propTypes2.default.string,
	    onReorder: _propTypes2.default.func
	};
	
	exports.default = (0, _provideCorrectDOMNode2.default)("th")((0, _addClassName2.default)("_th")(Column));

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Columns = Columns;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(1);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _shortid = __webpack_require__(19);
	
	var _shortid2 = _interopRequireDefault(_shortid);
	
	var _Column = __webpack_require__(9);
	
	var _Column2 = _interopRequireDefault(_Column);
	
	var _addClassName = __webpack_require__(3);
	
	var _addClassName2 = _interopRequireDefault(_addClassName);
	
	var _provideCorrectDOMNode = __webpack_require__(4);
	
	var _provideCorrectDOMNode2 = _interopRequireDefault(_provideCorrectDOMNode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Columns(props) {
	    var Element = props.Element;
	
	
	    return _react2.default.createElement(
	        Element,
	        { className: props.className },
	        getColumns(props)
	    );
	}
	
	function getColumns(columnsDefinitions) {
	    var columns = columnsDefinitions.columns,
	        sorterComponent = columnsDefinitions.sorterComponent,
	        onSort = columnsDefinitions.onSort,
	        columnClassName = columnsDefinitions.columnClassName,
	        onReorder = columnsDefinitions.onReorder;
	
	
	    return columns && columns.length ? columns.map(function (column) {
	        column.sorterComponent = sorterComponent;
	        column.onSort = onSort;
	
	        return _react2.default.createElement(_Column2.default, {
	            className: columnClassName,
	            key: _shortid2.default.generate(),
	            column: column,
	            onReorder: onReorder
	        });
	    }) : null;
	}
	
	Columns.propTypes = {
	    columns: _propTypes2.default.array,
	    sorterComponent: _propTypes2.default.func,
	    onSort: _propTypes2.default.func,
	    columnClassName: _propTypes2.default.string,
	    className: _propTypes2.default.string,
	    Element: _propTypes2.default.string,
	    onReorder: _propTypes2.default.func
	};
	
	exports.default = (0, _provideCorrectDOMNode2.default)("tr")((0, _addClassName2.default)("_head-row")(Columns));

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Head = Head;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(1);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _Columns = __webpack_require__(10);
	
	var _Columns2 = _interopRequireDefault(_Columns);
	
	var _addClassName = __webpack_require__(3);
	
	var _addClassName2 = _interopRequireDefault(_addClassName);
	
	var _provideCorrectDOMNode = __webpack_require__(4);
	
	var _provideCorrectDOMNode2 = _interopRequireDefault(_provideCorrectDOMNode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Head(_ref) {
	    var _ref$columns = _ref.columns,
	        columns = _ref$columns === undefined ? [] : _ref$columns,
	        sorterComponent = _ref.sorterComponent,
	        onSort = _ref.onSort,
	        className = _ref.className,
	        Element = _ref.Element,
	        onReorder = _ref.onReorder,
	        headerComponent = _ref.headerComponent;
	
	    return _react2.default.createElement(
	        Element,
	        { className: className },
	        _react2.default.createElement(_Columns2.default, {
	            columns: columns,
	            sorterComponent: sorterComponent,
	            onSort: onSort,
	            onReorder: onReorder
	        })
	    );
	}
	
	Head.propTypes = {
	    columns: _propTypes2.default.array,
	    sorterComponent: _propTypes2.default.func,
	    onSort: _propTypes2.default.func,
	    className: _propTypes2.default.string,
	    Element: _propTypes2.default.string,
	    onReorder: _propTypes2.default.func
	};
	
	exports.default = (0, _provideCorrectDOMNode2.default)("thead")((0, _addClassName2.default)("_head")(Head));

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = Sorter;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(1);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Sorter(_ref) {
	    var sorted = _ref.sorted,
	        sorterComponent = _ref.sorterComponent;
	
	    return sorted ? renderSorterComponent(sorted, sorterComponent) : null;
	}
	
	function renderSorterComponent(sorted, sorterComponent) {
	    return sorterComponent ? sorterComponent(sorted) : _react2.default.createElement("span", { className: "sorter sorted-" + sorted.toLowerCase() });
	}
	
	Sorter.propTypes = {
	    sorted: _propTypes2.default.any,
	    sorterComponent: _propTypes2.default.func
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex#Polyfill
	if (!Array.prototype.findIndex) {
	      Object.defineProperty(Array.prototype, 'findIndex', {
	            value: function value(predicate) {
	                  // 1. Let O be ? ToObject(this value).
	                  if (this == null) {
	                        throw new TypeError('"this" is null or not defined');
	                  }
	
	                  var o = Object(this);
	
	                  // 2. Let len be ? ToLength(? Get(O, "length")).
	                  var len = o.length >>> 0;
	
	                  // 3. If IsCallable(predicate) is false, throw a TypeError exception.
	                  if (typeof predicate !== 'function') {
	                        throw new TypeError('predicate must be a function');
	                  }
	
	                  // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
	                  var thisArg = arguments[1];
	
	                  // 5. Let k be 0.
	                  var k = 0;
	
	                  // 6. Repeat, while k < len
	                  while (k < len) {
	                        // a. Let Pk be ! ToString(k).
	                        // b. Let kValue be ? Get(O, Pk).
	                        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
	                        // d. If testResult is true, return k.
	                        var kValue = o[k];
	                        if (predicate.call(thisArg, kValue, k, o)) {
	                              return k;
	                        }
	                        // e. Increase k by 1.
	                        k++;
	                  }
	
	                  // 7. Return -1.
	                  return -1;
	            }
	      });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(1);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _Head = __webpack_require__(11);
	
	var _Head2 = _interopRequireDefault(_Head);
	
	var _Body = __webpack_require__(6);
	
	var _Body2 = _interopRequireDefault(_Body);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Table = function (_Component) {
	    _inherits(Table, _Component);
	
	    function Table(props) {
	        _classCallCheck(this, Table);
	
	        var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));
	
	        _this.container = null;
	
	        _this.onScroll = _this.onScroll.bind(_this);
	        return _this;
	    }
	
	    _createClass(Table, [{
	        key: "onScroll",
	        value: function onScroll(event) {
	            var scrolledToTheBottom = this.container.clientHeight + this.container.scrollTop >= this.container.scrollHeight;
	
	            if (scrolledToTheBottom && this.props.onScrollToBottom) {
	                this.props.onScrollToBottom(event);
	            }
	        }
	    }, {
	        key: "getChildContext",
	        value: function getChildContext() {
	            return {
	                className: this.props.className,
	                semantic: this.props.semantic
	            };
	        }
	    }, {
	        key: "getContainerStyles",
	        value: function getContainerStyles() {
	            var styles = {};
	
	            this.addMaxHeightStyles(styles);
	
	            return styles;
	        }
	    }, {
	        key: "addMaxHeightStyles",
	        value: function addMaxHeightStyles(styles) {
	            if (this.props.maxHeight) {
	                styles.maxHeight = this.props.maxHeight;
	                styles.overflowY = "auto";
	            }
	
	            return styles;
	        }
	    }, {
	        key: "renderBody",
	        value: function renderBody() {
	            var body = _react2.default.createElement(_Body2.default, {
	                columns: this.props.columns,
	                data: this.props.data,
	                details: this.props.details,
	                detailsInlined: this.props.detailsInlined,
	                onRowClick: this.props.onRowClick,
	                rowWrapper: this.props.rowWrapper
	            });
	
	            return this.props.bodyWrapper ? this.props.bodyWrapper(body) : body;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this2 = this;
	
	            var Element = this.props.semantic ? "table" : "div";
	
	            return _react2.default.createElement(
	                "div",
	                {
	                    className: this.props.className + "-container",
	                    style: this.getContainerStyles(),
	                    onScroll: this.onScroll,
	                    ref: function ref(element) {
	                        return _this2.container = element;
	                    },
	                    tabIndex: 0
	                },
	                _react2.default.createElement(
	                    Element,
	                    { className: this.props.className },
	                    _react2.default.createElement(_Head2.default, {
	                        columns: this.props.columns,
	                        sorterComponent: this.props.sorterComponent,
	                        onSort: this.props.onSort,
	                        onReorder: this.props.onReorder
	                    }),
	                    this.renderBody()
	                )
	            );
	        }
	    }]);
	
	    return Table;
	}(_react.Component);
	
	exports.default = Table;
	
	
	Table.propTypes = {
	    columns: _propTypes2.default.array,
	    data: _propTypes2.default.array,
	    className: _propTypes2.default.string,
	    details: _propTypes2.default.func,
	    sorterComponent: _propTypes2.default.func,
	    maxHeight: _propTypes2.default.string,
	    onScrollToBottom: _propTypes2.default.func,
	    onSort: _propTypes2.default.func,
	    onReorder: _propTypes2.default.func,
	    semantic: _propTypes2.default.bool,
	    detailsInlined: _propTypes2.default.bool,
	    bodyWrapper: _propTypes2.default.func,
	    onRowClick: _propTypes2.default.func,
	    rowWrapper: _propTypes2.default.func
	};
	
	Table.childContextTypes = {
	    className: _propTypes2.default.string,
	    semantic: _propTypes2.default.bool
	};
	
	Table.defaultProps = {
	    className: "table",
	    semantic: true,
	    detailsInlined: false
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */
	
	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}
	
	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};
	
	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};
	
	module.exports = emptyFunction;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var validateFormat = function validateFormat(format) {};
	
	if (false) {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}
	
	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}
	
	module.exports = invariant;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';
	
	var emptyFunction = __webpack_require__(15);
	var invariant = __webpack_require__(16);
	var ReactPropTypesSecret = __webpack_require__(18);
	
	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    invariant(
	      false,
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,
	
	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim
	  };
	
	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;
	
	  return ReactPropTypes;
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';
	
	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
	
	module.exports = ReactPropTypesSecret;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = __webpack_require__(22);


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(5);
	
	/**
	 * Decode the id to get the version and worker
	 * Mainly for debugging and testing.
	 * @param id - the shortid-generated id.
	 */
	function decode(id) {
	    var characters = alphabet.shuffled();
	    return {
	        version: characters.indexOf(id.substr(0, 1)) & 0x0f,
	        worker: characters.indexOf(id.substr(1, 1)) & 0x0f
	    };
	}
	
	module.exports = decode;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomByte = __webpack_require__(24);
	
	function encode(lookup, number) {
	    var loopCounter = 0;
	    var done;
	
	    var str = '';
	
	    while (!done) {
	        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );
	        done = number < (Math.pow(16, loopCounter + 1 ) );
	        loopCounter++;
	    }
	    return str;
	}
	
	module.exports = encode;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var alphabet = __webpack_require__(5);
	var encode = __webpack_require__(21);
	var decode = __webpack_require__(20);
	var isValid = __webpack_require__(23);
	
	// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
	// This number should be updated every year or so to keep the generated id short.
	// To regenerate `new Date() - 0` and bump the version. Always bump the version!
	var REDUCE_TIME = 1459707606518;
	
	// don't change unless we change the algos or REDUCE_TIME
	// must be an integer and less than 16
	var version = 6;
	
	// if you are using cluster or multiple servers use this to make each instance
	// has a unique value for worker
	// Note: I don't know if this is automatically set when using third
	// party cluster solutions such as pm2.
	var clusterWorkerId = __webpack_require__(26) || 0;
	
	// Counter is used when shortid is called multiple times in one second.
	var counter;
	
	// Remember the last time shortid was called in case counter is needed.
	var previousSeconds;
	
	/**
	 * Generate unique id
	 * Returns string id
	 */
	function generate() {
	
	    var str = '';
	
	    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);
	
	    if (seconds === previousSeconds) {
	        counter++;
	    } else {
	        counter = 0;
	        previousSeconds = seconds;
	    }
	
	    str = str + encode(alphabet.lookup, version);
	    str = str + encode(alphabet.lookup, clusterWorkerId);
	    if (counter > 0) {
	        str = str + encode(alphabet.lookup, counter);
	    }
	    str = str + encode(alphabet.lookup, seconds);
	
	    return str;
	}
	
	
	/**
	 * Set the seed.
	 * Highly recommended if you don't want people to try to figure out your id schema.
	 * exposed as shortid.seed(int)
	 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
	 */
	function seed(seedValue) {
	    alphabet.seed(seedValue);
	    return module.exports;
	}
	
	/**
	 * Set the cluster worker or machine id
	 * exposed as shortid.worker(int)
	 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
	 * returns shortid module so it can be chained.
	 */
	function worker(workerId) {
	    clusterWorkerId = workerId;
	    return module.exports;
	}
	
	/**
	 *
	 * sets new characters to use in the alphabet
	 * returns the shuffled alphabet
	 */
	function characters(newCharacters) {
	    if (newCharacters !== undefined) {
	        alphabet.characters(newCharacters);
	    }
	
	    return alphabet.shuffled();
	}
	
	
	// Export all other functions as properties of the generate function
	module.exports = generate;
	module.exports.generate = generate;
	module.exports.seed = seed;
	module.exports.worker = worker;
	module.exports.characters = characters;
	module.exports.decode = decode;
	module.exports.isValid = isValid;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(5);
	
	function isShortId(id) {
	    if (!id || typeof id !== 'string' || id.length < 6 ) {
	        return false;
	    }
	
	    var characters = alphabet.characters();
	    var len = id.length;
	    for(var i = 0; i < len;i++) {
	        if (characters.indexOf(id[i]) === -1) {
	            return false;
	        }
	    }
	    return true;
	}
	
	module.exports = isShortId;


/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';
	
	var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto
	
	function randomByte() {
	    if (!crypto || !crypto.getRandomValues) {
	        return Math.floor(Math.random() * 256) & 0x30;
	    }
	    var dest = new Uint8Array(1);
	    crypto.getRandomValues(dest);
	    return dest[0] & 0x30;
	}
	
	module.exports = randomByte;


/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	// Found this seed-based random generator somewhere
	// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)
	
	var seed = 1;
	
	/**
	 * return a random number based on a seed
	 * @param seed
	 * @returns {number}
	 */
	function getNextValue() {
	    seed = (seed * 9301 + 49297) % 233280;
	    return seed/(233280.0);
	}
	
	function setSeed(_seed_) {
	    seed = _seed_;
	}
	
	module.exports = {
	    nextValue: getNextValue,
	    seed: setSeed
	};


/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = 0;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map