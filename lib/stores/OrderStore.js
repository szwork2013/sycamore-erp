"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("../constants/AppConstants");
var assign = require("object-assign");
var async = require("async");

var _order = {
	_id: null,
	customer: null,
	property: null,
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
		_order.products.push(product);
		calculateSubTotal();
	},

	calculateSubTotal: function calculateSubTotal() {
		var subTotal = 0;
		async.eachSeries(_order.products, function (product, callback) {
			subTotal = subTotal + product.quantity * product.price;
			callback();
		}, function (error) {
			calculateVAT();
			calculateTotal();
		});
	},

	calculateVAT: function calculateVAT() {
		_order.VAT = _order.subTotal * 1.2 - _order.subTotal;
	},

	calculateTotal: function calculateTotal() {
		_order.total = _order.subTotal * +_order.VAT;
	},

	getOrder: function getOrder() {
		return _order;
	},

	setCustomer: function setCustomer(customer) {
		_order.customer = customer;
	},

	setProperty: function setProperty(property) {
		_order.property = property;
	}
});

OrderStore.dispatchToken = AppDispatcher.register(function (payload) {
	var action = payload.action;
	switch (action.actionType) {
		default:
		// do nothing
	}
});

module.exports = OrderStore;