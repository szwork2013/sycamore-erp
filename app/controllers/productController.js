var domain = require("domain");
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var async = require("async");

var getListItems = require("../../../../app/lib/controller/getListItems.js");

function productController(servicesContainer, modelsContainer) {
	productController.prototype.servicesContainer = servicesContainer;
	productController.prototype.modelsContainer = modelsContainer;
}

productController.prototype.createProductAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		response.locals.template = "product/Create";

		var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
		var html = ReactDOMServer.renderToString(View({ locals: response.locals }));

		response.send(html);
	});
}

productController.prototype.editProductAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var id = request.params.id;
		productController
		.prototype
		.modelsContainer
		.getModel("Product")
		.findOne({ _id: id })
		.populate("supplier")
		.exec(d.intercept(function(product) {
			response.locals.product = product;
			response.locals.template = "product/Edit";

			var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
			var html = ReactDOMServer.renderToString(View({ locals: response.locals }));

			response.send(html);
		}));
	});
}

productController.prototype.listProductsAction = function(request, response, next) {
	var d = domain.create();
	
	d.on('error', next);
	
	d.run(function() {
		var list = response.locals.list;

		list.name = "products";
		list.title = "Products";

		list.columns = [
			{ name: "product.customer.name", label: "Customer Name", display: true }
		];

		list.entities = [];

		getListItems(
			productController.prototype.servicesContainer,
			productController.prototype.modelsContainer,
			"Product",
			list,
			d.intercept(function(list) {
				switch(request.params.contentType) {
					case 'json':
						response.json(list);
						break;
					case 'html':
					default:
						response.locals.list = list;
						response.locals.template = "product/List";

						var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
						var html = ReactDOMServer.renderToString(View({ locals: response.locals }));

						response.send(html);
						break;
				}
			})
		);
	});
}

productController.prototype.viewProductAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var id = request.params.id;
		productController
		.prototype
		.modelsContainer
		.getModel("Product")
		.findOne({ _id: id })
		.populate("supplier")
		.exec(d.intercept(function(product) {
			response.locals.product = product;
			response.locals.template = "product/View";

			var React = require("react");
			var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
			var html = React.renderToString(View({ locals: response.locals }));

			response.send(html);
		}));
	});
}

productController.prototype.deleteProductAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var id = request.params.id;
		productController
		.prototype
		.modelsContainer
		.getModel("Product")
		.remove({ _id: id })
		.exec(d.intercept(function() {
			response.redirect("/sycamore-erp/products");
		}));
	});
}

productController.prototype.saveProductAction = function(request, response, next) {
	var d = domain.create();

	d.on("error", next);

	d.run(function() {
		var data = request.body.product;

		var product = productController
		.prototype
		.modelsContainer
		.getModel("Product")(data);

		product.save(d.intercept(function(createdProduct) {
			response.redirect("/sycamore-erp/product/" + createdProduct.id);
		}));
	});
}

productController.prototype.updateProductAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var id = request.params.id;
		var product = request.body.product;

		productController
		.prototype
		.modelsContainer
		.getModel("Product")
		.findByIdAndUpdate(id, { $set: product }, {}, d.intercept(function(updatedProduct) {
			response.redirect("/sycamore-erp/product/" + updatedProduct.id);
		}));
	});
}

exports = module.exports = productController;