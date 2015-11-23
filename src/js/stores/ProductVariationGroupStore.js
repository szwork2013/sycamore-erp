var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var ProductVariationGroupConstants = require("../constants/ProductVariationGroupConstants");
var assign = require("object-assign");
var async = require("async");

var _productVariationGroup = {
	_id: null,
	name: null
};

var ProductVariationGroupStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(ProductVariationGroupConstants.CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(ProductVariationGroupConstants.CHANGE_EVENT);
	},

	getId: function() {
		return _productVariationGroup._id;
	},

	getName: function() {
		return _productVariationGroup.name;
	},

	getProductVariationGroup: function() {
		var productVariationGroup = {
			name: this.getName()
		};
		
		return productVariationGroup;
	},

	loadData: function(productVariationGroup) {
		if(productVariationGroup != null) {
			if(typeof(productVariationGroup._id) != "undefined") {
				_productVariationGroup._id = productVariationGroup._id;
			}
			if(typeof(productVariationGroup.name) != "undefined") {
				this.setName(productVariationGroup.name);
			}
		}
		this.emitChange();
	},

	removeChangeListener: function(callback) {
		this.removeListener(ProductVariationGroupConstants.CHANGE_EVENT, callback);
	},

	setName: function(name) {
		_productVariationGroup.name = name;
	}
});

ProductVariationGroupStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case ProductVariationGroupConstants.UPDATE_PRODUCT_VARIATION_GROUP:
			ProductVariationGroupStore.loadData(action.productVariationGroup);
		break;
		case ProductVariationGroupConstants.UPDATE_PRODUCT_VARIATION_GROUP_NAME:
			ProductVariationGroupStore.setName(action.name);
			ProductVariationGroupStore.emitChange();
		break;
		default:
			// do nothing
	}
});

module.exports = ProductVariationGroupStore;