var express			= require("express");

function productRoutes(servicesContainer, modelsContainer) {
	var authenticationService = servicesContainer.getService("authenticationService");
	var productController	= new (require("../controllers/productController"))(servicesContainer, modelsContainer);

	var getQueryList = require("../../../../app/lib/getQueryList");
	var getQueryFilter = require("../../../../app/lib/getQueryFilter");
	var getQueryPagination = require("../../../../app/lib/getQueryPagination");
	var getQuerySort = require("../../../../app/lib/getQuerySort");
	var getQuerySelect = require("../../../../app/lib/getQuerySelect");
	var getQuerySearchQuery = require("../../../../app/lib/getQuerySearchQuery");

	var Router = express.Router();

// DELETE / DELETE
	Router.delete("/product/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		productController.deleteProductAction
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
		productController.saveProductAction
	);

// CREATE / GET
	Router.get( "/product",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_VIEW"),
		productController.editProductAction
	);
// EDIT/VIEW / GET
	Router.get( "/product/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		productController.editProductAction
	);
	Router.get( "/product/:id.:contentType",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		productController.editProductAction
	);
// LIST / GET
	Router.get(
		"/products",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_LIST"),
		getQueryList,
		getQueryFilter,
		getQueryPagination,
		getQuerySort,
		getQuerySelect,
		getQuerySearchQuery,
		productController.listProductsAction
	);
	Router.get(
		"/products.:contentType",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_LIST"),
		getQueryList,
		getQueryFilter,
		getQueryPagination,
		getQuerySort,
		getQuerySelect,
		getQuerySearchQuery,
		productController.listProductsAction
	);

	return Router;
};

exports = module.exports = productRoutes;
