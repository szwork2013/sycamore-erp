var express			= require("express");

function productVariationRoutes(servicesContainer, modelsContainer) {
	var authenticationService = servicesContainer.getService("authenticationService");
	var productVariationController	= new (require("../controllers/productVariationController"))(servicesContainer, modelsContainer);

	var getQueryList = require("../../../../app/lib/getQueryList");
	var getQueryFilter = require("../../../../app/lib/getQueryFilter");
	var getQueryPagination = require("../../../../app/lib/getQueryPagination");
	var getQuerySort = require("../../../../app/lib/getQuerySort");
	var getQuerySelect = require("../../../../app/lib/getQuerySelect");
	var getQuerySearchQuery = require("../../../../app/lib/getQuerySearchQuery");

	var Router = express.Router();

// DELETE / DELETE
	Router.delete("/productVariation/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_PRODUCT_VARIATION_EDIT"),
		productVariationController.deleteProductVariationAction
	);
// CREATE / PUT
	Router.put(	"/productVariation",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_PRODUCT_VARIATION_CREATE"),
		productVariationController.saveProductVariationAction
	);
// UPDATE / POST
	Router.post("/productVariation/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_PRODUCT_VARIATION_EDIT"),
		productVariationController.saveProductVariationAction
	);

// CREATE / GET
	Router.get( "/productVariation",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_PRODUCT_VARIATION_VIEW"),
		productVariationController.editProductVariationAction
	);
// EDIT/VIEW / GET
	Router.get( "/productVariation/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_PRODUCT_VARIATION_EDIT"),
		productVariationController.editProductVariationAction
	);
	Router.get( "/productVariation/:id.:contentType",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_PRODUCT_VARIATION_EDIT"),
		productVariationController.editProductVariationAction
	);
// LIST / GET
	Router.get(
		"/productVariations",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_PRODUCT_VARIATION_LIST"),
		getQueryList,
		getQueryFilter,
		getQueryPagination,
		getQuerySort,
		getQuerySelect,
		getQuerySearchQuery,
		productVariationController.listProductVariationsAction
	);
	Router.get(
		"/productVariations.:contentType",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_PRODUCT_VARIATION_LIST"),
		getQueryList,
		getQueryFilter,
		getQueryPagination,
		getQuerySort,
		getQuerySelect,
		getQuerySearchQuery,
		productVariationController.listProductVariationsAction
	);

	return Router;
};

exports = module.exports = productVariationRoutes;
