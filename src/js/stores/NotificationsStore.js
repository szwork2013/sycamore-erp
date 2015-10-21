var AppDispatcher = require("../dispatcher/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("../constants/AppConstants");
var assign = require("object-assign");

var _notifications = [];

var NotificationsStore = assign({}, EventEmitter.prototype, {
	emitChange: function() {
		this.emit(AppConstants.CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(AppConstants.CHANGE_EVENT, callback);
	},

	addNotification: function(notification) {
		_notifications.push(notification);
	},

	getNotifications: function() {
		return _notifications;
	},

	getUnreadCount: function() {
		return 7;
	},

	setNotifications: function(notifications) {
		_notifications = notifications;
	}
});

NotificationsStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		default:
			// do nothing
	}
});

module.exports = NotificationsStore;