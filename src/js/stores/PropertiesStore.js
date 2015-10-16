var AppDispatcher = require("../dispatcher/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("../constants/AppConstants");
var assign = require("object-assign");

var _properties = [];

var PropertiesStore = assign({}, EventEmitter.prototype, {
	emitChange: function() {
		this.emit(AppConstants.CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(AppConstants.CHANGE_EVENT, callback);
	},

	getProperties: function() {
		return _properties;
	},

	updateProperties: function(items) {
		_properties = items;
	}
});

PropertiesStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case AppConstants.UPDATE_PROPERTIES:
			PropertiesStore.updateProperties(action.items);
			PropertiesStore.emitChange();
			break;
		default:
			// do nothing
	}
});

module.exports = PropertiesStore;