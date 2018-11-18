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

eval("var convert = __webpack_require__(/*! ./index */ \"./index.js\");\n\nvar result = document.getElementById(\"result\");\nvar input = document.querySelector('input');\n\ninput.oninput = function (evt) {\n  result.textContent = convert(+this.value);\n};\n\n//# sourceURL=webpack:///./client.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* \n              ty  trieu ngan dong\n    number : 123   456   789 123\n    minor  : abc   abc   abc abc\n    major  : xxx   xxx   xxx xxx \n */\n\n/** WORKFLOW\n *   number:                 103 056\n *   fill 0:         000 000 103 056\n *   remove 0:         0   0 103  56\n *   replace 0 = \"\":  \"\"  \"\" 103  56 => handleText\n *   zip           :  ty trieu ngan dong\n */\n\n/** CASE\n *  2 số:  0-9    => không - chính\n *         10     => mười\n *         1x     => mười <x>\n *         xx     => <x> mươi <x>\n *  \n *  3 số:  x0x    => <x> trăm lẻ <x>\n */\nvar _ = __webpack_require__(/*! lodash */ \"lodash\");\n\nvar blocks = ['tỷ', 'triệu', 'ngàn'];\nvar defaultOptions = {\n  unit: 'đồng'\n};\n\nfunction convert(number) {\n  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;\n  var unit = options.unit;\n  if (isNaN(number)) throw new Error(\"Argument have to a number!\");\n  if (number == 0) return \"\".concat(number2str(number), \" \").concat(unit);\n  blocks.push(unit);\n  var majorBlock = fillNumber(number);\n  var minorBlocks = majorBlock.match(/\\d{3}/g);\n\n  var minorBlocksTrimed = _.map(minorBlocks, function (minorBlock) {\n    return +minorBlock;\n  }); // remove 0 trong mỗi minor block\n\n\n  return _.join(_.compact(_.zipWith(minorBlocksTrimed, blocks, function (a, b) {\n    if (b == \"đồng\" && a == 0) return \"chẵn\";\n    if (b !== \"đồng\" && a == 0) return \"\";\n    var minorhandled = handleMinor(a, b);\n    return \"\".concat(minorhandled, \" \").concat(b);\n  })), \" \");\n}\n/**\n * @description thêm 0 vào trước cho đủ  12 số (123456 => 000000123456)\n */\n\n\nfunction fillNumber(number) {\n  var numberLength = \"\".concat(number).length;\n  var fillLength = numberLength % 12 == 0 ? \"\".concat(number) : _.padStart(\"\".concat(number), (parseInt(numberLength / 12) + 1) * 12, 0);\n  var majorBlock = fillLength.match(/\\d{12}/g)[0];\n  return majorBlock;\n}\n\nfunction handleMinor(number, unit) {\n  if (!number) return undefined;\n\n  switch (\"\".concat(number).length) {\n    case 1:\n      return unit === \"đồng\" ? \"l\\u1EBB \".concat(number2str(number)) : number2str(number);\n\n    case 2:\n      return unit === \"đồng\" ? \"l\\u1EBB \".concat(handleChuc(number)) : handleChuc(number);\n\n    case 3:\n      {\n        var tram = parseInt(number / 100); // 325 => 3\n\n        var chuc = number % 100; // 325 => 25\n\n        return \"\".concat(number2str(tram), \" tr\\u0103m \").concat(handleChuc(chuc, 3));\n      }\n  }\n}\n\nfunction handleChuc(number) {\n  var digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;\n  if (digits == 3 && number < 10) return \"l\\u1EBB \".concat(number2str(number));\n  if (number == 10) return number2str(number);\n  var chuc = parseInt(number / 10); // 25 => 2                              \n\n  var donvi = number % 10; // 25 => 5\n\n  return chuc == 1 ? \"m\\u01B0\\u1EDDi \".concat(number2str(donvi)) : \"\".concat(number2str(chuc), \" m\\u01B0\\u01A1i \").concat(number2str(donvi));\n}\n\nvar numberStr = [\"không\", \"một\", \"hai\", \"ba\", \"bốn\", \"năm\", \"sáu\", \"bảy\", \"tám\", \"chín\", \"mười\"];\n\nfunction number2str(number) {\n  return numberStr[number];\n}\n\nmodule.exports = convert;\n\n//# sourceURL=webpack:///./index.js?");

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