var domain = require("domain");
var async = require("async");

var getListItems = require("../../../../app/lib/controller/getListItems.js");

function productVariationGroupController(servicesContainer, modelsContainer) {
	productVariationGroupController.prototype.servicesContainer = servicesContainer;
	productVariationGroupController.prototype.modelsContainer = modelsContainer;
}

productVariationGroupController.prototype.getProductVariationGroup = function(id, callback) {
	var d = domain.create();
	
	d.on("error", callback);
	
	d.run(function() {
		if(id != null) {
			var ProductVariationGroup = productVariationGroupController.prototype.modelsContainer.getModel("ProductVariationGroup");
			ProductVariationGroup.findOne({ _id: id }).exec(callback);
		} else {
			callback();
		}
	});
}

productVariationGroupController.prototype.editProductVariationGroupAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var ProductVariationGroup = productVariationGroupController.prototype.modelsContainer.getModel("ProductVariationGroup");
		var id;

		if(typeof(request.params.id) != "undefined") {
			id = request.params.id;

			ProductVariationGroup.findOne({ _id: id }, d.intercept(function(productVariationGroup) {
				if(productVariationGroup != null) {
					response.locals.productVariationGroup = productVariationGroup;
					switch(request.params.contentType) {
						case "json":
							response.json(productVariationGroup);
							break;
						case "html":
						default:
							response.renderReact("productVariationGroup/Form", response.locals);
							break;
					}
				} else {
// Throw 404 - Not Found
					next(new Error("404 - Not Found"));
				}
			}));
		} else {
			response.renderReact("productVariationGroup/Form", response.locals);
		}
	});
}

productVariationGroupController.prototype.listProductVariationGroupsAction = function(request, response, next) {
	var d = domain.create();
	
	d.on('error', next);
	
	d.run(function() {
		var list = response.locals.list;

		list.name = "productVariationGroups";
		list.title = "ProductVariationGroups";

		list.columns = [
			{ name: "name", label: "Name", display: true }
		];

		list.entities = [];

		getListItems(
			productVariationGroupController.prototype.servicesContainer,
			productVariationGroupController.prototype.modelsContainer,
			"ProductVariationGroup",
			list,
			d.intercept(function(list) {
				switch(request.params.contentType) {
					case 'json':
						response.json(list);
						break;
					case 'html':
					default:
						response.locals.list = list;
						response.renderReact("productVariationGroup/List", response.locals);
						break;
				}
			})
		);
	});
}

productVariationGroupController.prototype.deleteProductVariationGroupAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var ProductVariationGroup = productVariationGroupController.prototype.modelsContainer.getModel("ProductVariationGroup");
		var id;

		if(typeof(request.params.id) != "undefined") {
			id = request.params.id;
			ProductVariationGroup.remove({ _id: id }, d.intercept(function() {
				response.redirect(response.locals.applicationUrl + "productVariationGroups");
			}));
		} else {
// Throw 400 - Bad Request
			next(new Error("400 - Bad Request"));
		}
	});
}

productVariationGroupController.prototype.saveProductVariationGroupAction = function(request, response, next) {
	var d = domain.create();

	d.on("error", next);

	d.run(function() {
		var ProductVariationGroup = productVariationGroupController.prototype.modelsContainer.getModel("ProductVariationGroup");
		var data,
			id;

		async.waterfall(
			[
				function(callback) {
					if(typeof(request.body.productVariationGroup) != "undefined") {
						data = request.body.productVariationGroup;
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
						ProductVariationGroup.create(data, callback);
					} else {
// Update
						var id = request.params.id;
						delete data._id;						
						ProductVariationGroup.findByIdAndUpdate(id, { $set: data }, {}, callback);
					}
				},
				function(productVariationGroup, callback) {
// Populate
					productVariationGroupController.prototype.getProductVariationGroup(productVariationGroup._id, callback);
				}
			],
			d.intercept(function(productVariationGroup) {
				response.json(productVariationGroup);
			})
		);
	});
}

exports = module.exports = productVariationGroupController;