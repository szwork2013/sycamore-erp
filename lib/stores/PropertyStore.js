"use strict";

var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("../constants/AppConstants");
var assign = require("object-assign");
var async = require("async");

var _property = {
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

var PropertyStore = assign({}, EventEmitter.prototype, {
	emitChange: function emitChange() {
		this.emit(AppConstants.CHANGE_EVENT);
	},

	addChangeListener: function addChangeListener(callback) {
		this.on(AppConstants.CHANGE_EVENT, callback);
	},

	getProperty: function getProperty(property) {
		if (property) {
			_property = property;
		}
		return _property;
	},

	setName: function setName(name) {
		_property.name = name;
	},

	setEmail: function setEmail(email) {
		_property.email = email;
	},

	setTelephone: function setTelephone(telephone) {
		_property.telephone = telephone;
	}

});

PropertyStore.dispatchToken = AppDispatcher.register(function (payload) {
	var action = payload.action;
	switch (action.actionType) {
		default:
		// do nothing
	}
});

module.exports = PropertyStore;