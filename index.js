(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactSimpleTable"] = factory(require("react"));
	else
		root["ReactSimpleTable"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
	
	var _Table = __webpack_require__(13);
	
	var _Table2 = _interopRequireDefault(_Table);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Table2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
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
	            className: _react.PropTypes.string
	        };
	
	        return ElementWithClassName;
	    };
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
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
	            semantic: _react.PropTypes.bool
	        };
	
	        return ElementWithCorrectDOMNode;
	    };
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomFromSeed = __webpack_require__(19);
	
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = __webpack_require__(16);


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
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Row = __webpack_require__(8);
	
	var _Row2 = _interopRequireDefault(_Row);
	
	var _addClassName = __webpack_require__(2);
	
	var _addClassName2 = _interopRequireDefault(_addClassName);
	
	var _provideCorrectDOMNode = __webpack_require__(3);
	
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
	                data: data
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
	            var cellProperties = {};
	            var toggler = this.toggleDetails.bind(this, row);
	
	            cellProperties.content = column.component && typeof column.component === "function" ? column.component(row, toggler) : row[column.field];
	
	            if (this.props.details) {
	                cellProperties.onClick = toggler;
	            }
	
	            return cellProperties;
	        }
	    }, {
	        key: "getCellsForRowsInColumnsOrder",
	        value: function getCellsForRowsInColumnsOrder() {
	            var _this4 = this;
	
	            var data = this.state.data;
	
	            return data.map(function (rowData, index) {
	                if (rowData.isRowWithDetails && _this4.props.detailsInlined !== true) {
	                    var dataOfPreviousRow = data[index - 1];
	                    return _this4.getDetailsRowCells(dataOfPreviousRow);
	                } else if (_this4.state.itemsWithInlinedDetails.indexOf(index) > -1 && _this4.props.detailsInlined && _this4.context.semantic === false) {
	                    return _this4.getRowWithInlinedDetailsCells(rowData);
	                } else if (rowData.fullRow) {
	                    return _this4.getFullRowCells(rowData);
	                } else {
	                    return _this4.getStandardRowCells(rowData);
	                }
	            });
	        }
	    }, {
	        key: "renderRows",
	        value: function renderRows() {
	            return this.getCellsForRowsInColumnsOrder().map(function (cells, index) {
	                return _react2.default.createElement(_Row2.default, {
	                    key: index,
	                    cells: cells
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
	    columns: _react.PropTypes.array,
	    data: _react.PropTypes.array,
	    details: _react.PropTypes.func,
	    detailsInlined: _react.PropTypes.bool,
	    className: _react.PropTypes.string,
	    Element: _react.PropTypes.string
	};
	
	Body.defaultProps = {
	    detailsInlined: false
	};
	
	Body.contextTypes = {
	    semantic: _react.PropTypes.bool
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
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _addClassName = __webpack_require__(2);
	
	var _addClassName2 = _interopRequireDefault(_addClassName);
	
	var _provideCorrectDOMNode = __webpack_require__(3);
	
	var _provideCorrectDOMNode2 = _interopRequireDefault(_provideCorrectDOMNode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Cell(props) {
	    var Element = props.Element;
	
	
	    return _react2.default.createElement(
	        Element,
	        {
	            colSpan: props.colSpan,
	            onClick: props.onClick,
	            className: props.className + " " + props.additionalClassName
	        },
	        props.children
	    );
	}
	
	Cell.propTypes = {
	    additionalClassName: _react.PropTypes.string,
	    className: _react.PropTypes.string,
	    colSpan: _react.PropTypes.number,
	    onClick: _react.PropTypes.func,
	    children: _react.PropTypes.node
	};
	
	exports.default = (0, _provideCorrectDOMNode2.default)("td")((0, _addClassName2.default)("_cell")(Cell));

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _shortid = __webpack_require__(5);
	
	var _shortid2 = _interopRequireDefault(_shortid);
	
	var _Cell = __webpack_require__(7);
	
	var _Cell2 = _interopRequireDefault(_Cell);
	
	var _addClassName = __webpack_require__(2);
	
	var _addClassName2 = _interopRequireDefault(_addClassName);
	
	var _provideCorrectDOMNode = __webpack_require__(3);
	
	var _provideCorrectDOMNode2 = _interopRequireDefault(_provideCorrectDOMNode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	                additionalClassName: cellAdditionalClassName
	            },
	            cell.content
	        );
	    });
	
	    return _react2.default.createElement(
	        Element,
	        {
	            className: props.className,
	            key: _shortid2.default.generate()
	        },
	        cells
	    );
	}
	
	Row.propTypes = {
	    cells: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array]),
	    className: _react.PropTypes.string,
	    Element: _react.PropTypes.string
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
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Sorter = __webpack_require__(12);
	
	var _Sorter2 = _interopRequireDefault(_Sorter);
	
	var _addClassName = __webpack_require__(2);
	
	var _addClassName2 = _interopRequireDefault(_addClassName);
	
	var _provideCorrectDOMNode = __webpack_require__(3);
	
	var _provideCorrectDOMNode2 = _interopRequireDefault(_provideCorrectDOMNode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Column(_ref) {
	    var column = _ref.column,
	        className = _ref.className,
	        Element = _ref.Element;
	
	    var props = {
	        key: column.title,
	        className: className
	    };
	
	    if (column.onSort) {
	        props.onClick = function () {
	            column.onSort(column);
	        };
	    }
	
	    return _react2.default.createElement(
	        Element,
	        props,
	        column.title,
	        _react2.default.createElement(_Sorter2.default, {
	            sorted: column.sorted,
	            sorterComponent: column.sorterComponent
	        })
	    );
	}
	
	Column.propTypes = {
	    column: _react.PropTypes.object,
	    className: _react.PropTypes.string,
	    Element: _react.PropTypes.string
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
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _shortid = __webpack_require__(5);
	
	var _shortid2 = _interopRequireDefault(_shortid);
	
	var _Column = __webpack_require__(9);
	
	var _Column2 = _interopRequireDefault(_Column);
	
	var _addClassName = __webpack_require__(2);
	
	var _addClassName2 = _interopRequireDefault(_addClassName);
	
	var _provideCorrectDOMNode = __webpack_require__(3);
	
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
	        columnClassName = columnsDefinitions.columnClassName;
	
	
	    return columns && columns.length ? columns.map(function (column) {
	
	        column.sorterComponent = sorterComponent;
	        column.onSort = onSort;
	
	        return _react2.default.createElement(_Column2.default, {
	            className: columnClassName,
	            key: _shortid2.default.generate(),
	            column: column
	        });
	    }) : null;
	}
	
	Columns.propTypes = {
	    columns: _react.PropTypes.array,
	    sorterComponent: _react.PropTypes.func,
	    onSort: _react.PropTypes.func,
	    columnClassName: _react.PropTypes.string,
	    className: _react.PropTypes.string,
	    Element: _react.PropTypes.string
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
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Columns = __webpack_require__(10);
	
	var _Columns2 = _interopRequireDefault(_Columns);
	
	var _addClassName = __webpack_require__(2);
	
	var _addClassName2 = _interopRequireDefault(_addClassName);
	
	var _provideCorrectDOMNode = __webpack_require__(3);
	
	var _provideCorrectDOMNode2 = _interopRequireDefault(_provideCorrectDOMNode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Head(_ref) {
	    var _ref$columns = _ref.columns,
	        columns = _ref$columns === undefined ? [] : _ref$columns,
	        sorterComponent = _ref.sorterComponent,
	        onSort = _ref.onSort,
	        className = _ref.className,
	        Element = _ref.Element;
	
	    return _react2.default.createElement(
	        Element,
	        { className: className },
	        _react2.default.createElement(_Columns2.default, {
	            columns: columns,
	            sorterComponent: sorterComponent,
	            onSort: onSort
	        })
	    );
	}
	
	Head.propTypes = {
	    columns: _react.PropTypes.array,
	    sorterComponent: _react.PropTypes.func,
	    onSort: _react.PropTypes.func,
	    className: _react.PropTypes.string,
	    Element: _react.PropTypes.string
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
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
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
	    sorted: _react.PropTypes.string,
	    sorterComponent: _react.PropTypes.func
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
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
	
	            if (scrolledToTheBottom) {
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
	                    }
	                },
	                _react2.default.createElement(
	                    Element,
	                    { className: this.props.className },
	                    _react2.default.createElement(_Head2.default, {
	                        columns: this.props.columns,
	                        sorterComponent: this.props.sorterComponent,
	                        onSort: this.props.onSort
	                    }),
	                    _react2.default.createElement(_Body2.default, {
	                        columns: this.props.columns,
	                        data: this.props.data,
	                        details: this.props.details,
	                        detailsInlined: this.props.detailsInlined
	                    })
	                )
	            );
	        }
	    }]);
	
	    return Table;
	}(_react.Component);
	
	exports.default = Table;
	
	
	Table.propTypes = {
	    columns: _react.PropTypes.array,
	    data: _react.PropTypes.array,
	    className: _react.PropTypes.string,
	    details: _react.PropTypes.func,
	    sorterComponent: _react.PropTypes.func,
	    maxHeight: _react.PropTypes.string,
	    onScrollToBottom: _react.PropTypes.func,
	    onSort: _react.PropTypes.func,
	    semantic: _react.PropTypes.bool,
	    detailsInlined: _react.PropTypes.bool
	};
	
	Table.childContextTypes = {
	    className: _react.PropTypes.string,
	    semantic: _react.PropTypes.bool
	};
	
	Table.defaultProps = {
	    className: "table",
	    semantic: true,
	    detailsInlined: false
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(4);
	
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomByte = __webpack_require__(18);
	
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var alphabet = __webpack_require__(4);
	var encode = __webpack_require__(15);
	var decode = __webpack_require__(14);
	var isValid = __webpack_require__(17);
	
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
	var clusterWorkerId = __webpack_require__(20) || 0;
	
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(4);
	
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
/* 18 */
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
/* 19 */
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
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = 0;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map