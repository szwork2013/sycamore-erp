var express			= require("express");

function customerRoutes(servicesContainer, modelsContainer) {
	var authenticationService = servicesContainer.getService("authenticationService");
	var customerController	= new (require("../controllers/customerController"))(servicesContainer, modelsContainer);
/*
	var getQueryList = require("../lib/getQueryList");
	var getQueryFilter = require("../lib/getQueryFilter");
	var getQueryPagination = require("../lib/getQueryPagination");
	var getQuerySort = require("../lib/getQuerySort");
	var getQuerySelect = require("../lib/getQuerySelect");
	var getQuerySearchQuery = require("../lib/getQuerySearchQuery");
*/	
	var Router = express.Router();

// CREATE / GET
	Router.get( "/customer",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_VIEW"),
		customerController.createCustomerAction
	);
// CREATE / POST
	Router.post("/customer",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_CREATE"),
		customerController.saveCustomerAction
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
		customerController.updateCustomerAction
	);

// EDIT / GET
	Router.get( "/customer/:id/edit.html",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		customerController.editCustomerAction
	);
// LIST / GET
	Router.get(
		"/customers",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_LIST"),
//		getQueryList,
//		getQueryFilter,
//		getQueryPagination,
//		getQuerySort,
//		getQuerySelect,
//		getQuerySearchQuery,
		customerController.listCustomersAction
	);
	Router.get(
		"/customers.:contentType",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_LIST"),
//		getQueryList,
//		getQueryFilter,
//		getQueryPagination,
//		getQuerySort,
//		getQuerySelect,
//		getQuerySearchQuery,
		customerController.listCustomersAction
	);
// VIEW / GET
	Router.get( "/customer/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_VIEW"),
		customerController.viewCustomerAction
	);
	Router.get( "/customer/:id.:contentType",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_VIEW"),
		customerController.viewCustomerAction
	);

	return Router;
};

exports = module.exports = customerRoutes;
