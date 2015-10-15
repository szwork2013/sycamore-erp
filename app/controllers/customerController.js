var domain = require("domain");

function customerController(servicesContainer, modelsContainer) {
	customerController.prototype.servicesContainer = servicesContainer;
	customerController.prototype.modelsContainer = modelsContainer;
}

customerController.prototype.createCustomerAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		response.locals.template = "customer/Create";

		var React = require("react");
		var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
		var html = React.renderToString(View({ locals: response.locals }));

		response.send(html);
	});
}

customerController.prototype.editCustomerAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var id = request.params.id;
		customerController
		.prototype
		.modelsContainer
		.getModel("Customer")
		.findOne({ _id: id })
		.exec(d.intercept(function(customer) {
			response.locals.customer = customer;
			response.locals.template = "customer/Edit";

			var React = require("react");
			var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
			var html = React.renderToString(View({ locals: response.locals }));

			response.send(html);
		}));
	});
}

customerController.prototype.listCustomersAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		customerController
		.prototype
		.modelsContainer
		.getModel("Customer")
		.find({})
		.exec(d.intercept(function(customers) {
			response.locals.customers = customers;
			response.locals.template = "customer/List";

			var React = require("react");
			var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
			var html = React.renderToString(View({ locals: response.locals }));

			response.send(html);
		}));
	});
}

customerController.prototype.viewCustomerAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var id = request.params.id;
		customerController
		.prototype
		.modelsContainer
		.getModel("Customer")
		.findOne({ _id: id })
		.exec(d.intercept(function(customer) {
			response.locals.customer = customer;
			response.locals.template = "customer/View";

			var React = require("react");
			var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
			var html = React.renderToString(View({ locals: response.locals }));

			response.send(html);
		}));
	});
}

customerController.prototype.deleteCustomerAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var id = request.params.id;
		customerController
		.prototype
		.modelsContainer
		.getModel("Customer")
		.remove({ _id: id })
		.exec(d.intercept(function() {
			response.redirect("/sycamore-erp/customers");
		}));
	});
}

customerController.prototype.saveCustomerAction = function(request, response, next) {
	var d = domain.create();

	d.on("error", next);

	d.run(function() {
		var data = request.body.customer;

		var customer = customerController
		.prototype
		.modelsContainer
		.getModel("Customer")(data);

		customer.save(d.intercept(function(createdCustomer) {
			response.redirect("/sycamore-erp/customer/" + createdCustomer.id);
		}));
	});
}

customerController.prototype.updateCustomerAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var id = request.params.id;
		var customer = request.body.customer;

		customerController
		.prototype
		.modelsContainer
		.getModel("Customer")
		.findByIdAndUpdate(id, { $set: customer }, {}, d.intercept(function(updatedCustomer) {
			response.redirect("/sycamore-erp/customer/" + updatedCustomer.id);
		}));
	});
}

exports = module.exports = customerController;