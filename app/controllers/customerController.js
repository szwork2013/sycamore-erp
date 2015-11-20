var domain = require("domain");

var getListItems = require("../../../../app/lib/controller/getListItems.js");

function customerController(servicesContainer, modelsContainer) {
	customerController.prototype.servicesContainer = servicesContainer;
	customerController.prototype.modelsContainer = modelsContainer;
}

customerController.prototype.editCustomerAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var Customer = customerController.prototype.modelsContainer.getModel("Customer");
		var id;

		if(typeof(request.params.id) != "undefined") {
			id = request.params.id;

			Customer.findOne({ _id: id }, d.intercept(function(customer) {
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

		if(typeof(request.body.customer) != "undefined") {
			var data = request.body.customer;
			
			if(typeof(request.params.id) == "undefined") {
// Create
				Customer.create(data, d.intercept(function(createdCustomer) {
					response.json(createdCustomer);
				}));
			} else {
// Update
				Customer.findByIdAndUpdate(id, { $set: data }, {}, d.intercept(function(updatedCustomer) {
					response.json(updatedCustomer);
				}));
			}
		} else {
// Throw 400 - Bad Request
			next(new Error("400 - Bad Request"));
		}
	});
}

exports = module.exports = customerController;