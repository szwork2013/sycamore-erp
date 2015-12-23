var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var QuoteConstants = require("../constants/QuoteConstants");
var assign = require("object-assign");
var async = require("async");

var CustomerStore = require("./CustomerStore");
var PropertyStore = require("./PropertyStore");

var _quote = {
	_id: null,
	status: null,
	deliveryDate: null,
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

var QuoteStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(QuoteConstants.CHANGE_EVENT, callback);
	},

	addProduct: function(product, callback) {
		_quote.products.push({
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
			_quote.products,
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
				_quote.subTotal = Math.round(subTotal * 100) / 100;
// Calculate VAT
				_quote.VAT = Math.round((VAT) * 100) / 100;
// Calculate Total
				_quote.total = Math.round((_quote.subTotal + _quote.VAT) * 100) / 100;

				callback();
			}
		);
	},

	emitChange: function() {
		this.emit(QuoteConstants.CHANGE_EVENT);
	},

	getId: function() {
		return _quote._id;
	},

	getCustomer: function() {
		return CustomerStore.getCustomer();
	},

	getDeliveryDate: function() {
		return _quote.deliveryDate;
	},

	getQuote: function(callback) {
		var quote,
			id,
			products;

		quote = {
			customer: CustomerStore.getId(),
			property: PropertyStore.getId(),
			products: [],
			subTotal: this.getSubTotal(),
			VAT: this.getVAT(),
			total: this.getTotal()
		};

		id = this.getId();
		if(id != null) {
			quote._id = id;
		}

		async.eachSeries(
			this.getProducts(),
			function(product, callback) {
				quote.products.push({
					product: product.product._id,
					quantity: product.quantity,
					subTotal: product.subTotal,
					VAT: product.VAT,
					total: product.total
				});
				callback();
			},
			function(error) {
				callback(error, quote);
			}
		);
	},

	getProducts: function() {
		return _quote.products;
	},

	getProperty: function() {
		return PropertyStore.getProperty();
	},

	getSubTotal: function() {
		return _quote.subTotal;
	},

	getStatus: function() {
		return _quote.status;
	},

	getTotal: function() {
		return _quote.total;
	},

	getVAT: function() {
		return _quote.VAT;
	},

	loadData: function(quote) {
		if(quote != null) {
			_quote = quote;
			if(	(typeof quote.customer !== "undefined") && (typeof quote.customer === "object") ) {
				CustomerStore.loadData(quote.customer);
			}
			if(	(typeof quote.property !== "undefined") && (typeof quote.property === "object") ) {
				PropertyStore.loadData(quote.property);
			}
			this.emitChange();
		}
	},

	removeChangeListener: function(callback) {
		this.removeListener(QuoteConstants.CHANGE_EVENT, callback);
	},

	setCustomer: function(customer) {
		CustomerStore.loadData(customer);
	},

	setDeliveryDate: function(deliveryDate) {
		_quote.deliveryDate = deliveryDate;
	},

	setProducts: function(products) {
		_quote.products = products
	},

	setProperty: function(property) {
		PropertyStore.loadData(customer);
	},

	setProductQuantity: function(productIndex, value, callback) {
		_quote.products[productIndex].quantity = value;
		this.calculateTotals(callback);
	},

	setStatus: function(status) {
		_quote.status = status;
	},

	setSubTotal: function(subTotal) {
		_quote.subTotal = subTotal;
	},

	setTotal: function(total) {
		_quote.total = total;
	},

	setVAT: function(VAT) {
		_quote.VAT = VAT;
	}
});

QuoteStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case QuoteConstants.UPDATE_QUOTE:
			QuoteStore.loadData(action.quote);
		break;
		case QuoteConstants.ADD_PRODUCT_TO_QUOTE:
			QuoteStore.addProduct(action.product, function() {
				QuoteStore.emitChange();
			});
		break;
		case QuoteConstants.SET_CUSTOMER_ON_QUOTE:
			QuoteStore.setCustomer(action.customer);
			QuoteStore.emitChange();
		break;
		case QuoteConstants.SET_DELIVERY_DATE:
			QuoteStore.setDeliveryDate(action.date);
			QuoteStore.emitChange();
		break;
		case QuoteConstants.SET_PRODUCT_QUANTITY_ON_QUOTE:
			QuoteStore.setProductQuantity(action.productIndex, action.value, function() {
				QuoteStore.emitChange();
			});
		break;
		case QuoteConstants.SET_PROPERTY_ON_QUOTE:
			QuoteStore.setProperty(action.property);
			QuoteStore.emitChange();
		break;
		case QuoteConstants.SET_STATUS:
			QuoteStore.setStatus(action.status);
			QuoteStore.emitChange();
		break;
		default:
			// do nothing
	}
});

module.exports = QuoteStore;