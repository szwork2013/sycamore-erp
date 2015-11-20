"use strict";

var domain = require("domain");
var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var SupplierConstants = require("../constants/SupplierConstants");

var Api = require("../services/Api");

var SupplierActions = {
	getSuppliers: function getSuppliers(queryOptions) {
		Api.getSuppliers(queryOptions, function (error, response) {
			AppDispatcher.handleViewAction({
				actionType: SupplierConstants.UPDATE_SUPPLIERS,
				list: response.body
			});
		});
	},
	saveSupplier: function saveSupplier(supplier) {
		if (typeof supplier._id != "undefined") {
			Api.postSupplier({
				supplier: supplier
			}, function (error, response) {
				AppDispatcher.handleViewAction({
					actionType: SupplierConstants.UPDATE_SUPPLIER,
					supplier: response.body
				});
			});
		} else {
			Api.putSupplier({
				supplier: supplier
			}, function (error, response) {
				AppDispatcher.handleViewAction({
					actionType: SupplierConstants.UPDATE_SUPPLIER,
					supplier: response.body
				});
			});
		}
	},
	updateSupplierName: function updateSupplierName(event) {
		AppDispatcher.handleViewAction({
			actionType: SupplierConstants.UPDATE_SUPPLIER_NAME,
			name: event.target.value
		});
	}
};

module.exports = SupplierActions;