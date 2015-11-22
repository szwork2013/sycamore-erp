var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var OrderConstants = require("../constants/OrderConstants");
var assign = require("object-assign");
var async = require("async");

var _order = {
	_id: null,
	customer: {
		_id: null
	},
	property: {
		_id: null
	},
	products: [],
	subTotal: 0,
	VAT: 0,
	total: 0
};

var OrderStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(OrderConstants.CHANGE_EVENT, callback);
	},

	addProduct: function(product, callback) {
		_order.products.push({
			product: product,
			quantity: 1
		});

		this.calculateTotals(callback);
	},

	calculateTotals: function(callback) {
		var subTotal = 0;
		var VAT = 0;
// Calculate SubTotal
		async.eachSeries(
			_order.products,
			function(product, callback) {
				product.subTotal = Math.round((product.quantity * product.product.price) * 100) / 100;
				product.VAT = Math.round((((product.subTotal) * 1.2) - product.subTotal) * 100) / 100;
				product.total = Math.round((product.subTotal + product.VAT) * 100) / 100;

				subTotal = subTotal + product.subTotal;
				VAT = VAT + product.VAT;
				callback();
			},
			function(error) {
// Set SubTotal
				_order.subTotal = Math.round(subTotal * 100) / 100;
// Calculate VAT
				_order.VAT = Math.round((VAT) * 100) / 100;
// Calculate Total
				_order.total = Math.round((_order.subTotal + _order.VAT) * 100) / 100;

				callback();
			}
		);
	},

	emitChange: function() {
		this.emit(OrderConstants.CHANGE_EVENT);
	},

	getId: function() {
		return _order._id;
	},

	getCustomer: function() {
		return _order.customer;
	},

	getOrder: function() {
		var order,
			id,
			customer,
			property;

		order = {
			products: [],
			subTotal: this.getSubTotal(),
			VAT: this.getVAT(),
			total: this.getTotal()
		};

		id = this.getId();
		if(id != null) {
			order._id = id;
		}
		customer = this.getCustomer();
		if((customer !== null) && (typeof customer !== "object")) {
			if(typeof customer._id !== "undefined") {
				order.customer = customer._id;
			}
		}
		property = this.getProperty();
		if((property !== null) && (typeof property !== "object")) {
			if(typeof property._id !== "undefined") {
				order.property = property._id;
			}
		}

		products = this.getProducts();

		async.eachSeries(
			products,
			function(product, callback) {
				order.products.push({
					product: product.product._id,
					quantity: product.quantity,
					subTotal: product.subTotal,
					VAT: product.VAT,
					total: product.total
				});
				callback();
			},
			function(error) {
				return order;
			}
		);
	},

	getProducts: function() {
		return _order.products;
	},

	getProperty: function() {
		return _order.property;
	},

	getSubTotal: function() {
		return _order.subTotal;
	},

	getTotal: function() {
		return _order.total;
	},

	getVAT: function() {
		return _order.VAT;
	},

	loadData: function(order) {
		_order = order;
		this.emitChange();
	},

	setCustomer: function(customer) {
		_order.customer = customer;
	},

	setProducts: function(products) {
		_order.products = products
	},

	setProperty: function(property) {
		_order.property = property;
	},

	setProductQuantity: function(productIndex, value, callback) {
		_order.products[productIndex].quantity = value;
		this.calculateTotals(callback);
	},

	setSubTotal: function(subTotal) {
		_order.subTotal = subTotal;
	},

	setTotal: function(total) {
		_order.total = total;
	},

	setVAT: function(VAT) {
		_order.VAT = VAT;
	}
});

OrderStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case OrderConstants.UPDATE_ORDER:
			OrderStore.loadData(action.order);
		break;
		case OrderConstants.ADD_PRODUCT_TO_ORDER:
			OrderStore.addProduct(action.product, function() {
				OrderStore.emitChange();
			});
		break;
		case OrderConstants.SET_CUSTOMER_ON_ORDER:
			OrderStore.setCustomer(action.customer);
			OrderStore.emitChange();
		break;
		case OrderConstants.SET_PRODUCT_QUANTITY_ON_ORDER:
			OrderStore.setProductQuantity(action.productIndex, action.value, function() {
				OrderStore.emitChange();
			});
		break;
		case OrderConstants.SET_PROPERTY_ON_ORDER:
			OrderStore.setProperty(action.property);
			OrderStore.emitChange();
		break;
		default:
			// do nothing
	}
});

module.exports = OrderStore;