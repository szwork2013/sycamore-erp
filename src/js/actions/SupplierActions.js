var domain = require("domain");
var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var SupplierConstants = require("../constants/SupplierConstants");

var Api = require("../services/Api");

var SupplierActions = {
	getSuppliers: function(queryOptions) {
		var d = domain.create();

		d.on("error", function(error) {
			console.log("getSuppliers() -> error:");
			console.log(error);
		});

		d.run(function() {
			Api.getSuppliers(queryOptions, d.intercept(function(response) {
				AppDispatcher.handleViewAction({
					actionType: SupplierConstants.UPDATE_SUPPLIERS,
					list: response.body
				});
			}));
		});
	},
	saveSupplier: function(supplier) {
		var d = domain.create();

		d.on("error", function(error) {
			console.log("saveSupplier() -> error:");
			console.log(error);
		});

		d.run(function() {
			if(typeof(supplier._id) != "undefined") {
				Api.postSupplier(
					{
						supplier: supplier
					},
					d.intercept(function(response) {
						AppDispatcher.handleViewAction({
							actionType: SupplierConstants.UPDATE_SUPPLIER,
							supplier: response.body
						});
					})
				);			
			} else {
				Api.putSupplier(
					{
						supplier: supplier
					},
					d.intercept(function(response) {
						AppDispatcher.handleViewAction({
							actionType: SupplierConstants.UPDATE_SUPPLIER,
							supplier: response.body
						});
					})
				);
			}
		});
	},
	updateSupplierName: function(event) {
		AppDispatcher.handleViewAction({
			actionType: SupplierConstants.UPDATE_SUPPLIER_NAME,
			name: event.target.value
		});
	}
}

module.exports = SupplierActions;