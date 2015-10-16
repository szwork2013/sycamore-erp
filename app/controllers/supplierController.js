var domain = require("domain");

function supplierController(servicesContainer, modelsContainer) {
	supplierController.prototype.servicesContainer = servicesContainer;
	supplierController.prototype.modelsContainer = modelsContainer;
}

supplierController.prototype.createSupplierAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		response.locals.template = "supplier/Create";

		var React = require("react");
		var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
		var html = React.renderToString(View({ locals: response.locals }));

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

			var React = require("react");
			var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
			var html = React.renderToString(View({ locals: response.locals }));

			response.send(html);
		}));
	});
}

supplierController.prototype.listSuppliersAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var contentType = "html";

		if(request.params.contentType != "undefined") {
			contentType = request.params.contentType;
		}

		supplierController
		.prototype
		.modelsContainer
		.getModel("Supplier")
		.find({})
		.exec(d.intercept(function(suppliers) {
			switch(contentType) {
				case "json":
					var data = {};
					data.items = suppliers;

					response.json(data);
					break;

				default:
				case "html":
					response.locals.suppliers = suppliers;
					response.locals.template = "supplier/List";

					var React = require("react");
					var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
					var html = React.renderToString(View({ locals: response.locals }));

					response.send(html);
					break;
			}
		}));
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

			var React = require("react");
			var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
			var html = React.renderToString(View({ locals: response.locals }));

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