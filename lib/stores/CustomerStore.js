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
	emitChange: function emitChange() {
		this.emit(AppConstants.CHANGE_EVENT);
	},

	addChangeListener: function addChangeListener(callback) {
		this.on(AppConstants.CHANGE_EVENT, callback);
	},

	getCustomer: function getCustomer(customer) {
		if (customer) {
			_customer = customer;
		}
		return _customer;
	},

	setName: function setName(name) {
		_customer.name = name;
	},

	setEmail: function setEmail(email) {
		_customer.email = email;
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

module.exports = OrderStore;