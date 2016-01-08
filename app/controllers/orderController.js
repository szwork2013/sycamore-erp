var domain = require("domain");
var async = require("async");
var mandrill = require('mandrill-api/mandrill');

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

orderController.prototype.confirmOrderAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var Order = orderController.prototype.modelsContainer.getModel("Order");
		var order_id;

		if(typeof(request.params.order_id) != "undefined") {
			order_id = request.params.order_id;

			Order.findByIdAndUpdate(order_id, { $set: { status: "Accepted" } }, {}, d.intercept(function(updatedOrder) {
				orderController.prototype.getOrder(order_id, d.intercept(function(order) {
					if(order != null) {
						response.locals.order = order;
						response.renderReact("order/View", response.locals);	
					} else {
// Throw 404 - Not Found
						next(new Error("404 - Not Found"));
					}
				}));
			}));
		} else {
			response.renderReact("order/View", response.locals);
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

orderController.prototype.sendEmailOrderAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {

		var id;

		if(typeof(request.params.id) != "undefined") {
			id = request.params.id;

			orderController.prototype.getOrder(id, d.intercept(function(order) {
				if(order != null) {
					var customerName = order.billing.customerName;
//					var customerId = order.customer._id;
					var orderId = order._id;
					var email = order.billing.email;
					var orderUrl = "http://admin.fusionfurnituresolutions.co.uk/sycamore-erp/customer/a/order/" + orderId;
	
					mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_APIKEY);
					var template_name = "order-confirmation";
					var template_content = [
						{ "name": "name",		"content": customerName },
						{ "name": "orderurl",	"content": orderUrl }
					];
					var message = {
						"to": [{
								"email": email,
								"name": customerName,
								"type": "to"
							}],
				 		"merge": true,
				    	"merge_language": "mailchimp",
				    	"global_merge_vars": template_content
					};
					var async = false;

					mandrill_client.messages.sendTemplate(
						{
							"template_name": template_name,
							"template_content": template_content,
							"message": message,
							"async": async
						},
						function(result) {
							response.redirect("/sycamore-erp/order/" + orderId);
						},
						function(e) {
							next(e);
						}
					);
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
		var order_id;

		if(typeof(request.params.order_id) != "undefined") {
			order_id = request.params.order_id;

			orderController.prototype.getOrder(order_id, d.intercept(function(order) {
				if(order != null) {
					response.locals.order = order;
					response.renderReact("order/View", response.locals);
				} else {
// Throw 404 - Not Found
					next(new Error("404 - Not Found"));
				}
			}));
		} else {
			response.renderReact("order/View", response.locals);
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
			{ name: "status", label: "Status", display: true },
			{ name: "billing.customerName", label: "Customer", display: true },
			{ name: "billing.companyName", label: "Company", display: true },
			{ name: "delivery.address.line1", label: "Delivery Address", display: true },
			{ name: "subTotal", label: "Sub Total", display: true },
			{ name: "VAT", label: "VAT", display: true },
			{ name: "total", label: "Total", display: true }
		];

		list.entities = [];

		list.populate = [];

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