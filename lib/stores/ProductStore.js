"use strict";

var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("../constants/AppConstants");
var assign = require("object-assign");

var CHANGE_EVENT = "change";
var product = {
	supplier: null
};

var ProductStore = assign({}, EventEmitter.prototype, {
	emitChange: function emitChange() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	/*
 	removeChangeListener: function() {
 
 	},
 */

	addTask: function addTask(task) {
		if (application.application.tasks.indexOf(task) === -1) {
			application.application.tasks.push(task);
		}
	}

});

ProductStore.dispatchToken = AppDispatcher.register(function (payload) {
	var action = payload.action;
	switch (action.actionType) {
		case AppConstants.ADD_TASK:
			ProductStore.addTask(action.task);
			ProductStore.emitChange();
			break;
		default:
		// do nothing
	}
});

module.exports = ProductStore;