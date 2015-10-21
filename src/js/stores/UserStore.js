var AppDispatcher = require("../dispatcher/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("../constants/AppConstants");
var assign = require("object-assign");

var _user = {
	_id: null,
	email: "example@example.com",
	name: "Example User"
};

var UserStore = assign({}, EventEmitter.prototype, {
	emitChange: function() {
		this.emit(AppConstants.CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(AppConstants.CHANGE_EVENT, callback);
	},

	getUser: function() {
		return _user;
	},

	setUser: function(user) {
		_user = user;
		this.emitChange();
	}
});

UserStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		default:
			// do nothing
	}
});

module.exports = UserStore;