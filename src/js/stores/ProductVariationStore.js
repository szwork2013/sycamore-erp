var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var ProductVariationConstants = require("../constants/ProductVariationConstants");
var assign = require("object-assign");
var async = require("async");

var _productVariation = {
	_id: null,
	label: null,
	name: null,
	values: []
};

var ProductVariationStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(ProductVariationConstants.CHANGE_EVENT, callback);
	},

	addValue: function() {
		_productVariation.values.push({ label: "", value: "" });
	},

	emitChange: function() {
		this.emit(ProductVariationConstants.CHANGE_EVENT);
	},

	getId: function() {
		return _productVariation._id;
	},

	getLabel: function() {
		return _productVariation.label;
	},

	getName: function() {
		return _productVariation.name;
	},

	getProductVariation: function() {
		var productVariation = {
			label: this.getLabel(),
			name: this.getName()
		};
		
		return productVariation;
	},

	getValues: function() {
		return _productVariation.values;
	},

	loadData: function(productVariation) {
		if(productVariation != null) {
			if(typeof(productVariation._id) != "undefined") {
				_productVariation._id = productVariation._id;
			}
			if(typeof(productVariation.name) != "undefined") {
				this.setName(productVariation.name);
			}
			if(typeof(productVariation.values) != "undefined") {
				this.setValues(productVariation.values);
			}
		}
		this.emitChange();
	},

	removeChangeListener: function(callback) {
		this.removeListener(ProductVariationConstants.CHANGE_EVENT, callback);
	},

	removeValue: function(valueIndex) {
		_productVariation.values.splice(valueIndex, -1);
	},

	setLabel: function(label) {
		_productVariation.label = label;
	},

	setName: function(name) {
		_productVariation.name = name;
	},

	setValues: function(values) {
		_productVariation.values = values;
	},

	updateLabel: function(valueIndex, label) {
		_productVariation.values[valueIndex].label = label;
	},

	updateValue: function(valueIndex, value) {
		_productVariation.values[valueIndex].value = value;
	}
});

ProductVariationStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case ProductVariationConstants.UPDATE_PRODUCT_VARIATION:
			ProductVariationStore.loadData(action.productVariation);
		break;
		case ProductVariationConstants.UPDATE_PRODUCT_VARIATION_LABEL:
			ProductVariationStore.setLabel(action.label);
			ProductVariationStore.emitChange();
		break;
		case ProductVariationConstants.UPDATE_PRODUCT_VARIATION_NAME:
			ProductVariationStore.setName(action.name);
			ProductVariationStore.emitChange();
		break;
		case ProductVariationConstants.ADD_PRODUCT_VARIATION_VALUE:
			ProductVariationStore.addValue();
			ProductVariationStore.emitChange();
		break;
		case ProductVariationConstants.REMOVE_PRODUCT_VARIATION_VALUE:
			ProductVariationStore.removeValue(action.valueIndex);
			ProductVariationStore.emitChange();
		break;
		case ProductVariationConstants.UPDATE_PRODUCT_VARIATION_LABEL:
			ProductVariationStore.updateLabel(action.valueIndex, action.label);
			ProductVariationStore.emitChange();
		break;
		case ProductVariationConstants.UPDATE_PRODUCT_VARIATION_VALUE:
			ProductVariationStore.updateValue(action.valueIndex, action.value);
			ProductVariationStore.emitChange();
		break;
		default:
			// do nothing
	}
});

module.exports = ProductVariationStore;