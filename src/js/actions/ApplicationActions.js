var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var Api = require("../services/Api");

var ApplicationActions = {
	getSuppliers: function(queryOptions) {
		Api.getSuppliers(queryOptions, function(error, response) {
			AppDispatcher.handleViewAction({
				actionType: AppConstants.UPDATE_SUPPLIERS,
				items: response.body.items
			});
		});
	}
}

module.exports = ApplicationActions;