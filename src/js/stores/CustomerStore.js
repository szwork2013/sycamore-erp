var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("../constants/AppConstants");
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
		this.on(AppConstants.CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(AppConstants.CHANGE_EVENT);
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

	removeChangeListener: function(callback) {
		this.removeListener(AppConstants.CHANGE_EVENT, callback);
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
		default:
			// do nothing
	}
});

module.exports = CustomerStore;