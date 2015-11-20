var domain = require("domain");
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var async = require("async");

var getListItems = require("../../../../app/lib/controller/getListItems.js");

function supplierController(servicesContainer, modelsContainer) {
	supplierController.prototype.servicesContainer = servicesContainer;
	supplierController.prototype.modelsContainer = modelsContainer;
}

supplierController.prototype.editSupplierAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var Supplier = supplierController.prototype.modelsContainer.getModel("Supplier");
		var id;

		if(typeof(request.params.id) != "undefined") {
			id = request.params.id;

			Supplier.findOne({ _id: id }, d.intercept(function(supplier) {
				if(supplier != null) {
					response.locals.supplier = supplier;
					switch(request.params.contentType) {
						case "json":
							response.json(supplier);
							break;
						case "html":
						default:
							response.renderReact("supplier/Form", response.locals);
							break;
					}
				} else {
// Throw 404 - Not Found
					next(new Error("404 - Not Found"));
				}
			}));
		} else {
			response.renderReact("supplier/Form", response.locals);
		}
	});
}

supplierController.prototype.listSuppliersAction = function(request, response, next) {
	var d = domain.create();
	
	d.on('error', next);
	
	d.run(function() {
		var list = response.locals.list;

		list.name = "suppliers";
		list.title = "Suppliers";

		list.columns = [
			{ name: "name", label: "Name", display: true }
		];

		list.entities = [];

		getListItems(
			supplierController.prototype.servicesContainer,
			supplierController.prototype.modelsContainer,
			"Supplier",
			list,
			d.intercept(function(list) {
				switch(request.params.contentType) {
					case 'json':
						response.json(list);
						break;
					case 'html':
					default:
						response.locals.list = list;
						response.locals.template = "supplier/List";

						var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
						var html = ReactDOMServer.renderToString(View({ locals: response.locals }));

						response.send(html);
						break;
				}
			})
		);
	});
}

supplierController.prototype.deleteSupplierAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var Supplier = supplierController.prototype.modelsContainer.getModel("Supplier");
		var id;

		if(typeof(request.params.id) != "undefined") {
			id = request.params.id;
			Supplier.remove({ _id: id }, d.intercept(function() {
				response.redirect(response.locals.applicationUrl + "suppliers");
			}));
		} else {
// Throw 400 - Bad Request
			next(new Error("400 - Bad Request"));
		}
	});
}

supplierController.prototype.saveSupplierAction = function(request, response, next) {
	var d = domain.create();

	d.on("error", next);

	d.run(function() {
		var Supplier = supplierController.prototype.modelsContainer.getModel("Supplier");
		var data,
			id;

		if(typeof(request.body.supplier) != "undefined") {
			var data = request.body.supplier;

			if(typeof(request.params.id) == "undefined") {
// Create
				delete data._id;
				
				Supplier.create(data, d.intercept(function(createdSupplier) {
					response.json(createdSupplier);
				}));
			} else {
// Update
				Supplier.findByIdAndUpdate(id, { $set: data }, {}, d.intercept(function(updatedSupplier) {
					response.json(updatedSupplier);
				}));
			}
		} else {
// Throw 400 - Bad Request
			next(new Error("400 - Bad Request"));
		}
	});
}

exports = module.exports = supplierController;