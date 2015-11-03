var domain = require("domain");
var React = require("react");
var ReactDOMServer = require("react-dom/server");

function propertyController(servicesContainer, modelsContainer) {
	propertyController.prototype.servicesContainer = servicesContainer;
	propertyController.prototype.modelsContainer = modelsContainer;
}

propertyController.prototype.createPropertyAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		response.locals.template = "property/Create";

		var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
		var html = ReactDOMServer.renderToString(View({ locals: response.locals }));

		response.send(html);
	});
}

propertyController.prototype.editPropertyAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var id = request.params.id;
		propertyController
		.prototype
		.modelsContainer
		.getModel("Property")
		.findOne({ _id: id })
		.exec(d.intercept(function(property) {
			response.locals.property = property;
			response.locals.template = "property/Edit";

			var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
			var html = ReactDOMServer.renderToString(View({ locals: response.locals }));

			response.send(html);
		}));
	});
}

propertyController.prototype.listPropertiesAction = function(request, response, next) {
	var d = domain.create();
	
	d.on('error', next);
	
	d.run(function() {
		var list = response.locals.list;

		list.name = "properties";
		list.title = "Properties";

		list.columns = [
			{ name: "property.name", label: "Name", display: true }
		];

		list.entities = [];

		getListItems(
			propertyController.prototype.servicesContainer,
			propertyController.prototype.modelsContainer,
			"Property",
			list,
			d.intercept(function(list) {
				switch(request.params.contentType) {
					case 'json':
						response.json(list);
						break;
					case 'html':
					default:
						response.locals.list = list;
						response.locals.template = "property/List";

						var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
						var html = ReactDOMServer.renderToString(View({ locals: response.locals }));

						response.send(html);
						break;
				}
			})
		);
	});
}

propertyController.prototype.viewPropertyAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var id = request.params.id;
		propertyController
		.prototype
		.modelsContainer
		.getModel("Property")
		.findOne({ _id: id })
		.exec(d.intercept(function(property) {
			response.locals.property = property;
			response.locals.template = "property/View";

			var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
			var html = ReactDOMServer.renderToString(View({ locals: response.locals }));

			response.send(html);
		}));
	});
}

propertyController.prototype.deletePropertyAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var id = request.params.id;
		propertyController
		.prototype
		.modelsContainer
		.getModel("Property")
		.remove({ _id: id })
		.exec(d.intercept(function() {
			response.redirect("/sycamore-erp/propertys");
		}));
	});
}

propertyController.prototype.savePropertyAction = function(request, response, next) {
	var d = domain.create();

	d.on("error", next);

	d.run(function() {
		var data = request.body.property;

		var property = propertyController
		.prototype
		.modelsContainer
		.getModel("Property")(data);

		property.save(d.intercept(function(createdProperty) {
			response.redirect("/sycamore-erp/property/" + createdProperty.id);
		}));
	});
}

propertyController.prototype.updatePropertyAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var id = request.params.id;
		var property = request.body.property;

		propertyController
		.prototype
		.modelsContainer
		.getModel("Property")
		.findByIdAndUpdate(id, { $set: property }, {}, d.intercept(function(updatedProperty) {
			response.redirect("/sycamore-erp/property/" + updatedProperty.id);
		}));
	});
}

exports = module.exports = propertyController;