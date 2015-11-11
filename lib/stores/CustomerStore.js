"use strict";

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
	addChangeListener: function addChangeListener(callback) {
		this.on(AppConstants.CHANGE_EVENT, callback);
	},

	emitChange: function emitChange() {
		this.emit(AppConstants.CHANGE_EVENT);
	},

	getBillingAddressLine1: function getBillingAddressLine1() {
		return _customer.billingAddress.line1;
	},

	getBillingAddressLine2: function getBillingAddressLine2() {
		return _customer.billingAddress.line2;
	},

	getBillingAddressLine3: function getBillingAddressLine3() {
		return _customer.billingAddress.line3;
	},

	getBillingAddressLine4: function getBillingAddressLine4() {
		return _customer.billingAddress.line4;
	},

	getBillingAddressPostCode: function getBillingAddressPostCode() {
		return _customer.billingAddress.postCode;
	},

	getEmail: function getEmail() {
		return _customer.email;
	},

	getId: function getId() {
		return _customer._id;
	},

	getName: function getName() {
		return _customer.name;
	},

	getTelephone: function getTelephone() {
		return _customer.telephone;
	},

	removeChangeListener: function removeChangeListener(callback) {
		this.removeListener(AppConstants.CHANGE_EVENT, callback);
	},

	setBillingAddressLine1: function setBillingAddressLine1(line1) {
		_customer.billingAddress.line1 = line1;
	},

	setBillingAddressLine2: function setBillingAddressLine2(line2) {
		_customer.billingAddress.line2 = line2;
	},

	setBillingAddressLine3: function setBillingAddressLine3(line3) {
		_customer.billingAddress.line3 = line3;
	},

	setBillingAddressLine4: function setBillingAddressLine4(line4) {
		_customer.billingAddress.line4 = line4;
	},

	setBillingAddressPostCode: function setBillingAddressPostCode(postCode) {
		_customer.billingAddress.postCode = postCode;
	},

	setEmail: function setEmail(email) {
		_customer.email = email;
	},

	setName: function setName(name) {
		_customer.name = name;
	},

	setTelephone: function setTelephone(telephone) {
		_customer.telephone = telephone;
	}

});

CustomerStore.dispatchToken = AppDispatcher.register(function (payload) {
	var action = payload.action;
	switch (action.actionType) {
		default:
		// do nothing
	}
});

module.exports = CustomerStore;