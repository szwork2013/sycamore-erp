var express			= require("express");

function customerRoutes(servicesContainer, modelsContainer) {
	var authenticationService = servicesContainer.getService("authenticationService");
	var customerController	= new (require("../controllers/customerController"))(servicesContainer, modelsContainer);

	var getQueryList = require("../../../../app/lib/getQueryList");
	var getQueryFilter = require("../../../../app/lib/getQueryFilter");
	var getQueryPagination = require("../../../../app/lib/getQueryPagination");
	var getQuerySort = require("../../../../app/lib/getQuerySort");
	var getQuerySelect = require("../../../../app/lib/getQuerySelect");
	var getQuerySearchQuery = require("../../../../app/lib/getQuerySearchQuery");

	var Router = express.Router();

// DELETE / DELETE
	Router.delete("/customer/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		customerController.deleteCustomerAction
	);
// CREATE / PUT
	Router.put(	"/customer",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_CREATE"),
		customerController.saveCustomerAction
	);
// UPDATE / POST
	Router.post("/customer/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		customerController.saveCustomerAction
	);

// CREATE / GET
	Router.get( "/customer",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_VIEW"),
		customerController.editCustomerAction
	);
// EDIT/VIEW / GET
	Router.get( "/customer/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		customerController.editCustomerAction
	);
	Router.get( "/customer/:id.:contentType",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		customerController.editCustomerAction
	);
// LIST / GET
	Router.get(
		"/customers",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_LIST"),
		getQueryList,
		getQueryFilter,
		getQueryPagination,
		getQuerySort,
		getQuerySelect,
		getQuerySearchQuery,
		customerController.listCustomersAction
	);
	Router.get(
		"/customers.:contentType",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_LIST"),
		getQueryList,
		getQueryFilter,
		getQueryPagination,
		getQuerySort,
		getQuerySelect,
		getQuerySearchQuery,
		customerController.listCustomersAction
	);

	return Router;
};

exports = module.exports = customerRoutes;
