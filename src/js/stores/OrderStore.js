var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var OrderConstants = require("../constants/OrderConstants");
var assign = require("object-assign");
var async = require("async");

//var CustomerStore = require("./CustomerStore");
//var PropertyStore = require("./PropertyStore");

var _order = {
	_id: null,
	status: "Draft",
	billing: {
		customerName: null,
		companyName: null,
		telephone: null,
		email: null,
		address: {
			line1: null,
			line2: null,
			line3: null,
			line4: null,
			postCode: null
		}
	},
	delivery: {
		date: null,
		telephone: null,
		accessArrangements: null,
		address: {
			line1: null,
			line2: null,
			line3: null,
			line4: null,
			postCode: null
		}
	},
	products: [],
	discounts: [],
	additionalCharges: [],
	subTotal: 0,
	VAT: 0,
	total: 0
};

var OrderStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(OrderConstants.CHANGE_EVENT, callback);
	},

	addProduct: function() {
		_order.products.push({
			name: "",
			quantity: 1,
			price: 0,
			VAT: 0,
			total: 0
		});

//		this.calculateTotals(callback);
	},
/*
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
*/
	emitChange: function() {
		this.emit(OrderConstants.CHANGE_EVENT);
	},

	getState: function() {
		return _order;
	},

	loadData: function(order) {
		if(order != null) {
			_order = order;
			this.emitChange();
		}
	},

	removeChangeListener: function(callback) {
		this.removeListener(OrderConstants.CHANGE_EVENT, callback);
	},

	setProductQuantity: function(productIndex, value) {
		_order.products[productIndex].quantity = value;
//		this.calculateTotals(callback);
	},

	setBillingAddressLine1(line1) {
		_order.billing.address.line1;
	},

	setBillingAddressLine2(line2) {
		_order.billing.address.line2;
	},

	setBillingAddressLine3(line3) {
		_order.billing.address.line3;
	},

	setBillingAddressLine4(line4) {
		_order.billing.address.line4;
	},

	setBillingAddressPostCode(postCode) {
		_order.billing.address.postCode;
	},

	setBillingCompanyName(companyName) {
		_order.billing.companyName;
	},

	setBillingCustomerName(customerName) {
		_order.billing.customerName;
	},

	setBillingEmail(email) {
		_order.billing.email;
	},

	setBillingTelephone(telephone) {
		_order.billing.telephone;
	},

	setDeliveryAccessArrangements(accessArrangements) {
		_order.delivery.accessArrangements;
	},

	setDeliveryAddressLine1(line1) {
		_order.delivery.address.line1;
	},

	setDeliveryAddressLine2(line2) {
		_order.delivery.address.line2;
	},

	setDeliveryAddressLine3(line3) {
		_order.delivery.address.line3;
	},

	setDeliveryAddressLine4(line4) {
		_order.delivery.address.line4;
	},

	setDeliveryAddressPostCode(postCode) {
		_order.delivery.address.postCode;
	},

	setDeliveryDate: function(date) {
		_order.delivery.date = date;
	},

	setDeliveryTelephone(telephone) {
		_order.delivery.telephone;
	},

	setStatus: function(status) {
		_order.status = status;
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
			OrderStore.addProduct();
			OrderStore.emitChange();
		break;
		case OrderConstants.SET_PRODUCT_QUANTITY_ON_ORDER:
			OrderStore.setProductQuantity(action.productIndex, action.value);
			OrderStore.emitChange();
		break;
		case OrderConstants.SET_STATUS:
			OrderStore.setStatus(action.status);
			OrderStore.emitChange();
		break;
		case OrderConstants.SET_DELIVERY_DATE:
			OrderStore.setDeliveryDate(action.date);
			OrderStore.emitChange();
		break;
		case OrderConstants.UPDATE_BILLING_CUSTOMER_NAME:
			OrderStore.setBillingCustomerName(action.customerName);
			OrderStore.emitChange();
		break;
		case OrderConstants.UPDATE_BILLING_COMPANY_NAME:
			OrderStore.setBillingCompanyName(action.companyName);
			OrderStore.emitChange();
		break;
		case OrderConstants.UPDATE_BILLING_ADDRESS_LINE1:
			OrderStore.setBillingAddressLine1(action.line1);
			OrderStore.emitChange();
		break;
		case OrderConstants.UPDATE_BILLING_ADDRESS_LINE2:
			OrderStore.setBillingAddressLine2(action.line2);
			OrderStore.emitChange();
		break;
		case OrderConstants.UPDATE_BILLING_ADDRESS_LINE3:
			OrderStore.setBillingAddressLine3(action.line3);
			OrderStore.emitChange();
		break;
		case OrderConstants.UPDATE_BILLING_ADDRESS_LINE4:
			OrderStore.setBillingAddressLine4(action.line4);
			OrderStore.emitChange();
		break;
		case OrderConstants.UPDATE_BILLING_ADDRESS_POSTCODE:
			OrderStore.setBillingAddressPostCode(action.postCode);
			OrderStore.emitChange();
		break;
		case OrderConstants.UPDATE_BILLING_EMAIL:
			OrderStore.setBillingEmail(action.email);
			OrderStore.emitChange();
		break;
		case OrderConstants.UPDATE_BILLING_TELEPHONE:
			OrderStore.setBillingTelephone(action.telephone);
			OrderStore.emitChange();
		break;
		case OrderConstants.UPDATE_DELIVERY_ACCESS_ARRANGEMENTS:
			OrderStore.setDeliveryAccessArrangements(action.accessArrangements);
			OrderStore.emitChange();
		break;
		case OrderConstants.UPDATE_DELIVERY_ADDRESS_LINE1:
			OrderStore.setDeliveryAddressLine1(action.line1);
			OrderStore.emitChange();
		break;
		case OrderConstants.UPDATE_DELIVERY_ADDRESS_LINE2:
			OrderStore.setDeliveryAddressLine2(action.line2);
			OrderStore.emitChange();
		break;
		case OrderConstants.UPDATE_DELIVERY_ADDRESS_LINE3:
			OrderStore.setDeliveryAddressLine3(action.line3);
			OrderStore.emitChange();
		break;
		case OrderConstants.UPDATE_DELIVERY_ADDRESS_LINE4:
			OrderStore.setDeliveryAddressLine4(action.line4);
			OrderStore.emitChange();
		break;
		case OrderConstants.UPDATE_DELIVERY_ADDRESS_POSTCODE:
			OrderStore.setDeliveryAddressPostCode(action.postCode);
			OrderStore.emitChange();
		break;
		case OrderConstants.UPDATE_DELIVERY_TELEPHONE:
			OrderStore.setDeliveryTelephone(action.telephone);
			OrderStore.emitChange();
		break;

		default:
			// do nothing
	}
});

module.exports = OrderStore;