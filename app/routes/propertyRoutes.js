var express			= require("express");

function propertyRoutes(servicesContainer, modelsContainer) {
	var authenticationService = servicesContainer.getService("authenticationService");
	var propertyController	= new (require("../controllers/propertyController"))(servicesContainer, modelsContainer);

	var getQueryList = require("../../../../app/lib/getQueryList");
	var getQueryFilter = require("../../../../app/lib/getQueryFilter");
	var getQueryPagination = require("../../../../app/lib/getQueryPagination");
	var getQuerySort = require("../../../../app/lib/getQuerySort");
	var getQuerySelect = require("../../../../app/lib/getQuerySelect");
	var getQuerySearchQuery = require("../../../../app/lib/getQuerySearchQuery");

	var Router = express.Router();

// DELETE / DELETE
	Router.delete("/property/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		propertyController.deletePropertyAction
	);
// CREATE / PUT
	Router.put(	"/property",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_CREATE"),
		propertyController.savePropertyAction
	);
// UPDATE / POST
	Router.post("/property/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		propertyController.savePropertyAction
	);

// CREATE / GET
	Router.get( "/property",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_VIEW"),
		propertyController.editPropertyAction
	);
// EDIT/VIEW / GET
	Router.get( "/property/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		propertyController.editPropertyAction
	);
	Router.get( "/property/:id.:contentType",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		propertyController.editPropertyAction
	);
// LIST / GET
	Router.get(
		"/propertys",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_LIST"),
		getQueryList,
		getQueryFilter,
		getQueryPagination,
		getQuerySort,
		getQuerySelect,
		getQuerySearchQuery,
		propertyController.listPropertiesAction
	);
	Router.get(
		"/propertys.:contentType",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_LIST"),
		getQueryList,
		getQueryFilter,
		getQueryPagination,
		getQuerySort,
		getQuerySelect,
		getQuerySearchQuery,
		propertyController.listPropertiesAction
	);

	return Router;
};

exports = module.exports = propertyRoutes;