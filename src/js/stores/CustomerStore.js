var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var CustomerConstants = require("../constants/CustomerConstants");
var assign = require("object-assign");
var async = require("async");

var _customer = {
	_id: null,
	name: null,
	billingAddress: {
		line1: null,
		line2: null,
		line3: null,
		line4: null,
		postCode: null
	},
	telephone: null,
	email: null
};

var CustomerStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CustomerConstants.CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CustomerConstants.CHANGE_EVENT);
	},

	getBillingAddressLine1: function() {
		return _customer.billingAddress.line1;
	},

	getBillingAddressLine2: function() {
		return _customer.billingAddress.line2;
	},

	getBillingAddressLine3: function() {
		return _customer.billingAddress.line3;
	},

	getBillingAddressLine4: function() {
		return _customer.billingAddress.line4;
	},

	getBillingAddressPostCode: function() {
		return _customer.billingAddress.postCode;
	},

	getCustomer: function() {
		return _customer;
	},

	getEmail: function() {
		return _customer.email;
	},

	getId: function() {
		return _customer._id;
	},

	getName: function() {
		return _customer.name;
	},

	getTelephone: function() {
		return _customer.telephone;
	},

	loadData: function(customer) {
		console.log(customer);
		if(customer != null) {
			if(typeof(customer._id) != "undefined") {
				_customer._id = customer._id;
			}
			if(typeof(customer.name) != "undefined") {
				this.setName(customer.name);
			}
			if(typeof(customer.billingAddress) != "undefined") {
				if(typeof(customer.billingAddress.line1) != "undefined") {
					this.setBillingAddressLine1(customer.billingAddress.line1);
				}
				if(typeof(customer.billingAddress.line2) != "undefined") {
					this.setBillingAddressLine2(customer.billingAddress.line2);
				}
				if(typeof(customer.billingAddress.line3) != "undefined") {
					this.setBillingAddressLine3(customer.billingAddress.line3);
				}
				if(typeof(customer.billingAddress.line4) != "undefined") {
					this.setBillingAddressLine4(customer.billingAddress.line4);
				}
				if(typeof(customer.billingAddress.postCode) != "undefined") {
					this.setBillingAddressPostCode(customer.billingAddress.postCode);
				}
			}
			if(typeof(customer.telephone) != "undefined") {
				this.setTelephone(customer.telephone);
			}
			if(typeof(customer.email) != "undefined") {
				this.setEmail(customer.email);
			}

			this.emitChange();
		}
	},

	removeChangeListener: function(callback) {
		console.log("removeChangeListener");
		this.removeListener(CustomerConstants.CHANGE_EVENT, callback);
	},

	setBillingAddressLine1: function(line1) {
		_customer.billingAddress.line1 = line1;
	},

	setBillingAddressLine2: function(line2) {
		_customer.billingAddress.line2 = line2;
	},

	setBillingAddressLine3: function(line3) {
		_customer.billingAddress.line3 = line3;
	},

	setBillingAddressLine4: function(line4) {
		_customer.billingAddress.line4 = line4;
	},

	setBillingAddressPostCode: function(postCode) {
		_customer.billingAddress.postCode = postCode;
	},

	setEmail: function(email) {
		_customer.email = email;
	},

	setName: function(name) {
		_customer.name = name;
	},

	setTelephone: function(telephone) {
		_customer.telephone = telephone;
	}
});

CustomerStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case CustomerConstants.UPDATE_CUSTOMER:
			CustomerStore.loadData(action.customer);
		break;
		case CustomerConstants.UPDATE_CUSTOMER_NAME:
			CustomerStore.setName(action.name);
			CustomerStore.emitChange();
		break;
		case CustomerConstants.UPDATE_CUSTOMER_BILLING_ADDRESS_LINE1:
			CustomerStore.setBillingAddressLine1(action.line1);
			CustomerStore.emitChange();
		break;
		case CustomerConstants.UPDATE_CUSTOMER_BILLING_ADDRESS_LINE2:
			CustomerStore.setBillingAddressLine2(action.line2);
			CustomerStore.emitChange();
		break;
		case CustomerConstants.UPDATE_CUSTOMER_BILLING_ADDRESS_LINE3:
			CustomerStore.setBillingAddressLine3(action.line3);
			CustomerStore.emitChange();
		break;
		case CustomerConstants.UPDATE_CUSTOMER_BILLING_ADDRESS_LINE4:
			CustomerStore.setBillingAddressLine4(action.line4);
			CustomerStore.emitChange();
		break;
		case CustomerConstants.UPDATE_CUSTOMER_BILLING_ADDRESS_POSTCODE:
			CustomerStore.setBillingAddressPostCode(action.postCode);
			CustomerStore.emitChange();
		break;
		case CustomerConstants.UPDATE_CUSTOMER_TELEPHONE:
			CustomerStore.setTelephone(action.telephone);
			CustomerStore.emitChange();
		break;
		case CustomerConstants.UPDATE_CUSTOMER_EMAIL:
			CustomerStore.setEmail(action.email);
			CustomerStore.emitChange();
		break;
		default:
			// do nothing
	}
});

module.exports = CustomerStore;