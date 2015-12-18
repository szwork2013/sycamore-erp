var domain = require("domain");
var express = require("express");

function sycamoreErpApplication(servicesContainer, modelsContainer) {
	var navigationService = servicesContainer.getService("navigationService");

	modelsContainer.addModel("Customer",	require("./models/customerSchema").customerSchema());
	modelsContainer.addModel("Order",		require("./models/orderSchema").orderSchema());
	modelsContainer.addModel("Product",		require("./models/productSchema").productSchema());
	modelsContainer.addModel("ProductVariation",		require("./models/productVariationSchema").productVariationSchema());
	modelsContainer.addModel("ProductVariationGroup",	require("./models/productVariationGroupSchema").productVariationGroupSchema());
	modelsContainer.addModel("Property",	require("./models/propertySchema").propertySchema());
	modelsContainer.addModel("Quote",		require("./models/quoteSchema").orderSchema());
	modelsContainer.addModel("Supplier",	require("./models/supplierSchema").supplierSchema());

	sycamoreErpApplication.prototype.Router	= express.Router();

	sycamoreErpApplication.prototype.Router.use(function(request, response, next) {
		var d = domain.create();

		d.on("error", next);

		d.run(function() {
			if(typeof response.locals == "undefined") {
				response.locals = {};
			}

			response.locals.applicationName = "Sycamore ERP";
			response.locals.applicationUrl = "/sycamore-erp/";

			next();
		});
	});

	sycamoreErpApplication.prototype.Router.use(function(request, response, next) {
		navigationService.clearMenus();
		navigationService.addMenu(
			{
				"name": "Sales",
				"permission": "SYCAMOREERP_SALES__MODULE",
				"menu": [
					{
						"name": "Customers",
						"permission": "SYCAMOREERP_CUSTOMER__MODULE",
						"url": response.locals.applicationUrl + "customers/"
					}, {
						"name": "Sales Quotes",
						"permission": "SYCAMOREERP_QUOTE__MODULE",
						"url": response.locals.applicationUrl + "quotes/"
					}, {
						"name": "Sales Orders",
						"permission": "SYCAMOREERP_ORDER__MODULE",
						"url": response.locals.applicationUrl + "orders/"
					}, {
						"name": "Customer Properties",
						"permission": "SYCAMOREERP_PROPERTIES__MODULE",
						"url": response.locals.applicationUrl + "properties/"
					}
				]
			}
		);
		navigationService.addMenu(
			{
				"name": "Purchasing",
				"permission": "SYCAMOREERP_SALES__MODULE",
				"menu": [
					{
						"name": "Suppliers",
						"permission": "SYCAMOREERP_SUPPLIER__MODULE",
						"url": response.locals.applicationUrl + "suppliers/"
					}, {
						"name": "Purchase Orders",
						"permission": "SYCAMOREERP_ORDER__MODULE",
						"url": response.locals.applicationUrl + "orders/"
					}
				]
			}
		);
		navigationService.addMenu(
			{
				"name": "Stock",
				"permission": "SYCAMOREERP_STOCK__MODULE",
				"menu": [
					{
						"name": "Inventory",
						"permission": "SYCAMOREERP_INVENTORY__MODULE",
						"url": response.locals.applicationUrl + "inventory/"
					}, {
						"name": "Products",
						"permission": "SYCAMOREERP_PRODUCT__MODULE",
						"url": response.locals.applicationUrl + "products/"
					}, {
						"name": "Product Variations",
						"permission": "USER__MODULE",
						"submenu": [
							{
								"name": "Variation Groups",
								"permission": "SYCAMOREERP_VARIATION_GROUP__MODULE",
								"url": response.locals.applicationUrl + "productVariationGroups/"
							}, {
								"name": "Variations",
								"permission": "SYCAMOREERP_VARIATION__MODULE",
								"url": response.locals.applicationUrl + "productVariations/"
							}
						]
					}
				]
			}
		);
		navigationService.addMenu(
			{
				"name": "System",
				"permission": "SYSTEM__MODULE",
				"menu": [
					{
						"name": "Configuration",
						"permission": "CONFIGURATION__MODULE",
						"url": "/configuration/"
					}, {
						"name": "Users Management",
						"permission": "USER__MODULE",
						"submenu": [
							{
								"name": "Users",
								"permission": "USER__MODULE",
								"url": "/users/"
							}, {
								"name": "Roles",
								"permission": "ROLE__MODULE",
								"url": "/roles/"
							}, {
								"name": "Permissions",
								"permission": "PERMISSION__MODULE",
								"url": "/permissions/"
							}, {
								"name": "Applications",
								"permission": "APPLICATION__MODULE",
								"url": "/applications/"
							}
						]
					}, {
						"name": "Entities",
						"permission": "ENTITIES__MODULE",
						"url": "/entities/"
					}, {
						"name": "Integrations",
						"permission": "INTEGRATIONS__MODULE",
						"url": "/integrations/"
					}
				]
			}
		);
		next();
	});

	var routes = require("./app/routes")(servicesContainer, modelsContainer);

	sycamoreErpApplication.prototype.Router.use(routes);
}

sycamoreErpApplication.prototype.getRoutes = function() {
	return sycamoreErpApplication.prototype.Router;
}

exports = module.exports = sycamoreErpApplication;