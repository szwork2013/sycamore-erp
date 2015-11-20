var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var CustomerConstants = require("../constants/CustomerConstants");
var assign = require("object-assign");

var _customers = [];

var CustomersStore = assign({}, EventEmitter.prototype, {
	emitChange: function() {
		this.emit(CustomerConstants.CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CustomerConstants.CHANGE_EVENT, callback);
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
		case CustomerConstants.UPDATE_CUSTOMERS:
			CustomersStore.updateCustomers(action.list.rows);
			CustomersStore.emitChange();
			break;
		default:
			// do nothing
	}
});

module.exports = CustomersStore;