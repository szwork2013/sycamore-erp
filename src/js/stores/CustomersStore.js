var AppDispatcher = require("../dispatcher/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("../constants/AppConstants");
var assign = require("object-assign");

var _customers = [];

var CustomersStore = assign({}, EventEmitter.prototype, {
	emitChange: function() {
		this.emit(AppConstants.CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(AppConstants.CHANGE_EVENT, callback);
	},

	getCustomers: function() {
		return _customers;
	},

	updateCustomers: function(items) {
		_customers = items;
	}
});

CustomersStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case AppConstants.UPDATE_CUSTOMERS:
			CustomersStore.updateCustomers(action.items);
			CustomersStore.emitChange();
			break;
		default:
			// do nothing
	}
});

module.exports = CustomersStore;