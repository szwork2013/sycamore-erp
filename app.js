var domain = require("domain");
var express = require("express");

function sycamoreErpApplication(servicesContainer, modelsContainer) {
	var navigationService = servicesContainer.getService("navigationService");

	modelsContainer.addModel("Customer",	require("./models/customerSchema").customerSchema());
	modelsContainer.addModel("Order",		require("./models/orderSchema").orderSchema());
	modelsContainer.addModel("Product",		require("./models/productSchema").productSchema());
	modelsContainer.addModel("Property",	require("./models/propertySchema").propertySchema());
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
				"name": "Ordering",
				"permission": "SYCAMOREERP_ORDER__MODULE",
				"menu": [
					{
						"name": "Customers",
						"permission": "SYCAMOREERP_CUSTOMER__MODULE",
						"url": response.locals.applicationUrl + "customers/"
					}, {
						"name": "Orders",
						"permission": "SYCAMOREERP_ORDER__MODULE",
						"url": response.locals.applicationUrl + "orders/"
					}, {
						"name": "Products",
						"permission": "SYCAMOREERP_PRODUCT__MODULE",
						"url": response.locals.applicationUrl + "products/"
					}, {
						"name": "Properties",
						"permission": "SYCAMOREERP_PROPERTIES__MODULE",
						"url": response.locals.applicationUrl + "properties/"
					}, {
						"name": "Suppliers",
						"permission": "SYCAMOREERP_SUPPLIER__MODULE",
						"url": response.locals.applicationUrl + "suppliers/"
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
								"url": "/user/"
							}, {
								"name": "Roles",
								"permission": "ROLE__MODULE",
								"url": "/platform/role/"
							}, {
								"name": "Permissions",
								"permission": "PERMISSION__MODULE",
								"url": "/platform/permission/"
							}, {
								"name": "Applications",
								"permission": "APPLICATION__MODULE",
								"url": "/platform/application/"
							}
						]
					}, {
						"name": "Entities",
						"permission": "ENTITIES__MODULE",
						"url": "/entity/"
					}, {
						"name": "Integrations",
						"permission": "INTEGRATIONS__MODULE",
						"url": "/integration/"
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