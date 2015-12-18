var domain = require("domain");
var async = require("async");
var mandrill = require('mandrill-api/mandrill');

var objectAssign = require("object-assign");

var getListItems = require("../../../../app/lib/controller/getListItems.js");

function quoteController(servicesContainer, modelsContainer) {
	quoteController.prototype.servicesContainer = servicesContainer;
	quoteController.prototype.modelsContainer = modelsContainer;
}

quoteController.prototype.getQuote = function(id, callback) {
	var d = domain.create();
	
	d.on("error", callback);
	
	d.run(function() {
		if(id != null) {
			var Quote = quoteController.prototype.modelsContainer.getModel("Quote");
			Quote.findOne({ _id: id }).populate([{ path: "customer"}, { path: "property" }, { path: "products.product" }]).exec(callback);
		} else {
			callback();
		}
	});
}

quoteController.prototype.confirmQuoteAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var Quote = quoteController.prototype.modelsContainer.getModel("Quote");
		var quote_id;

		if(typeof(request.params.quote_id) != "undefined") {
			quote_id = request.params.quote_id;

			Quote.findByIdAndUpdate(quote_id, { $set: { status: "Accepted" } }, {}, d.intercept(function(updatedQuote) {
				quoteController.prototype.getQuote(quote_id, d.intercept(function(quote) {
					if(quote != null) {
						response.locals.quote = quote;
						response.renderReact("quote/View", response.locals);	
					} else {
// Throw 404 - Not Found
						next(new Error("404 - Not Found"));
					}
				}));
			}));
		} else {
			response.renderReact("quote/View", response.locals);
		}
	});
}

quoteController.prototype.convertQuoteAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var Quote = quoteController.prototype.modelsContainer.getModel("Quote");
		var id;

		if(typeof(request.params.id) != "undefined") {
			id = request.params.id;

			quoteController.prototype.getQuote(id, d.intercept(function(quote) {
				if(quote != null) {
					var Order = quoteController.prototype.modelsContainer.getModel("Order");
					var data = objectAssign({}, quote);
					delete data._id;
					delete data.status;
					Order.create(data, d.intercept(function(createdOrder) {
						response.redirect("/sycamore-erp/order/" + createdOrder._id, response.locals);	
					}));
				} else {
// Throw 404 - Not Found
					next(new Error("404 - Not Found"));
				}
			}));
		} else {
			response.renderReact("quote/View", response.locals);
		}
	});
}

quoteController.prototype.editQuoteAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {

		var id;

		if(typeof(request.params.id) != "undefined") {
			id = request.params.id;

			quoteController.prototype.getQuote(id, d.intercept(function(quote) {
				if(quote != null) {
					response.locals.quote = quote;
					switch(request.params.contentType) {
						case "json":
							response.json(quote);
							break;
						case "html":
						default:
							response.renderReact("quote/Form", response.locals);
							break;
					}
				} else {
// Throw 404 - Not Found
					next(new Error("404 - Not Found"));
				}
			}));
		} else {
			response.renderReact("quote/Form", response.locals);
		}
	});
}

quoteController.prototype.sendEmailQuoteAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {

		var id;

		if(typeof(request.params.id) != "undefined") {
			id = request.params.id;

			quoteController.prototype.getQuote(id, d.intercept(function(quote) {
				if(quote != null) {
					var customerName = quote.customer.name;
					var customerId = quote.customer._id;
					var quoteId = quote._id;
					var email = quote.customer.email;
					var quoteUrl = "http://admin.fusionfurnituresolutions.co.uk/sycamore-erp/customer/" + customerId + "/quote/" + quoteId;
	
					mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_APIKEY);
					var template_name = "quote-confirmation";
					var template_content = [
						{ "name": "name",		"content": customerName },
						{ "name": "quoteurl",	"content": quoteUrl }
					];
					var message = {
						"to": [{
								"email": email,
								"name": customerName,
								"type": "to"
							}],
				 		"merge": true,
				    	"merge_language": "mailchimp",
				    	"global_merge_vars": template_content
					};
					var async = false;

					mandrill_client.messages.sendTemplate(
						{
							"template_name": template_name,
							"template_content": template_content,
							"message": message,
							"async": async
						},
						function(result) {
							response.redirect("/sycamore-erp/quote/" + quoteId);
						},
						function(e) {
							next(e);
						}
					);
				} else {
// Throw 404 - Not Found
					next(new Error("404 - Not Found"));
				}
			}));
		} else {
			response.renderReact("quote/Form", response.locals);
		}
	});
}

quoteController.prototype.viewQuoteAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var quote_id;

		if(typeof(request.params.quote_id) != "undefined") {
			quote_id = request.params.quote_id;

			quoteController.prototype.getQuote(quote_id, d.intercept(function(quote) {
				if(quote != null) {
					response.locals.quote = quote;
					response.renderReact("quote/View", response.locals);
				} else {
// Throw 404 - Not Found
					next(new Error("404 - Not Found"));
				}
			}));
		} else {
			response.renderReact("quote/View", response.locals);
		}
	});
}

quoteController.prototype.listQuotesAction = function(request, response, next) {
	var d = domain.create();
	
	d.on('error', next);
	
	d.run(function() {
		var list = response.locals.list;

		list.name = "quotes";
		list.title = "Quotes";

		list.columns = [
			{ name: "status", label: "Status", display: true },
			{ name: "customer.name", label: "Customer", display: true },
			{ name: "property.address.line1", label: "Property Address", display: true },
			{ name: "subTotal", label: "Sub Total", display: true },
			{ name: "VAT", label: "VAT", display: true },
			{ name: "total", label: "Total", display: true }
		];

		list.entities = [];

		list.populate = [
			{
				path: "customer",
				select: "name"
			}, {
				path: "property",
				select: "address.line1"
			}
		];

		getListItems(
			quoteController.prototype.servicesContainer,
			quoteController.prototype.modelsContainer,
			"Quote",
			list,
			d.intercept(function(list) {
				switch(request.params.contentType) {
					case 'json':
						response.json(list);
						break;
					case 'html':
					default:
						response.locals.list = list;
						response.renderReact("quote/List", response.locals);
						break;
				}
			})
		);
	});
}

quoteController.prototype.deleteQuoteAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		var Quote = quoteController.prototype.modelsContainer.getModel("Quote");
		var id;

		if(typeof(request.params.id) != "undefined") {
			id = request.params.id;
			Quote.remove({ _id: id }, d.intercept(function() {
				response.redirect(response.locals.applicationUrl + "quotes");
			}));
		} else {
// Throw 400 - Bad Request
			next(new Error("400 - Bad Request"));
		}
	});
}

quoteController.prototype.saveQuoteAction = function(request, response, next) {
	var d = domain.create();

	d.on("error", next);

	d.run(function() {
		var Quote = quoteController.prototype.modelsContainer.getModel("Quote");
		var data,
			id;

		async.waterfall(
			[
				function(callback) {
					if(typeof(request.body.quote) != "undefined") {
						data = request.body.quote;
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
						Quote.create(data, callback);
					} else {
// Update
						var id = request.params.id;
						delete data._id;						
						Quote.findByIdAndUpdate(id, { $set: data }, {}, callback);
					}
				},
				function(quote, callback) {
// Populate
					quoteController.prototype.getQuote(quote._id, callback);
				}
			],
			d.intercept(function(quote) {
				response.json(quote);
			})
		);
	});
}

exports = module.exports = quoteController;