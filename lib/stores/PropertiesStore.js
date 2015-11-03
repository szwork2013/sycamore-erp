"use strict";

var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("../constants/AppConstants");
var assign = require("object-assign");

var _properties = [];

var PropertiesStore = assign({}, EventEmitter.prototype, {
	emitChange: function emitChange() {
		this.emit(AppConstants.CHANGE_EVENT);
	},

	addChangeListener: function addChangeListener(callback) {
		this.on(AppConstants.CHANGE_EVENT, callback);
	},

	getProperties: function getProperties() {
		return _properties;
	},

	updateProperties: function updateProperties(items) {
		_properties = items;
	}
});

PropertiesStore.dispatchToken = AppDispatcher.register(function (payload) {
	var action = payload.action;
	switch (action.actionType) {
		case AppConstants.UPDATE_PROPERTIES:
			PropertiesStore.updateProperties(action.list.rows);
			PropertiesStore.emitChange();
			break;
		default:
		// do nothing
	}
});

module.exports = PropertiesStore;