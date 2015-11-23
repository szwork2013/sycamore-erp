var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var ProductVariationConstants = require("../constants/ProductVariationConstants");
var assign = require("object-assign");

var _suppliers = [];

var ProductVariationsStore = assign({}, EventEmitter.prototype, {
	emitChange: function() {
		this.emit(ProductVariationConstants.CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(ProductVariationConstants.CHANGE_EVENT, callback);
	},

	getProductVariations: function() {
		return _suppliers;
	},

	updateProductVariations: function(items) {
		_suppliers = items;
	}
});

ProductVariationsStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case ProductVariationConstants.UPDATE_PRODUCT_VARIATIONS:
			ProductVariationsStore.updateProductVariations(action.list.rows);
			ProductVariationsStore.emitChange();
			break;
		default:
			// do nothing
	}
});

module.exports = ProductVariationsStore;