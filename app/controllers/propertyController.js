var domain = require("domain");
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var async = require("async");

var getListItems = require("../../../../app/lib/controller/getListItems.js");

function propertyController(servicesContainer, modelsContainer) {
	propertyController.prototype.servicesContainer = servicesContainer;
	propertyController.prototype.modelsContainer = modelsContainer;
}

propertyController.prototype.editPropertyAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var Property = propertyController.prototype.modelsContainer.getModel("Property");
		var id;

		if(typeof(request.params.id) != "undefined") {
			id = request.params.id;

			Property.findOne({ _id: id }, d.intercept(function(property) {
				if(property != null) {
					response.locals.property = property;
					switch(request.params.contentType) {
						case "json":
							response.json(property);
							break;
						case "html":
						default:
							response.renderReact("property/Form", response.locals);
							break;
					}
				} else {
// Throw 404 - Not Found
					next(new Error("404 - Not Found"));
				}
			}));
		} else {
			response.renderReact("property/Form", response.locals);
		}
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
			{ name: "name", label: "Name", display: true }
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
						response.renderReact("property/List", response.locals);
						break;
				}
			})
		);
	});
}

propertyController.prototype.deletePropertyAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var Property = propertyController.prototype.modelsContainer.getModel("Property");
		var id;

		if(typeof(request.params.id) != "undefined") {
			id = request.params.id;
			Property.remove({ _id: id }, d.intercept(function() {
				response.redirect(response.locals.applicationUrl + "propertys");
			}));
		} else {
// Throw 400 - Bad Request
			next(new Error("400 - Bad Request"));
		}
	});
}

propertyController.prototype.savePropertyAction = function(request, response, next) {
	var d = domain.create();

	d.on("error", next);

	d.run(function() {
		var Property = propertyController.prototype.modelsContainer.getModel("Property");
		var data,
			id;

		if(typeof(request.body.property) != "undefined") {
			if(typeof(request.params.id) == "undefined") {
// Create
				Property.create(data, d.intercept(function(createdProperty) {
					response.redirect(response.locals.applicationUrl + "property/" + createdProperty.id);
				}));
			} else {
// Update
				Property.findByIdAndUpdate(id, { $set: data }, {}, d.intercept(function(updatedProperty) {
					response.redirect(response.locals.applicationUrl + "property/" + updatedProperty.id);
				}));
			}
		} else {
// Throw 400 - Bad Request
			next(new Error("400 - Bad Request"));
		}
	});
}

exports = module.exports = propertyController;