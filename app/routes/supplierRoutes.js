var express			= require("express");

function supplierRoutes(servicesContainer, modelsContainer) {
	var authenticationService = servicesContainer.getService("authenticationService");
	var supplierController	= new (require("../controllers/supplierController"))(servicesContainer, modelsContainer);

	var getQueryList = require("../../../../app/lib/getQueryList");
	var getQueryFilter = require("../../../../app/lib/getQueryFilter");
	var getQueryPagination = require("../../../../app/lib/getQueryPagination");
	var getQuerySort = require("../../../../app/lib/getQuerySort");
	var getQuerySelect = require("../../../../app/lib/getQuerySelect");
	var getQuerySearchQuery = require("../../../../app/lib/getQuerySearchQuery");

	var Router = express.Router();

// DELETE / DELETE
	Router.delete("/supplier/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		supplierController.deleteSupplierAction
	);
// CREATE / PUT
	Router.put(	"/supplier",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_CREATE"),
		supplierController.saveSupplierAction
	);
// UPDATE / POST
	Router.post("/supplier/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		supplierController.saveSupplierAction
	);

// CREATE / GET
	Router.get( "/supplier",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_VIEW"),
		supplierController.editSupplierAction
	);
// EDIT/VIEW / GET
	Router.get( "/supplier/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		supplierController.editSupplierAction
	);
	Router.get( "/supplier/:id.:contentType",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		supplierController.editSupplierAction
	);
// LIST / GET
	Router.get(
		"/suppliers",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_LIST"),
		getQueryList,
		getQueryFilter,
		getQueryPagination,
		getQuerySort,
		getQuerySelect,
		getQuerySearchQuery,
		supplierController.listSuppliersAction
	);
	Router.get(
		"/suppliers.:contentType",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_LIST"),
		getQueryList,
		getQueryFilter,
		getQueryPagination,
		getQuerySort,
		getQuerySelect,
		getQuerySearchQuery,
		supplierController.listSuppliersAction
	);

	return Router;
};

exports = module.exports = supplierRoutes;
