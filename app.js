var domain = require("domain");
var express = require("express");

function sycamoreErpApplication(servicesContainer, modelsContainer) {
	var navigationService = servicesContainer.getService("navigationService");

	sycamoreErpApplication.prototype.Router	= express.Router();
	
	sycamoreErpApplication.prototype.Router.use(function(request, response, next) {
		navigationService.clearMenus();
		navigationService.addMenu(
			{
				"name": "Customers",
				"permission": "SYCAMOREERP_CUSTOMER__MODULE",
				"url": "/sycamore-erp/customer/"
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

	sycamoreErpApplication.prototype.Router.use(function(request, response, next) {
		var d = domain.create();

		d.on("error", next);

		d.run(function() {
			if(typeof response.locals == "undefined") {
				response.locals = {};
			}

			response.locals.applicationName = "Sycamore ERP";
			response.locals.applicationUrl = "/sycamore-erp/";

/*
			modelsContainer
			.getModel("PlatformApplication")
			.findOne({ name: "Sycamore ERP" })
			.lean()
			.exec(d.intercept(function(application) {
				modelsContainer
				.getModel("PlatformEntity")
				.find({ application: application._id })
				.lean()
				.exec(d.intercept(function(entities) {

					var values = [];
					Object.keys(entities).map(function(value, index) {
						var entityName = entities[value]["name"];
						values[entityName] = entities[value]["values"];
					});
					response.locals.entities = values;
*/
					next();
/*
				}));
			}));
*/
		});
	});

	sycamoreErpApplication.prototype.Router.get("/", function(request, response, next) {
		response.send("THIS IS A TEST");
	});

	sycamoreErpApplication.prototype.Router.get("/customers", function(request, response, next) {
		kashflowCustomer = modelsContainer.getModel("kashflowCustomer");

		kashflowCustomer.find({}).exec(function(error, customers) {
			response.locals.customers = customers;


			response.locals.template = "customer/List";

			var React = require("react");
//			var View = React.createFactory(require("../../lib/views/customer/List.js"));
			var View = React.createFactory(require("./lib/views/customer/List.js"));
			var html = React.renderToString(View({ locals: response.locals }));

			response.send(html);
		});
	});

	sycamoreErpApplication.prototype.Router.get("/orders", function(request, response, next) {
/*
		kashflowCustomer = modelsContainer.getModel("kashflowCustomer");

		kashflowCustomer.find({}).exec(function(error, customers) {
			response.locals.customers = customers;

*/
			response.locals.template = "order/List";

			var React = require("react");
//			var View = React.createFactory(require("../../lib/views/order/List.js"));
			var View = React.createFactory(require("./lib/views/order/List.js"));
			var html = React.renderToString(View({ locals: response.locals }));

			response.send(html);
/*
		});
*/
	});
/*
	var applicationRoutes = require("./app/routes/applicationRoutes")(servicesContainer, modelsContainer);
	var carRoutes = require("./app/routes/carRoutes")(servicesContainer, modelsContainer);
	var dealRoutes = require("./app/routes/dealRoutes")(servicesContainer, modelsContainer);
	var leadRoutes = require("./app/routes/leadRoutes")(servicesContainer, modelsContainer);
	var noteRoutes = require("./app/routes/noteRoutes")(servicesContainer, modelsContainer);
	var notificationRoutes = require("./app/routes/notificationRoutes")(servicesContainer, modelsContainer);

	sycamoreErpApplication.prototype.Router.use("/", applicationRoutes);
	sycamoreErpApplication.prototype.Router.use("/", carRoutes);
	sycamoreErpApplication.prototype.Router.use("/deal", dealRoutes);
	sycamoreErpApplication.prototype.Router.use("/lead", leadRoutes);
	sycamoreErpApplication.prototype.Router.use("/note", noteRoutes);
	sycamoreErpApplication.prototype.Router.use("/notification", notificationRoutes);

	sycamoreErpApplication.prototype.Router.get("/packages.js", function(request, response, next) {
		response.type("text/javascript");
		response.sendfile("packages.js", {root: "./node_modules/thecarcentre-carsalessuite/build"});
	});

	sycamoreErpApplication.prototype.Router.get("/carSalesSuite.js", function(request, response, next) {
		response.type("text/javascript");
		response.sendfile("carSalesSuite.js", {root: "./node_modules/thecarcentre-carsalessuite/build"});
	});

	sycamoreErpApplication.prototype.Router.get("/", function(request, response, next) {
		response.render("../node_modules/thecarcentre-carsalessuite/views/index", {});
	});
*/
}

sycamoreErpApplication.prototype.getRoutes = function() {
	return sycamoreErpApplication.prototype.Router;
}

exports = module.exports = sycamoreErpApplication;