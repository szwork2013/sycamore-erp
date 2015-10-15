var express			= require("express");

function orderRoutes(servicesContainer, modelsContainer) {
	var authenticationService = servicesContainer.getService("authenticationService");
	var orderController	= new (require("../controllers/orderController"))(servicesContainer, modelsContainer);
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
	Router.get( "/order",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_VIEW"),
		orderController.createOrderAction
	);
// CREATE / POST
	Router.post("/order",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_CREATE"),
		orderController.saveOrderAction
	);
// CREATE / PUT
	Router.put(	"/order",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_CREATE"),
		orderController.saveOrderAction
	);

// UPDATE / POST
	Router.post("/order/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		orderController.updateOrderAction
	);

// EDIT / GET
	Router.get( "/order/:id/edit.html",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		orderController.editOrderAction
	);
// LIST / GET
	Router.get(
		"/orders",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_LIST"),
//		getQueryList,
//		getQueryFilter,
//		getQueryPagination,
//		getQuerySort,
//		getQuerySelect,
//		getQuerySearchQuery,
		orderController.listOrdersAction
	);
	Router.get(
		"/orders.:contentType",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_LIST"),
//		getQueryList,
//		getQueryFilter,
//		getQueryPagination,
//		getQuerySort,
//		getQuerySelect,
//		getQuerySearchQuery,
		orderController.listOrdersAction
	);
// VIEW / GET
	Router.get( "/order/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_VIEW"),
		orderController.viewOrderAction
	);
	Router.get( "/order/:id.:contentType",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_VIEW"),
		orderController.viewOrderAction
	);

	return Router;
};

exports = module.exports = orderRoutes;
