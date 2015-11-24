var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var ProductVariationGroupConstants = require("../constants/ProductVariationGroupConstants");
var assign = require("object-assign");

var _productVariationGroups = [];

var ProductVariationGroupsStore = assign({}, EventEmitter.prototype, {
	emitChange: function() {
		this.emit(ProductVariationGroupConstants.CHANGE_EVENT);
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

ProductVariationGroupsStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case ProductVariationGroupConstants.UPDATE_PRODUCT_VARIATION_GROUPS:
			ProductVariationGroupsStore.updateProductVariationGroups(action.list.rows);
			ProductVariationGroupsStore.emitChange();
			break;
		default:
			// do nothing
	}
});

module.exports = ProductVariationGroupsStore;