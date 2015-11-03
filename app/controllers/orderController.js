var domain = require("domain");
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var async = require("async");

var getListItems = require("../../../../app/lib/controller/getListItems.js");

function orderController(servicesContainer, modelsContainer) {
	orderController.prototype.servicesContainer = servicesContainer;
	orderController.prototype.modelsContainer = modelsContainer;
}

orderController.prototype.createOrderAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		response.locals.template = "order/Create";

		var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
		var html = ReactDOMServer.renderToString(View({ locals: response.locals }));

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

			var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
			var html = ReactDOMServer.renderToString(View({ locals: response.locals }));

			response.send(html);
		}));
	});
}

orderController.prototype.listOrdersAction = function(request, response, next) {
	var d = domain.create();
	
	d.on('error', next);
	
	d.run(function() {
		var list = response.locals.list;

		list.name = "orders";
		list.title = "Orders";

		list.columns = [
			{ name: "customer", label: "Customer Name", display: true },
			{ name: "property", label: "Property Name", display: true },
			{ name: "subTotal", label: "Sub Total", display: true },
			{ name: "VAT", label: "VAT", display: true },
			{ name: "total", label: "Total", display: true }
		];

		list.entities = [];

		getListItems(
			orderController.prototype.servicesContainer,
			orderController.prototype.modelsContainer,
			"Order",
			list,
			d.intercept(function(list) {
				switch(request.params.contentType) {
					case 'json':
						response.json(list);
						break;
					case 'html':
					default:
						response.locals.list = list;
						response.locals.template = "order/List";

						var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
						var html = ReactDOMServer.renderToString(View({ locals: response.locals }));

						response.send(html);
						break;
				}
			})
		);
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

			var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
			var html = ReactDOMServer.renderToString(View({ locals: response.locals }));

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

console.log(data);

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