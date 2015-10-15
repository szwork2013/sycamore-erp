var domain = require("domain");

function orderController(servicesContainer, modelsContainer) {
	orderController.prototype.servicesContainer = servicesContainer;
	orderController.prototype.modelsContainer = modelsContainer;
}

orderController.prototype.createOrderAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		response.locals.template = "order/Create";

		var React = require("react");
		var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
		var html = React.renderToString(View({ locals: response.locals }));

		response.send(html);
	});
}

orderController.prototype.editOrderAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var id = request.params.id;
		orderController
		.prototype
		.modelsContainer
		.getModel("Order")
		.findOne({ _id: id })
		.exec(d.intercept(function(order) {
			response.locals.order = order;
			response.locals.template = "order/Edit";

			var React = require("react");
			var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
			var html = React.renderToString(View({ locals: response.locals }));

			response.send(html);
		}));
	});
}

orderController.prototype.listOrdersAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		orderController
		.prototype
		.modelsContainer
		.getModel("Order")
		.find({})
		.exec(d.intercept(function(orders) {
			response.locals.orders = orders;
			response.locals.template = "order/List";

			var React = require("react");
			var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
			var html = React.renderToString(View({ locals: response.locals }));

			response.send(html);
		}));
	});
}

orderController.prototype.viewOrderAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var id = request.params.id;
		orderController
		.prototype
		.modelsContainer
		.getModel("Order")
		.findOne({ _id: id })
		.exec(d.intercept(function(order) {
			response.locals.order = order;
			response.locals.template = "order/View";

			var React = require("react");
			var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
			var html = React.renderToString(View({ locals: response.locals }));

			response.send(html);
		}));
	});
}

orderController.prototype.deleteOrderAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var id = request.params.id;
		orderController
		.prototype
		.modelsContainer
		.getModel("Order")
		.remove({ _id: id })
		.exec(d.intercept(function() {
			response.redirect("/sycamore-erp/orders");
		}));
	});
}

orderController.prototype.saveOrderAction = function(request, response, next) {
	var d = domain.create();

	d.on("error", next);

	d.run(function() {
		var data = request.body.order;

		var order = orderController
		.prototype
		.modelsContainer
		.getModel("Order")(data);

		order.save(d.intercept(function(createdOrder) {
			response.redirect("/sycamore-erp/order/" + createdOrder.id);
		}));
	});
}

orderController.prototype.updateOrderAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var id = request.params.id;
		var order = request.body.order;

		orderController
		.prototype
		.modelsContainer
		.getModel("Order")
		.findByIdAndUpdate(id, { $set: order }, {}, d.intercept(function(updatedOrder) {
			response.redirect("/sycamore-erp/order/" + updatedOrder.id);
		}));
	});
}

exports = module.exports = orderController;