var domain = require("domain");
var async = require("async");

var getListItems = require("../../../../app/lib/controller/getListItems.js");

function productVariationController(servicesContainer, modelsContainer) {
	productVariationController.prototype.servicesContainer = servicesContainer;
	productVariationController.prototype.modelsContainer = modelsContainer;
}

productVariationController.prototype.getProductVariation = function(id, callback) {
	var d = domain.create();
	
	d.on("error", callback);
	
	d.run(function() {
		if(id != null) {
			var ProductVariation = productVariationController.prototype.modelsContainer.getModel("ProductVariation");
			ProductVariation.findOne({ _id: id }).exec(callback);
		} else {
			callback();
		}
	});
}

productVariationController.prototype.editProductVariationAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var ProductVariation = productVariationController.prototype.modelsContainer.getModel("ProductVariation");
		var id;

		if(typeof(request.params.id) != "undefined") {
			id = request.params.id;

			ProductVariation.findOne({ _id: id }, d.intercept(function(productVariation) {
				if(productVariation != null) {
					response.locals.productVariation = productVariation;
					switch(request.params.contentType) {
						case "json":
							response.json(productVariation);
							break;
						case "html":
						default:
							response.renderReact("productVariation/Form", response.locals);
							break;
					}
				} else {
// Throw 404 - Not Found
					next(new Error("404 - Not Found"));
				}
			}));
		} else {
			response.renderReact("productVariation/Form", response.locals);
		}
	});
}

productVariationController.prototype.listProductVariationsAction = function(request, response, next) {
	var d = domain.create();
	
	d.on('error', next);
	
	d.run(function() {
		var list = response.locals.list;

		list.name = "productVariations";
		list.title = "Product Variations";

		list.columns = [
			{ name: "name", label: "Name", display: true }
		];

		list.entities = [];

		getListItems(
			productVariationController.prototype.servicesContainer,
			productVariationController.prototype.modelsContainer,
			"ProductVariation",
			list,
			d.intercept(function(list) {
				switch(request.params.contentType) {
					case 'json':
						response.json(list);
						break;
					case 'html':
					default:
						response.locals.list = list;
						response.renderReact("productVariation/List", response.locals);
						break;
				}
			})
		);
	});
}

productVariationController.prototype.deleteProductVariationAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var ProductVariation = productVariationController.prototype.modelsContainer.getModel("ProductVariation");
		var id;

		if(typeof(request.params.id) != "undefined") {
			id = request.params.id;
			ProductVariation.remove({ _id: id }, d.intercept(function() {
				response.redirect(response.locals.applicationUrl + "productVariations");
			}));
		} else {
// Throw 400 - Bad Request
			next(new Error("400 - Bad Request"));
		}
	});
}

productVariationController.prototype.saveProductVariationAction = function(request, response, next) {
	var d = domain.create();

	d.on("error", next);

	d.run(function() {
		var ProductVariation = productVariationController.prototype.modelsContainer.getModel("ProductVariation");
		var data,
			id;

		async.waterfall(
			[
				function(callback) {
					if(typeof(request.body.productVariation) != "undefined") {
						data = request.body.productVariation;
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
						ProductVariation.create(data, callback);
					} else {
// Update
						var id = request.params.id;
						delete data._id;						
						ProductVariation.findByIdAndUpdate(id, { $set: data }, {}, callback);
					}
				},
				function(productVariation, callback) {
// Populate
					productVariationController.prototype.getProductVariation(productVariation._id, callback);
				}
			],
			d.intercept(function(productVariation) {
				response.json(productVariation);
			})
		);
	});
}

exports = module.exports = productVariationController;