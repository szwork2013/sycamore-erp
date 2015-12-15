var domain = require("domain");
var async = require("async");

var getListItems = require("../../../../app/lib/controller/getListItems.js");

function orderController(servicesContainer, modelsContainer) {
	orderController.prototype.servicesContainer = servicesContainer;
	orderController.prototype.modelsContainer = modelsContainer;
}

orderController.prototype.getOrder = function(id, callback) {
	var d = domain.create();
	
	d.on("error", callback);
	
	d.run(function() {
		if(id != null) {
			var Order = orderController.prototype.modelsContainer.getModel("Order");
			Order.findOne({ _id: id }).populate([{ path: "customer"}, { path: "property" }, { path: "products.product" }]).exec(callback);
		} else {
			callback();
		}
	});
}

orderController.prototype.editOrderAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {

		var id;

		if(typeof(request.params.id) != "undefined") {
			id = request.params.id;

			orderController.prototype.getOrder(id, d.intercept(function(order) {
				if(order != null) {
					response.locals.order = order;
					switch(request.params.contentType) {
						case "json":
							response.json(order);
							break;
						case "html":
						default:
							response.renderReact("order/Form", response.locals);
							break;
					}
				} else {
// Throw 404 - Not Found
					next(new Error("404 - Not Found"));
				}
			}));
		} else {
			response.renderReact("order/Form", response.locals);
		}
	});
}

orderController.prototype.viewOrderAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {

		var id;

		if(typeof(request.params.id) != "undefined") {
			order_id = request.params.order_id;
/*
			orderController.prototype.getOrder(order_id, d.intercept(function(order) {
				if(order != null) {
					response.locals.order = order;
					switch(request.params.contentType) {
						case "json":
							response.json(order);
							break;
						case "html":
						default:
*/
							response.renderReact("order/View", response.locals);
/*
							break;
					}
				} else {
// Throw 404 - Not Found
					next(new Error("404 - Not Found"));
				}
			}));
*/
		} else {
			response.renderReact("order/Form", response.locals);
		}
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
			{ name: "customer.name", label: "Customer", display: true },
			{ name: "property.address.line1", label: "Property Address", display: true },
			{ name: "subTotal", label: "Sub Total", display: true },
			{ name: "VAT", label: "VAT", display: true },
			{ name: "total", label: "Total", display: true }
		];

		list.entities = [];

		list.populate = [
			{
				path: "customer",
				select: "name"
			}, {
				path: "property",
				select: "address.line1"
			}
		];

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
						response.renderReact("order/List", response.locals);
						break;
				}
			})
		);
	});
}

orderController.prototype.deleteOrderAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var Order = orderController.prototype.modelsContainer.getModel("Order");
		var id;

		if(typeof(request.params.id) != "undefined") {
			id = request.params.id;
			Order.remove({ _id: id }, d.intercept(function() {
				response.redirect(response.locals.applicationUrl + "orders");
			}));
		} else {
// Throw 400 - Bad Request
			next(new Error("400 - Bad Request"));
		}
	});
}

orderController.prototype.saveOrderAction = function(request, response, next) {
	var d = domain.create();

	d.on("error", next);

	d.run(function() {
		var Order = orderController.prototype.modelsContainer.getModel("Order");
		var data,
			id;

		async.waterfall(
			[
				function(callback) {
					if(typeof(request.body.order) != "undefined") {
						data = request.body.order;
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
						Order.create(data, callback);
					} else {
// Update
						var id = request.params.id;
						delete data._id;						
						Order.findByIdAndUpdate(id, { $set: data }, {}, callback);
					}
				},
				function(order, callback) {
// Populate
					orderController.prototype.getOrder(order._id, callback);
				}
			],
			d.intercept(function(order) {
				response.json(order);
			})
		);
	});
}

exports = module.exports = orderController;