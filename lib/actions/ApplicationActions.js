'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var Api = require("../services/Api");

var ApplicationActions = {
	getSuppliers: function getSuppliers(queryOptions) {
		Api.getSuppliers(queryOptions, function (error, response) {
			AppDispatcher.dispatch({
				actionType: AppConstants.UPDATE_SUPPLIERS,
				items: response.items
			});
		});
	}
};

module.exports = ApplicationActions;