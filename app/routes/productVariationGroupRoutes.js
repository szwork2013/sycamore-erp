var express			= require("express");

function productVariationGroupRoutes(servicesContainer, modelsContainer) {
	var authenticationService = servicesContainer.getService("authenticationService");
	var productVariationGroupController	= new (require("../controllers/productVariationGroupController"))(servicesContainer, modelsContainer);

	var getQueryList = require("../../../../app/lib/getQueryList");
	var getQueryFilter = require("../../../../app/lib/getQueryFilter");
	var getQueryPagination = require("../../../../app/lib/getQueryPagination");
	var getQuerySort = require("../../../../app/lib/getQuerySort");
	var getQuerySelect = require("../../../../app/lib/getQuerySelect");
	var getQuerySearchQuery = require("../../../../app/lib/getQuerySearchQuery");

	var Router = express.Router();

// DELETE / DELETE
	Router.delete("/productVariationGroup/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_PRODUCT_VARIATION_GROUP_EDIT"),
		productVariationGroupController.deleteProductVariationGroupAction
	);
// CREATE / PUT
	Router.put(	"/productVariationGroup",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_PRODUCT_VARIATION_GROUP_CREATE"),
		productVariationGroupController.saveProductVariationGroupAction
	);
// UPDATE / POST
	Router.post("/productVariationGroup/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_PRODUCT_VARIATION_GROUP_EDIT"),
		productVariationGroupController.saveProductVariationGroupAction
	);

// CREATE / GET
	Router.get( "/productVariationGroup",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_PRODUCT_VARIATION_GROUP_VIEW"),
		productVariationGroupController.editProductVariationGroupAction
	);
// EDIT/VIEW / GET
	Router.get( "/productVariationGroup/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_PRODUCT_VARIATION_GROUP_EDIT"),
		productVariationGroupController.editProductVariationGroupAction
	);
	Router.get( "/productVariationGroup/:id.:contentType",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_PRODUCT_VARIATION_GROUP_EDIT"),
		productVariationGroupController.editProductVariationGroupAction
	);
// LIST / GET
	Router.get(
		"/productVariationGroups",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_PRODUCT_VARIATION_GROUP_LIST"),
		getQueryList,
		getQueryFilter,
		getQueryPagination,
		getQuerySort,
		getQuerySelect,
		getQuerySearchQuery,
		productVariationGroupController.listProductVariationGroupsAction
	);
	Router.get(
		"/productVariationGroups.:contentType",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_PRODUCT_VARIATION_GROUP_LIST"),
		getQueryList,
		getQueryFilter,
		getQueryPagination,
		getQuerySort,
		getQuerySelect,
		getQuerySearchQuery,
		productVariationGroupController.listProductVariationGroupsAction
	);

	return Router;
};

exports = module.exports = productVariationGroupRoutes;
