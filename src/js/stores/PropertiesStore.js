var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var PropertyConstants = require("../constants/PropertyConstants");
var assign = require("object-assign");

var _properties = [];

var PropertiesStore = assign({}, EventEmitter.prototype, {
	emitChange: function() {
		this.emit(PropertyConstants.CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(PropertyConstants.CHANGE_EVENT, callback);
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
		case PropertyConstants.UPDATE_PROPERTIES:
			PropertiesStore.updateProperties(action.list.rows);
			PropertiesStore.emitChange();
			break;
		default:
			// do nothing
	}
});

module.exports = PropertiesStore;