var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var ProductVariationGroupConstants = require("../constants/ProductVariationGroupConstants");
var assign = require("object-assign");

var _productVariationGroups = [];

var ProductVariationsStore = assign({}, EventEmitter.prototype, {
	emitChange: function() {
		this.emit(ProductVariationConstants.CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(ProductVariationGroupConstants.CHANGE_EVENT, callback);
	},

	getProductVariationGroups: function() {
		return _productVariationGroups;
	},

	updateProductVariationGroups: function(items) {
		_productVariationGroups = items;
	}
});

ProductVariationsStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case ProductVariationConstants.UPDATE_PRODUCT_VARIATION_GROUPS:
			ProductVariationsStore.updateProductVariationGroups(action.list.rows);
			ProductVariationsStore.emitChange();
			break;
		default:
			// do nothing
	}
});

module.exports = ProductVariationsStore;