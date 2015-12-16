"use strict";

var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var ProductConstants = require("../constants/ProductConstants");
var assign = require("object-assign");

var _products = [];

var ProductsStore = assign({}, EventEmitter.prototype, {
	emitChange: function emitChange() {
		this.emit(ProductConstants.CHANGE_EVENT);
	},

	addChangeListener: function addChangeListener(callback) {
		this.on(ProductConstants.CHANGE_EVENT, callback);
	},

	getProducts: function getProducts() {
		return _products;
	},

	removeChangeListener: function removeChangeListener(callback) {
		this.removeListener(ProductConstants.CHANGE_EVENT, callback);
	},

	updateProducts: function updateProducts(items) {
		_products = items;
	}
});

ProductsStore.dispatchToken = AppDispatcher.register(function (payload) {
	var action = payload.action;
	switch (action.actionType) {
		case ProductConstants.UPDATE_PRODUCTS:
			ProductsStore.updateProducts(action.list.rows);
			ProductsStore.emitChange();
			break;
		default:
		// do nothing
	}
});

module.exports = ProductsStore;