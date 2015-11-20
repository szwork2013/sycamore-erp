"use strict";

var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var SupplierConstants = require("../constants/SupplierConstants");
var assign = require("object-assign");

var _suppliers = [];

var SuppliersStore = assign({}, EventEmitter.prototype, {
	emitChange: function emitChange() {
		this.emit(SupplierConstants.CHANGE_EVENT);
	},

	addChangeListener: function addChangeListener(callback) {
		this.on(SupplierConstants.CHANGE_EVENT, callback);
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
		case SupplierConstants.UPDATE_SUPPLIERS:
			SuppliersStore.updateSuppliers(action.list.rows);
			SuppliersStore.emitChange();
			break;
		default:
		// do nothing
	}
});

module.exports = SuppliersStore;