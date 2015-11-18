var domain = require("domain");

var getListItems = require("../../../../app/lib/controller/getListItems.js");

function productController(servicesContainer, modelsContainer) {
	productController.prototype.servicesContainer = servicesContainer;
	productController.prototype.modelsContainer = modelsContainer;
}

productController.prototype.editProductAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var Product = productController.prototype.modelsContainer.getModel("Product");
		var id;

		if(typeof(request.params.id) != "undefined") {
			id = request.params.id;

			Product.findOne({ _id: id }, d.intercept(function(product) {
				if(product != null) {
					response.locals.product = product;
					switch(request.params.contentType) {
						case "json":
							response.json(product);
							break;
						case "html":
						default:
							response.renderReact("product/Form", response.locals);
							break;
					}
				} else {
// Throw 404 - Not Found
					next(new Error("404 - Not Found"));
				}
			}));
		} else {
			response.renderReact("product/Form", response.locals);
		}
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
			{ name: "name", label: "Name", display: true },
			{ name: "supplier.name", label: "Supplier", display: true },
			{ name: "productCode", label: "Product Code", display: true },
			{ name: "price", label: "Price", display: true }
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
						response.renderReact("product/List", response.locals);
						break;
				}
			})
		);
	});
}

productController.prototype.deleteProductAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var Product = productController.prototype.modelsContainer.getModel("Product");
		var id;

		if(typeof(request.params.id) != "undefined") {
			id = request.params.id;
			Product.remove({ _id: id }, d.intercept(function() {
				response.redirect(response.locals.applicationUrl + "products");
			}));
		} else {
// Throw 400 - Bad Request
			next(new Error("400 - Bad Request"));
		}
	});
}

productController.prototype.saveProductAction = function(request, response, next) {
	var d = domain.create();

	d.on("error", next);

	d.run(function() {
		var Product = productController.prototype.modelsContainer.getModel("Product");
		var data,
			id;

		if(typeof(request.body.product) != "undefined") {
			if(typeof(request.params.id) == "undefined") {
// Create
				Product.create(data, d.intercept(function(createdProduct) {
					response.redirect(response.locals.applicationUrl + "product/" + createdProduct.id);
				}));
			} else {
// Update
				Product.findByIdAndUpdate(id, { $set: data }, {}, d.intercept(function(updatedProduct) {
					response.redirect(response.locals.applicationUrl + "product/" + updatedProduct.id);
				}));
			}
		} else {
// Throw 400 - Bad Request
			next(new Error("400 - Bad Request"));
		}
	});
}

exports = module.exports = productController;