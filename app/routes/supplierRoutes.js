var express			= require("express");

function supplierRoutes(servicesContainer, modelsContainer) {
	var authenticationService = servicesContainer.getService("authenticationService");
	var supplierController	= new (require("../controllers/supplierController"))(servicesContainer, modelsContainer);
/*
	var getQueryList = require("../lib/getQueryList");
	var getQueryFilter = require("../lib/getQueryFilter");
	var getQueryPagination = require("../lib/getQueryPagination");
	var getQuerySort = require("../lib/getQuerySort");
	var getQuerySelect = require("../lib/getQuerySelect");
	var getQuerySearchQuery = require("../lib/getQuerySearchQuery");
*/	
	var Router = express.Router();

// CREATE / PUT
	Router.put(	"/supplier",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_LEAD_CREATE"),
		supplierController.saveSupplierAction
	);

// UPDATE / POST
	Router.post("/supplier/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		supplierController.updateSupplierAction
	);

// EDIT / GET
	Router.get( "/supplier/:id/edit.html",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		supplierController.editSupplierAction
	);
// LIST / GET
	Router.get(
		"/suppliers",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_LIST"),
//		getQueryList,
//		getQueryFilter,
//		getQueryPagination,
//		getQuerySort,
//		getQuerySelect,
//		getQuerySearchQuery,
		supplierController.listSuppliersAction
	);
	Router.get(
		"/suppliers.:contentType",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_LIST"),
//		getQueryList,
//		getQueryFilter,
//		getQueryPagination,
//		getQuerySort,
//		getQuerySelect,
//		getQuerySearchQuery,
		supplierController.listSuppliersAction
	);
// VIEW / GET
	Router.get( "/supplier/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_VIEW"),
		supplierController.viewSupplierAction
	);
	Router.get( "/supplier/:id.:contentType",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_VIEW"),
		supplierController.viewSupplierAction
	);

	return Router;
};

exports = module.exports = supplierRoutes;
