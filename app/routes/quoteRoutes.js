var express			= require("express");

function quoteRoutes(servicesContainer, modelsContainer) {
	var authenticationService = servicesContainer.getService("authenticationService");
	var quoteController	= new (require("../controllers/quoteController"))(servicesContainer, modelsContainer);

	var getQueryList = require("../../../../app/lib/getQueryList");
	var getQueryFilter = require("../../../../app/lib/getQueryFilter");
	var getQueryPagination = require("../../../../app/lib/getQueryPagination");
	var getQuerySort = require("../../../../app/lib/getQuerySort");
	var getQuerySelect = require("../../../../app/lib/getQuerySelect");
	var getQuerySearchQuery = require("../../../../app/lib/getQuerySearchQuery");

	var Router = express.Router();

// DELETE / DELETE
	Router.delete("/quote/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		quoteController.deleteQuoteAction
	);
// CREATE / PUT
	Router.put(	"/quote",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_CREATE"),
		quoteController.saveQuoteAction
	);
// UPDATE / POST
	Router.post("/quote/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		quoteController.saveQuoteAction
	);

// CREATE / GET
	Router.get( "/quote",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_VIEW"),
		quoteController.editQuoteAction
	);
// VIEW / GET (Customer)
	Router.get( "/customer/:customer_id/quote/:quote_id",
//		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		quoteController.viewQuoteAction
	);
// VIEW / GET (Customer Confirm)
	Router.get( "/customer/:customer_id/quote/:quote_id/confirm",
//		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		quoteController.confirmQuoteAction
	);
// EDIT/VIEW / GET
	Router.get( "/quote/:id",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		quoteController.editQuoteAction
	);
	Router.get( "/quote/:id.:contentType",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		quoteController.editQuoteAction
	);
// EMAIL / GET
	Router.get( "/quote/:id/email",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_EDIT"),
		quoteController.sendEmailQuoteAction
	);

// LIST / GET
	Router.get(
		"/quotes",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_LIST"),
		getQueryList,
		getQueryFilter,
		getQueryPagination,
		getQuerySort,
		getQuerySelect,
		getQuerySearchQuery,
		quoteController.listQuotesAction
	);
	Router.get(
		"/quotes.:contentType",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_LIST"),
		getQueryList,
		getQueryFilter,
		getQueryPagination,
		getQuerySort,
		getQuerySelect,
		getQuerySearchQuery,
		quoteController.listQuotesAction
	);

	return Router;
};

exports = module.exports = quoteRoutes;
