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

	addProduct: function addProduct(product, callback) {
		product.quantity = 1;

		_order.products.push(product);

		this.calculateTotals(callback);
	},

	calculateTotals: function calculateTotals(callback) {
		var subTotal = 0;
		var VAT = 0;
		// Calculate SubTotal
		async.eachSeries(_order.products, function (product, callback) {
			product.subTotal = Math.round(product.quantity * product.price * 100) / 100;
			product.VAT = Math.round((product.subTotal * 1.2 - product.subTotal) * 100) / 100;
			product.total = Math.round((product.subTotal + product.VAT) * 100) / 100;

			subTotal = subTotal + product.subtotal;
			VAT = VAT + product.VAT;
			callback();
		}, function (error) {
			// Set SubTotal
			_order.subTotal = Math.round(subTotal * 100) / 100;
			// Calculate VAT
			_order.VAT = Math.round(VAT * 100) / 100;
			// Calculate Total
			_order.total = Math.round((_order.subTotal + _order.VAT) * 100) / 100;

			callback();
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

	setProductQuantity: function setProductQuantity(productIndex, value, callback) {
		_order.products[productIndex].quantity = value;
		this.calculateTotals(callback);
	}
});

OrderStore.dispatchToken = AppDispatcher.register(function (payload) {
	var action = payload.action;
	switch (action.actionType) {
		case AppConstants.ADD_PRODUCT_TO_ORDER:
			OrderStore.addProduct(action.product, function () {
				OrderStore.emitChange();
			});
			break;
		case AppConstants.SET_CUSTOMER_ON_ORDER:
			OrderStore.setCustomer(action.customer);
			OrderStore.emitChange();
			break;
		case AppConstants.SET_PRODUCT_QUANTITY_ON_ORDER:
			OrderStore.setProductQuantity(action.productIndex, action.value, function () {
				OrderStore.emitChange();
			});
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