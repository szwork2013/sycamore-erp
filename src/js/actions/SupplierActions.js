var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var SupplierConstants = require("../constants/SupplierConstants");

var Api = require("../services/Api");

var SupplierActions = {
	getSuppliers: function(queryOptions) {
		Api.getSuppliers(queryOptions, function(response) {
			AppDispatcher.handleViewAction({
				actionType: SupplierConstants.UPDATE_SUPPLIERS,
				list: response.body
			});
		});
	},
	saveSupplier: function(supplier) {
		if(	(typeof(supplier._id) != "undefined") &&
			(supplier._id != null) ) {
// POST
			Api.postSupplier(
				supplier._id,
				supplier,
				function(response) {
					AppDispatcher.handleViewAction({
						actionType: SupplierConstants.UPDATE_SUPPLIER,
						supplier: response.body
					});
				}
			);
		} else {
// PUT
			Api.putSupplier(
				supplier,
				function(response) {
					AppDispatcher.handleViewAction({
						actionType: SupplierConstants.UPDATE_SUPPLIER,
						supplier: response.body
					});
				}
			);
		}
	},
	updateSupplierName: function(event) {
		AppDispatcher.handleViewAction({
			actionType: SupplierConstants.UPDATE_SUPPLIER_NAME,
			name: event.target.value
		});
	}
}

module.exports = SupplierActions;