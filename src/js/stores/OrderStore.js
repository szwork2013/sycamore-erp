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
	emitChange: function() {
		this.emit(AppConstants.CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(AppConstants.CHANGE_EVENT, callback);
	},

	addProduct: function(product) {
		product.quantity = 1;
		product.subTotal = product.quantity * product.price;

		_order.products.push(product);
		this.calculateSubTotal();
	},

	calculateSubTotal: function() {
		var subTotal = 0;
		async.eachSeries(
			_order.products,
			function(product, callback) {
				subTotal = subTotal + product.quantity * product.price;
				callback();
			},
			function(error) {
				this.calculateVAT();
				this.calculateTotal();
			}
		);
	},

	calculateVAT: function() {
		_order.VAT = (_order.subTotal * 1.2) - _order.subTotal;
	},

	calculateTotal: function() {
		_order.total = _order.subTotal * +_order.VAT;
	},

	getOrder: function() {
		return _order;
	},

	setCustomer: function(customer) {
		_order.customer = customer;
	},

	setProperty: function(property) {
		_order.property = property;
	}
});

OrderStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case AppConstants.ADD_PRODUCT_TO_ORDER:
			OrderStore.addProduct(action.product);
			OrderStore.emitChange();
			break;
		case AppConstants.SET_CUSTOMER_ON_ORDER:
			OrderStore.setCustomer(customer);
			OrderStore.emitChange();
			break;
		case AppConstants.SET_PROPERTY_ON_ORDER:
			OrderStore.setProperty(property);
			OrderStore.emitChange();
			break;
		default:
			// do nothing
	}
});

module.exports = OrderStore;