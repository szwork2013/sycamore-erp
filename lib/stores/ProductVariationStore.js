"use strict";

var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var ProductVariationConstants = require("../constants/ProductVariationConstants");
var assign = require("object-assign");
var async = require("async");

var _productVariation = {
	_id: null,
	name: null
};

var ProductVariationStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function addChangeListener(callback) {
		this.on(ProductVariationConstants.CHANGE_EVENT, callback);
	},

	emitChange: function emitChange() {
		this.emit(ProductVariationConstants.CHANGE_EVENT);
	},

	getId: function getId() {
		return _productVariation._id;
	},

	getName: function getName() {
		return _productVariation.name;
	},

	getProductVariation: function getProductVariation() {
		var productVariation = {
			name: this.getName()
		};

		return productVariation;
	},

	loadData: function loadData(productVariation) {
		if (productVariation != null) {
			if (typeof productVariation._id != "undefined") {
				_productVariation._id = productVariation._id;
			}
			if (typeof productVariation.name != "undefined") {
				this.setName(productVariation.name);
			}
		}
		this.emitChange();
	},

	removeChangeListener: function removeChangeListener(callback) {
		this.removeListener(ProductVariationConstants.CHANGE_EVENT, callback);
	},

	setName: function setName(name) {
		_productVariation.name = name;
	}
});

ProductVariationStore.dispatchToken = AppDispatcher.register(function (payload) {
	var action = payload.action;
	switch (action.actionType) {
		case ProductVariationConstants.UPDATE_PRODUCT_VARIATION:
			ProductVariationStore.loadData(action.productVariation);
			break;
		case ProductVariationConstants.UPDATE_PRODUCT_VARIATION_NAME:
			ProductVariationStore.setName(action.name);
			ProductVariationStore.emitChange();
			break;
		default:
		// do nothing
	}
});

module.exports = ProductVariationStore;