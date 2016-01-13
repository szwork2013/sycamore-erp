"use strict";

var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var OrderConstants = require("../constants/OrderConstants");
var assign = require("object-assign");
var async = require("async");
var moment = require("moment");

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
		date: moment(),
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
	total: 0,
	terms: {
		orderCorrectAgreed: false,
		propertyTidyAgreed: false,
		noticeAgreed: false,
		paymentAgreed: false
	}
};

var OrderStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function addChangeListener(callback) {
		this.on(OrderConstants.CHANGE_EVENT, callback);
	},

	addProduct: function addProduct() {
		_order.products.push({
			name: "",
			quantity: 1,
			price: 0,
			VAT: 0,
			total: 0
		});

		//		this.calculateTotals(callback);
	},

	calculateTotals: function calculateTotals(callback) {
		//		var subTotal = 0;
		var VAT = 0;
		// Calculate SubTotal
		/*
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
  */
		// Set SubTotal
		//				_order.subTotal = Math.round(subTotal * 100) / 100;
		// Calculate VAT
		this.setVAT(_order.subTotal * 1.2 - _order.subTotal);
		// Calculate Total
		this.setTotal(_order.subTotal + _order.total);
		/*
  				callback();
  			}
  		);
  */
	},

	emitChange: function emitChange() {
		this.emit(OrderConstants.CHANGE_EVENT);
	},

	getState: function getState() {
		return _order;
	},

	loadData: function loadData(order) {
		if (order != null) {
			_order = order;
			this.emitChange();
		}
	},

	removeChangeListener: function removeChangeListener(callback) {
		this.removeListener(OrderConstants.CHANGE_EVENT, callback);
	},

	setBillingAddressLine1: function setBillingAddressLine1(line1) {
		_order.billing.address.line1 = line1;
	},

	setBillingAddressLine2: function setBillingAddressLine2(line2) {
		_order.billing.address.line2 = line2;
	},

	setBillingAddressLine3: function setBillingAddressLine3(line3) {
		_order.billing.address.line3 = line3;
	},

	setBillingAddressLine4: function setBillingAddressLine4(line4) {
		_order.billing.address.line4 = line4;
	},

	setBillingAddressPostCode: function setBillingAddressPostCode(postCode) {
		_order.billing.address.postCode = postCode;
	},

	setBillingCompanyName: function setBillingCompanyName(companyName) {
		_order.billing.companyName = companyName;
	},

	setBillingCustomerName: function setBillingCustomerName(customerName) {
		_order.billing.customerName = customerName;
	},

	setBillingEmail: function setBillingEmail(email) {
		_order.billing.email = email;
	},

	setBillingTelephone: function setBillingTelephone(telephone) {
		_order.billing.telephone = telephone;
	},

	setDateAccepted: function setDateAccepted(date) {
		_order.dateAccepted = moment(date).toDate();
	},

	setDeliveryAccessArrangements: function setDeliveryAccessArrangements(accessArrangements) {
		_order.delivery.accessArrangements = accessArrangements;
	},

	setDeliveryAddressLine1: function setDeliveryAddressLine1(line1) {
		_order.delivery.address.line1 = line1;
	},

	setDeliveryAddressLine2: function setDeliveryAddressLine2(line2) {
		_order.delivery.address.line2 = line2;
	},

	setDeliveryAddressLine3: function setDeliveryAddressLine3(line3) {
		_order.delivery.address.line3 = line3;
	},

	setDeliveryAddressLine4: function setDeliveryAddressLine4(line4) {
		_order.delivery.address.line4 = line4;
	},

	setDeliveryAddressPostCode: function setDeliveryAddressPostCode(postCode) {
		_order.delivery.address.postCode = postCode;
	},

	setDeliveryDate: function setDeliveryDate(date) {
		_order.delivery.date = moment(date);
	},

	setDeliveryTelephone: function setDeliveryTelephone(telephone) {
		_order.delivery.telephone = telephone;
	},

	setProductName: function setProductName(productIndex, value) {
		_order.products[productIndex].name = value;
	},

	setProductQuantity: function setProductQuantity(productIndex, value) {
		_order.products[productIndex].quantity = value;
	},

	setStatus: function setStatus(status) {
		_order.status = status;
	},

	setSubTotal: function setSubTotal(subTotal) {
		_order.subTotal = parseFloat(Math.round(subTotal * 100) / 100);
	},

	setTotal: function setTotal(total) {
		_order.total = parseFloat(Math.round(total * 100) / 100);
	},

	setVAT: function setVAT(VAT) {
		_order.VAT = parseFloat(Math.round(VAT * 100) / 100);
	},

	setOrderCorrect: function setOrderCorrect(value) {
		_order.terms.orderCorrectAgreed = value;
	},

	setPropertyTidy: function setPropertyTidy(value) {
		_order.terms.propertyTidyAgreed = value;
	},

	setNoticeAgreed: function setNoticeAgreed(value) {
		_order.terms.noticeAgreed = value;
	},

	setPaymentAgreed: function setPaymentAgreed(value) {
		_order.terms.paymentAgreed = value;
	}
});

OrderStore.dispatchToken = AppDispatcher.register(function (payload) {
	var action = payload.action;
	switch (action.actionType) {
		case OrderConstants.UPDATE_ORDER:
			OrderStore.loadData(action.order);
			OrderStore.calculateTotals();
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
		case OrderConstants.SET_DATE_ACCEPTED:
			OrderStore.setDateAccepted(action.date);
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

		case OrderConstants.SET_PRODUCT_NAME_ON_ORDER:
			OrderStore.setProductName(action.productIndex, action.value);
			OrderStore.emitChange();
			break;
		case OrderConstants.SET_SUBTOTAL:
			OrderStore.setSubTotal(action.subTotal);
			OrderStore.calculateTotals();
			OrderStore.emitChange();
			break;
		case OrderConstants.SET_VAT:
			OrderStore.setVAT(action.VAT);
			OrderStore.emitChange();
			break;
		case OrderConstants.SET_TOTAL:
			OrderStore.setTotal(action.total);
			OrderStore.emitChange();
			break;
		case OrderConstants.SET_ORDER_CORRECT:
			OrderStore.setOrderCorrect(action.value);
			OrderStore.emitChange();
			break;
		case OrderConstants.SET_PROPERTY_TIDY:
			OrderStore.setPropertyTidy(action.value);
			OrderStore.emitChange();
			break;
		case OrderConstants.SET_NOTICE_AGREED:
			OrderStore.setNoticeAgreed(action.value);
			OrderStore.emitChange();
			break;
		case OrderConstants.SET_PAYMENT_AGREED:
			OrderStore.setPaymentAgreed(action.value);
			OrderStore.emitChange();
			break;

		default:
		// do nothing
	}
});

module.exports = OrderStore;