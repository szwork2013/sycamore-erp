'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var Api = require("../services/Api");

var ApplicationActions = {
	getSuppliers: function getSuppliers(queryOptions) {
		Api.getSuppliers(queryOptions, function (error, response) {
			console.log("ApplicationActions.getSuppliers");
			console.log(response.items);
			AppDispatcher.handleViewAction({
				actionType: AppConstants.UPDATE_SUPPLIERS,
				items: response.items
			});
		});
	}
};

module.exports = ApplicationActions;