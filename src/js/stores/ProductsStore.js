var AppDispatcher = require("../dispatcher/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("../constants/AppConstants");
var assign = require("object-assign");

var _products = [];

var ProductsStore = assign({}, EventEmitter.prototype, {
	emitChange: function() {
		this.emit(AppConstants.CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(AppConstants.CHANGE_EVENT, callback);
	},

	getProducts: function() {
		return _products;
	},

	updateProducts: function(items) {
		_products = items;
	}
});

ProductsStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case AppConstants.UPDATE_PRODUCTS:
			ProductsStore.updateProducts(action.items);
			ProductsStore.emitChange();
			break;
		default:
			// do nothing
	}
});

module.exports = ProductsStore;