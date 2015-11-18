"use strict";

var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var ProductConstants = require("../constants/ProductConstants");
var assign = require("object-assign");
var async = require("async");

var _product = {
	_id: null,
	name: null,
	supplier: null,
	code: null,
	price: 0
};

var ProductStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function addChangeListener(callback) {
		this.on(ProductConstants.CHANGE_EVENT, callback);
	},

	emitChange: function emitChange() {
		this.emit(ProductConstants.CHANGE_EVENT);
	},

	getId: function getId() {
		return _product._id;
	},

	getCode: function getCode() {
		return _product.code;
	},

	getName: function getName() {
		return _product.name;
	},

	getPrice: function getPrice() {
		return _product.price;
	},

	getSupplier: function getSupplier() {
		return _product.supplier;
	},

	loadData: function loadData(product) {
		if (product != null) {
			if (typeof product._id != "undefined") {
				_product._id = product._id;
			}
			if (typeof product.code != "undefined") {
				this.setCode(product.code);
			}
			if (typeof product.name != "undefined") {
				this.setName(product.name);
			}
			if (typeof product.price != "undefined") {
				this.setPrice(product.price);
			}
			if (typeof product.supplier != "undefined") {
				this.setSupplier(product.supplier);
			}
		}
		this.emitChange();
	},

	removeChangeListener: function removeChangeListener(callback) {
		this.removeListener(ProductConstants.CHANGE_EVENT, callback);
	},

	setCode: function setCode(code) {
		_product.code = code;
	},

	setName: function setName(name) {
		_product.name = name;
	},

	setPrice: function setPrice(price) {
		_product.price = price;
	},

	setSupplier: function setSupplier(supplier) {
		_product.supplier = supplier;
	}
});

ProductStore.dispatchToken = AppDispatcher.register(function (payload) {
	var action = payload.action;
	switch (action.actionType) {
		case ProductConstants.UPDATE_PRODUCT:
			ProductStore.loadData(action.product);
			break;
		case ProductConstants.UPDATE_PRODUCT_CODE:
			ProductStore.setCode(action.code);
			ProductStore.emitChange();
			break;
		case ProductConstants.UPDATE_PRODUCT_NAME:
			ProductStore.setName(action.name);
			ProductStore.emitChange();
			break;
		case ProductConstants.SELECT_PRODUCT_SUPPLIER:
			ProductStore.setSupplier(action.supplier);
			ProductStore.emitChange();
			break;
		case ProductConstants.UPDATE_PRODUCT_PRICE:
			ProductStore.setPrice(action.price);
			ProductStore.emitChange();
			break;
		default:
		// do nothing
	}
});

module.exports = ProductStore;