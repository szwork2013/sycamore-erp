var domain = require("domain");

var getListItems = require("../../../../app/lib/controller/getListItems.js");

function orderController(servicesContainer, modelsContainer) {
	orderController.prototype.servicesContainer = servicesContainer;
	orderController.prototype.modelsContainer = modelsContainer;
}

orderController.prototype.editOrderAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var Order = orderController.prototype.modelsContainer.getModel("Order");
		var id;

		if(typeof(request.params.id) != "undefined") {
			id = request.params.id;

			Order.findOne({ _id: id }).populate([{ path: "customer"}, { path: "property" }, { path: "products.product" }]).exec(d.intercept(function(order) {
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

		if(typeof(request.body.order) != "undefined") {
			var data = request.body.order;
			
			if(typeof(request.params.id) == "undefined") {
// Create
				delete data._id;
				
				Order.create(data, d.intercept(function(createdOrder) {
					response.json(createdOrder);
				}));
			} else {
// Update
				Order.findByIdAndUpdate(id, { $set: data }, {}, d.intercept(function(updatedOrder) {
					response.json(updatedOrder);
				}));
			}
		} else {
// Throw 400 - Bad Request
			next(new Error("400 - Bad Request"));
		}
	});
}

exports = module.exports = orderController;