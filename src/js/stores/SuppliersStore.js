var AppDispatcher = require("../dispatcher/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("../constants/AppConstants");
var assign = require("object-assign");

var _suppliers = [];

var SuppliersStore = assign({}, EventEmitter.prototype, {
	emitChange: function() {
		this.emit(AppConstants.CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(AppConstants.CHANGE_EVENT, callback);
	},

	getSuppliers: function() {
		return _suppliers;
	},

	updateSuppliers: function(items) {
		_suppliers = items;
	}
});

SuppliersStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case AppConstants.UPDATE_LIST:
			SuppliersStore.updateSuppliers(action.list.rows);
			SuppliersStore.emitChange();
			break;
		default:
			// do nothing
	}
});

module.exports = SuppliersStore;