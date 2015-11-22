var domain = require("domain");
var async = require("async");

var getListItems = require("../../../../app/lib/controller/getListItems.js");

function customerController(servicesContainer, modelsContainer) {
	customerController.prototype.servicesContainer = servicesContainer;
	customerController.prototype.modelsContainer = modelsContainer;
}

customerController.prototype.getCustomer = function(id, callback) {
	var d = domain.create();
	
	d.on("error", callback);
	
	d.run(function() {
		if(id != null) {
			var Customer = customerController.prototype.modelsContainer.getModel("Customer");
			Customer.findOne({ _id: id }).exec(callback);
		} else {
			callback();
		}
	});
}

customerController.prototype.editCustomerAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var Customer = customerController.prototype.modelsContainer.getModel("Customer");
		var id;

		if(typeof(request.params.id) != "undefined") {
			id = request.params.id;

			customerController.prototype.getCustomer(id, d.intercept(function(customer) {
				if(customer != null) {
					response.locals.customer = customer;
					switch(request.params.contentType) {
						case "json":
							response.json(customer);
							break;
						case "html":
						default:
							response.renderReact("customer/Form", response.locals);
							break;
					}
				} else {
// Throw 404 - Not Found
					next(new Error("404 - Not Found"));
				}
			}));
		} else {
			response.renderReact("customer/Form", response.locals);
		}
	});
}

customerController.prototype.listCustomersAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var list = response.locals.list;

		list.name = "customers";
		list.title = "Customers";

		list.columns = [
			{ name: "name", label: "Name", display: true },
			{ name: "telephone", label: "Telephone", display: true },
			{ name: "email", label: "Email", display: true },
			{ name: "billingAddress", label: "Billing Address", display: true },
			{ name: "updated", label: "Updated", display: true }
		];

		list.entities = [];

		getListItems(
			customerController.prototype.servicesContainer,
			customerController.prototype.modelsContainer,
			"Customer",
			list,
			d.intercept(function(list) {
				switch(request.params.contentType) {
					case "json":
						response.json(list);
						break;
					case "html":
					default:
						response.locals.list = list;
						response.renderReact("customer/List", response.locals);
						break;
				}
			})
		);
	});
}

customerController.prototype.deleteCustomerAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var Customer = customerController.prototype.modelsContainer.getModel("Customer");
		var id;

		if(typeof(request.params.id) != "undefined") {
			id = request.params.id;
			Customer.remove({ _id: id }, d.intercept(function() {
				response.redirect(response.locals.applicationUrl + "customers");
			}));
		} else {
// Throw 400 - Bad Request
			next(new Error("400 - Bad Request"));
		}
	});
}

customerController.prototype.saveCustomerAction = function(request, response, next) {
	var d = domain.create();

	d.on("error", next);

	d.run(function() {
		var Customer = customerController.prototype.modelsContainer.getModel("Customer");
		var data,
			id;

		async.waterfall(
			[
				function(callback) {
					if(typeof(request.body.customer) != "undefined") {
						data = request.body.customer;
						callback(null, data);
					} else {
// Throw 400 - Bad Request
						callback(new Error("400 - Bad Request"));
					}
				},
				function(data, callback) {
					if(typeof(request.params.id) == "undefined") {
// Create
						delete data._id;
						Customer.create(data, callback);
					} else {
// Update
						var id = request.params.id;
						delete data._id;						
						Customer.findByIdAndUpdate(id, { $set: data }, {}, callback);
					}
				},
				function(customer, callback) {
// Populate
					customerController.prototype.getCustomer(customer._id, callback);
				}
			],
			d.intercept(function(customer) {
				response.json(customer);
			})
		);
	});
}

exports = module.exports = customerController;