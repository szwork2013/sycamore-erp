var domain = require("domain");
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var async = require("async");

var getListItems = require("../../../../app/lib/controller/getListItems.js");

function supplierController(servicesContainer, modelsContainer) {
	supplierController.prototype.servicesContainer = servicesContainer;
	supplierController.prototype.modelsContainer = modelsContainer;
}

supplierController.prototype.createSupplierAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		response.locals.template = "supplier/Create";

		var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
		var html = ReactDOMServer.renderToString(View({ locals: response.locals }));

		response.send(html);
	});
}

supplierController.prototype.editSupplierAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var id = request.params.id;
		supplierController
		.prototype
		.modelsContainer
		.getModel("Supplier")
		.findOne({ _id: id })
		.exec(d.intercept(function(supplier) {
			response.locals.supplier = supplier;
			response.locals.template = "supplier/Edit";

			var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
			var html = ReactDOMServer.renderToString(View({ locals: response.locals }));

			response.send(html);
		}));
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

supplierController.prototype.viewSupplierAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var id = request.params.id;
		supplierController
		.prototype
		.modelsContainer
		.getModel("Supplier")
		.findOne({ _id: id })
		.exec(d.intercept(function(supplier) {
			response.locals.supplier = supplier;
			response.locals.template = "supplier/View";

			var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
			var html = ReactDOMServer.renderToString(View({ locals: response.locals }));

			response.send(html);
		}));
	});
}

supplierController.prototype.deleteSupplierAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var id = request.params.id;
		supplierController
		.prototype
		.modelsContainer
		.getModel("Supplier")
		.remove({ _id: id })
		.exec(d.intercept(function() {
			response.redirect("/sycamore-erp/suppliers");
		}));
	});
}

supplierController.prototype.saveSupplierAction = function(request, response, next) {
	var d = domain.create();

	d.on("error", next);

	d.run(function() {
		var data = request.body.supplier;

		var supplier = supplierController
		.prototype
		.modelsContainer
		.getModel("Supplier")(data);

		supplier.save(d.intercept(function(createdSupplier) {
			response.redirect("/sycamore-erp/supplier/" + createdSupplier.id);
		}));
	});
}

supplierController.prototype.updateSupplierAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var id = request.params.id;
		var supplier = request.body.supplier;

		supplierController
		.prototype
		.modelsContainer
		.getModel("Supplier")
		.findByIdAndUpdate(id, { $set: supplier }, {}, d.intercept(function(updatedSupplier) {
			response.redirect("/sycamore-erp/supplier/" + updatedSupplier.id);
		}));
	});
}

exports = module.exports = supplierController;