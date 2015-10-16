var AppDispatcher = require("../dispatcher/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("../constants/AppConstants");
var assign = require("object-assign");

var _suppliersStore = {
	isLoading: false,
	suppliers: [],
	value: null
};

var SuppliersStore = assign({}, EventEmitter.prototype, {
	emitChange: function() {
		this.emit(AppConstants.CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(AppConstants.CHANGE_EVENT, callback);
	},

	getInitialState: function() {
		return _suppliersStore;
	},

	getSuppliers: function() {
		return _suppliersStore.suppliers;
	},

	updateSuppliers: function(items) {
		_suppliersStore.suppliers = items;
	}
});

SuppliersStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case AppConstants.UPDATE_SUPPLIERS:
			SuppliersStore.updateSuppliers(action.items);
			SuppliersStore.emitChange();
			break;
		default:
			// do nothing
	}
});

module.exports = SuppliersStore;