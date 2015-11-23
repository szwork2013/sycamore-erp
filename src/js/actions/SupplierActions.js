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
	},
	updateSupplierBillingAddressLine1: function(event) {
		AppDispatcher.handleViewAction({
			actionType: SupplierConstants.UPDATE_SUPPLIER_BILLING_ADDRESS_LINE1,
			line1: event.target.value
		});
	},
	updateSupplierBillingAddressLine2: function(event) {
		AppDispatcher.handleViewAction({
			actionType: SupplierConstants.UPDATE_SUPPLIER_BILLING_ADDRESS_LINE2,
			line2: event.target.value
		});
	},
	updateSupplierBillingAddressLine3: function(event) {
		AppDispatcher.handleViewAction({
			actionType: SupplierConstants.UPDATE_SUPPLIER_BILLING_ADDRESS_LINE3,
			line3: event.target.value
		});
	},
	updateSupplierBillingAddressLine4: function(event) {
		AppDispatcher.handleViewAction({
			actionType: SupplierConstants.UPDATE_SUPPLIER_BILLING_ADDRESS_LINE4,
			line4: event.target.value
		});
	},
	updateSupplierBillingAddressPostCode: function(event) {
		AppDispatcher.handleViewAction({
			actionType: SupplierConstants.UPDATE_SUPPLIER_BILLING_ADDRESS_POSTCODE,
			postCode: event.target.value
		});
	},
	updateSupplierTelephone: function(event) {
		AppDispatcher.handleViewAction({
			actionType: SupplierConstants.UPDATE_SUPPLIER_TELEPHONE,
			telephone: event.target.value
		});
	},
	updateSupplierEmail: function(event) {
		AppDispatcher.handleViewAction({
			actionType: SupplierConstants.UPDATE_SUPPLIER_EMAIL,
			email: event.target.value
		});
	}
}

module.exports = SupplierActions;