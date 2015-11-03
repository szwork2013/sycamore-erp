"use strict";

var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("../constants/AppConstants");
var assign = require("object-assign");

var _suppliers = [];

var SuppliersStore = assign({}, EventEmitter.prototype, {
	emitChange: function emitChange() {
		this.emit(AppConstants.CHANGE_EVENT);
	},

	addChangeListener: function addChangeListener(callback) {
		this.on(AppConstants.CHANGE_EVENT, callback);
	},

	getSuppliers: function getSuppliers() {
		return _suppliers;
	},

	updateSuppliers: function updateSuppliers(items) {
		_suppliers = items;
	}
});

SuppliersStore.dispatchToken = AppDispatcher.register(function (payload) {
	var action = payload.action;
	switch (action.actionType) {
		case AppConstants.UPDATE_SUPPLIERS:
			SuppliersStore.updateSuppliers(action.list.rows);
			SuppliersStore.emitChange();
			break;
		default:
		// do nothing
	}
});

module.exports = SuppliersStore;