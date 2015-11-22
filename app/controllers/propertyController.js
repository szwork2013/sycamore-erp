var domain = require("domain");
var async = require("async");

var getListItems = require("../../../../app/lib/controller/getListItems.js");

function propertyController(servicesContainer, modelsContainer) {
	propertyController.prototype.servicesContainer = servicesContainer;
	propertyController.prototype.modelsContainer = modelsContainer;
}

propertyController.prototype.getProperty = function(id, callback) {
	var d = domain.create();
	
	d.on("error", callback);
	
	d.run(function() {
		if(id != null) {
			var Property = propertyController.prototype.modelsContainer.getModel("Property");
			Property.findOne({ _id: id }).populate([{ select: "customer" }]).exec(callback);
		} else {
			callback();
		}
	});
}

propertyController.prototype.editPropertyAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var id;

		if(typeof(request.params.id) != "undefined") {
			id = request.params.id;

			propertyController.prototype.getProperty(id, d.intercept(function(property) {
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
	
	d.on("error", next);
	
	d.run(function() {
		var list = response.locals.list;

		list.name = "properties";
		list.title = "Properties";

		list.columns = [
			{ name: "address.line1", label: "Address Line 1", display: true },
			{ name: "address.line2", label: "Address Line 2", display: true },
			{ name: "address.line3", label: "Address Line 3", display: true },
			{ name: "address.line4", label: "Address Line 4", display: true },
			{ name: "address.postCode", label: "Address Post Code", display: true },
			{ name: "customer.name", label: "Customer", display: true },
			{ name: "telephone", label: "Telephone", display: true },
			{ name: "accessArrangements", label: "Access Arrangements", display: true }
		];

		list.entities = [];

		list.populate = [
			{
				path: "customer",
				select: "name"
			}
		];

		getListItems(
			propertyController.prototype.servicesContainer,
			propertyController.prototype.modelsContainer,
			"Property",
			list,
			d.intercept(function(list) {
				switch(request.params.contentType) {
					case "json":
						response.json(list);
						break;
					case "html":
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

		async.waterfall(
			[
				function(callback) {
					if(typeof(request.body.property) != "undefined") {
						data = request.body.property;
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
						Property.create(data, callback);
					} else {
// Update
						var id = request.params.id;
						delete data._id;						
						Property.findByIdAndUpdate(id, { $set: data }, {}, callback);
					}
				},
				function(property, callback) {
// Populate
					propertyController.prototype.getProperty(property._id, callback);
				}
			],
			d.intercept(function(property) {
				response.json(property);
			})
		);
	});
}

exports = module.exports = propertyController;