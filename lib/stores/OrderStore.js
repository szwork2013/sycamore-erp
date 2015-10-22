"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("../constants/AppConstants");
var assign = require("object-assign");
var async = require("async");

var _order = {
	_id: null,
	customer: {},
	property: {},
	products: [],
	subTotal: 0,
	VAT: 0,
	total: 0
};

var OrderStore = assign({}, EventEmitter.prototype, {
	emitChange: function emitChange() {
		this.emit(AppConstants.CHANGE_EVENT);
	},

	addChangeListener: function addChangeListener(callback) {
		this.on(AppConstants.CHANGE_EVENT, callback);
	},

	addProduct: function addProduct(product) {
		product.quantity = 1;
		product.total = product.quantity * product.price;

		_order.products.push(product);
		this.calculateTotals();
	},

	calculateTotals: function calculateTotals() {
		var subTotal = 0;
		// Calculate SubTotal
		async.eachSeries(_order.products, function (product, callback) {
			subTotal = subTotal + product.quantity * product.price;
			callback();
		}, function (error) {
			// Calculate VAT
			_order.VAT = _order.subTotal * 1.2 - _order.subTotal;
			// Calculate Total
			_order.total = _order.subTotal * +_order.VAT;
		});
	},

	getOrder: function getOrder() {
		return _order;
	},

	setCustomer: function setCustomer(customer) {
		_order.customer = customer;
	},

	setProperty: function setProperty(property) {
		_order.property = property;
	},

	setProductQuantity: function setProductQuantity(productIndex, value) {
		_order.products[productIndex].quantity = value;
		this.calculateTotals();
	}
});

OrderStore.dispatchToken = AppDispatcher.register(function (payload) {
	var action = payload.action;
	switch (action.actionType) {
		case AppConstants.ADD_PRODUCT_TO_ORDER:
			OrderStore.addProduct(action.product);
			OrderStore.emitChange();
			break;
		case AppConstants.SET_CUSTOMER_ON_ORDER:
			OrderStore.setCustomer(action.customer);
			OrderStore.emitChange();
			break;
		case AppConstants.SET_PRODUCT_QUANTITY_ON_ORDER:
			OrderStore.setProductQuantity(action.productIndex, action.value);
			OrderStore.emitChange();
			break;
		case AppConstants.SET_PROPERTY_ON_ORDER:
			OrderStore.setProperty(action.property);
			OrderStore.emitChange();
			break;
		default:
		// do nothing
	}
});

module.exports = OrderStore;