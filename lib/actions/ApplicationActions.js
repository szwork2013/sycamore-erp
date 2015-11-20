"use strict";

var domain = require("domain");
var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var AppConstants = require("../constants/AppConstants");

var Api = require("../services/Api");

var ApplicationActions = {

	getProperties: function getProperties(queryOptions) {
		Api.getProperties(queryOptions, function (error, response) {
			AppDispatcher.handleViewAction({
				actionType: AppConstants.UPDATE_PROPERTIES,
				list: response.body
			});
		});
	},
	getSuppliers: function getSuppliers(queryOptions) {
		Api.getSuppliers(queryOptions, function (error, response) {
			AppDispatcher.handleViewAction({
				actionType: AppConstants.UPDATE_SUPPLIERS,
				list: response.body
			});
		});
	}
};

module.exports = ApplicationActions;