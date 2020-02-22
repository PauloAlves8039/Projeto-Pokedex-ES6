/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _pokeService = __webpack_require__(2);
	
	var _listService = __webpack_require__(3);
	
	var listFilter = '';
	var listElement = document.querySelector('#pokeList'),
	    inputElement = document.querySelector('#pokeFilter'),
	    pokeballElement = document.querySelector('#pokeballBack');
	
	inputElement.addEventListener('keyup', function (event) {
		listFilter = event.target.value;
		setList();
	});
	
	window.addEventListener('scroll', function () {
		var rotation = 'translateY(-50%) rotateZ(' + window.scrollY / 15 + 'deg)';
		pokeballElement.style.transform = rotation;
	});
	
	function setList() {
		_pokeService.PokeService.listAll().then(filterList).then(_listService.ListService.createList).then(function (template) {
			return listElement.innerHTML = template;
		});
	}
	
	function filterList(pkmList) {
		return pkmList.filter(function (pkm) {
			return pkm.name.includes(listFilter.toLowerCase());
		});
	}
	
	setList();

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var PokeService = exports.PokeService = {
		get url() {
			return '//pokeapi.co/api/v1/';
		},
		list: [],
		listAll: function listAll() {
			var _this = this;
	
			if (this.list.length) {
				return Promise.resolve(this.list);
			} else {
				return fetch(this.url + 'pokedex/1').then(function (response) {
					return response.json();
				}).then(function (response) {
					return response.pokemon;
				}).then(function (pkmList) {
					return pkmList.map(function (pokemon) {
						var number = _this.getNumberFromURL(pokemon.resource_uri);
						return Object.assign({}, pokemon, { number: number });
					}).filter(function (pokemon) {
						return parseInt(pokemon.number) < 1000;
					}).sort(function (a, b) {
						return a.number > b.number ? 1 : -1;
					}).map(function (pokemon) {
						var number = ("000" + pokemon.number).slice(-3);
						return Object.assign({}, pokemon, { number: number });
					});
				}).then(function (list) {
					_this.list = list;
					return list;
				});
			}
		},
		getNumberFromURL: function getNumberFromURL(url) {
			return parseInt(url.replace(/.*\/(\d+)\/$/, '$1'));
		}
	};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var ListService = exports.ListService = {
		createList: function createList(pkmList) {
			return pkmList.map(function (pokemon) {
				return '\n\t\t\t\t<li class="poke-list-item" >\n\t\t\t\t\t<img src="//serebii.net/pokedex-xy/icon/' + pokemon.number + '.png" />\n\t\t\t\t\t<span>' + pokemon.number + ' - ' + pokemon.name + '</span>\n\t\t\t\t</li>\n\t\t\t';
			}).join('');
		}
	};

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map