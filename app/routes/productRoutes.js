var express			= require("express");

function productRoutes(servicesContainer, modelsContainer) {
	var authenticationService = servicesContainer.getService("authenticationService");
	var productController	= new (require("../controllers/productController"))(servicesContainer, modelsContainer);
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
	Router.get( "/product",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_VIEW"),
		productController.createProductAction
	);
// CREATE / POST
	Router.post("/product",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_CREATE"),
		productController.saveProductAction
	);
// CREATE / PUT
	Router.put(	"/product",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_CREATE"),
		productController.saveProductAction
	);

// UPDATE / POST
	Router.post("/product/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		productController.updateProductAction
	);

// EDIT / GET
	Router.get( "/product/:id/edit.html",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		productController.editProductAction
	);
// LIST / GET
	Router.get(
		"/products",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_LIST"),
//		getQueryList,
//		getQueryFilter,
//		getQueryPagination,
//		getQuerySort,
//		getQuerySelect,
//		getQuerySearchQuery,
		productController.listProductsAction
	);
	Router.get(
		"/products.:contentType",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_LIST"),
//		getQueryList,
//		getQueryFilter,
//		getQueryPagination,
//		getQuerySort,
//		getQuerySelect,
//		getQuerySearchQuery,
		productController.listProductsAction
	);
// VIEW / GET
	Router.get( "/product/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_VIEW"),
		productController.viewProductAction
	);
	Router.get( "/product/:id.:contentType",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_VIEW"),
		productController.viewProductAction
	);

	return Router;
};

exports = module.exports = productRoutes;
