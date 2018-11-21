/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client.js":
/*!*******************!*\
  !*** ./client.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nvar convert = __webpack_require__(/*! ./index */ \"./index.js\");\n\nvar result = document.querySelector(\".result\");\nvar input = document.querySelector('.input');\nvar value = document.querySelector('.value');\n\nvalue.oninput = function (e) {\n  this.value !== 0 ? input.classList.remove(\"empty\") : input.classList.add(\"empty\");\n  var rawValue = this.value.replace(/,/g, \"\");\n\n  if (rawValue.length > 18) {\n    rawValue = rawValue.slice(0, 18);\n  }\n\n  result.textContent = convert(rawValue);\n\n  if (rawValue.length > 3) {\n    return this.value = formated(rawValue);\n  }\n};\n\nvalue.onkeypress = function (evt) {\n  if (evt.key === \"Enter\") evt.preventDefault();\n};\n\nfunction formated(rawValue) {\n  var separator = rawValue.replace(/(\\d{3})+$/g, ',$&');\n\n  var _separator$split = separator.split(','),\n      _separator$split2 = _slicedToArray(_separator$split, 2),\n      left = _separator$split2[0],\n      right = _separator$split2[1];\n\n  right = right.match(/\\d{3}/g);\n\n  if (rawValue.length % 3 === 0 && right.length > 1) {\n    return _.join(right, ',');\n  }\n\n  return \"\".concat(left, \",\").concat(_.join(right, \",\"));\n}\n\n//# sourceURL=webpack:///./client.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* \n              ty  trieu ngan dong\n    number : 123   456   789 123\n    minor  : abc   abc   abc abc\n    major  : xxx   xxx   xxx xxx \n */\n\n/** WORKFLOW\n *   number:                 103 056\n *   fill 0:         000 000 103 056\n *   remove 0:         0   0 103  56\n *   replace 0 = \"\":  \"\"  \"\" 103  56 => handleText\n *   zip           :  ty trieu ngan dong\n */\n\n/** CASE\n *  2 số:  0-9    => không - chính\n *         10     => mười\n *         1x     => mười <x>\n *         xx     => <x> mươi <x>\n *  \n *  3 số:  x0x    => <x> trăm lẻ <x>\n */\nvar _ = __webpack_require__(/*! lodash */ \"lodash\");\n\nvar blocks = ['triệu', 'ngàn', 'tỷ', 'triệu', 'ngàn'];\nvar majorLimit = 18;\nvar defaultOptions = {\n  unit: 'đồng'\n};\n\nfunction convert(number) {\n  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;\n  if (typeof number !== 'number') number = +number;\n\n  var _number = \"\".concat(number).slice(-majorLimit); // limited to 18 digits\n\n\n  if (!/^\\d+$/g.test(_number)) throw new Error(\"Argument have to a number!\");\n\n  switch (_number.length) {\n    case 1:\n    case 2:\n    case 3:\n      return \"\".concat(handleDigitToStr(number), \" \").concat(options.unit);\n  }\n\n  var unit = options.unit;\n  blocks[5] || blocks.push(unit);\n  var major = fillNumber(_number, majorLimit);\n  return handleMajor(major, blocks, options);\n}\n\nfunction handleMajor(major, blocks, options) {\n  var minorsString = major.match(/\\d{3}/g);\n\n  var minorsNumber = _.map(minorsString, function (minor) {\n    return +minor;\n  }); // remove 0 trong mỗi minor block\n\n\n  var minorsCompacted = _.compact(_.zipWith(minorsNumber, blocks, function (number, block) {\n    if (number == 0 && block == \"đồng\") return \"chẵn\";\n    if (number == 0) return number;\n    return {\n      number: number,\n      block: block\n    };\n  }));\n\n  return _.reduce(minorsCompacted, function (prev, curr, index, list) {\n    var prevStr = typeof prev !== \"string\" ? \"\".concat(handleDigitToStr(prev.number), \" \").concat(prev.block) : prev;\n    var currStr = typeof curr !== \"string\" ? \"\".concat(handleDigitToStr(curr.number), \" \").concat(curr.block) : curr;\n\n    if (currStr !== \"chẵn\") {\n      switch (\"\".concat(curr.number).length) {\n        case 1:\n          prevStr += \" không trăm lẻ\";\n          break;\n\n        case 2:\n          prevStr += \" không trăm\";\n          break;\n      }\n    }\n\n    var unit = typeof currStr === \"string\" ? currStr : options.unit;\n    return list[-1] !== curr ? \"\".concat(prevStr, \" \").concat(currStr) : \"\".concat(prevStr, \" \").concat(currStr, \" \").concat(unit);\n  });\n}\n/**\n * @description thêm 0 vào trước cho đủ  12 số (123456 => 000000123456)\n */\n\n\nfunction fillNumber(number, limit) {\n  var numberLength = \"\".concat(number).length;\n  var fillLength = numberLength % limit == 0 ? \"\".concat(number) : _.padStart(\"\".concat(number), limit, 0);\n  return fillLength;\n}\n\nfunction handleDigitToStr(number) {\n  switch (\"\".concat(number).length) {\n    case 1:\n      return oneDigitToStr(number);\n\n    case 2:\n      return twoDigitToStr(number);\n\n    case 3:\n      return threeDigitToStr(number);\n  }\n}\n\nvar numberStr = [\"không\", \"một\", \"hai\", \"ba\", \"bốn\", \"năm\", \"sáu\", \"bảy\", \"tám\", \"chín\", \"mười\"];\n\nfunction oneDigitToStr(number) {\n  return numberStr[number];\n}\n\nfunction twoDigitToStr(number) {\n  var chuc = parseInt(number / 10); // 25 => 2                              \n\n  var donvi = number % 10; // 25 => 5\n\n  if (number == 10) return oneDigitToStr(number); // 10\n\n  if (chuc !== 1 && donvi === 0) return \"\".concat(oneDigitToStr(chuc), \" m\\u01B0\\u01A1i\"); // 20, 30, ..., 90\n\n  if (chuc === 1 && donvi !== 0) return \"mu\\u1EDDi \".concat(oneDigitToStr(donvi)); // 1x\n\n  return \"\".concat(oneDigitToStr(chuc), \" m\\u01B0\\u01A1i \").concat(oneDigitToStr(donvi)); // xx\n}\n\nfunction threeDigitToStr(number) {\n  var tram = parseInt(number / 100); // 325 => 3\n\n  var chuc = number % 100; // 325 => 25\n\n  if (chuc === 0) return \"\".concat(oneDigitToStr(tram), \" tr\\u0103m\");\n  if (chuc < 10 && chuc > 0) chuc = \"l\\u1EBB \".concat(oneDigitToStr(chuc));else {\n    chuc = twoDigitToStr(chuc);\n  }\n  ;\n  return \"\".concat(oneDigitToStr(tram), \" tr\\u0103m \").concat(chuc);\n}\n\nmodule.exports = convert;\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "lodash":
/*!********************!*\
  !*** external "_" ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = _;\n\n//# sourceURL=webpack:///external_%22_%22?");

/***/ })

/******/ });