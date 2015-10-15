var express			= require("express");

function dashboardRoutes(servicesContainer, modelsContainer) {
	var authenticationService = servicesContainer.getService("authenticationService");
	var dashboardController	= new (require("../controllers/dashboardController"))(servicesContainer, modelsContainer);

	var Router = express.Router();

// GET
	Router.get( "/",
		authenticationService.ensureAuthenticated(),
//		authenticationService.hasPermission("CARSALESSUITE_SUPPLIER_VIEW"),
		dashboardController.viewDashboardAction
	);

	return Router;
};

exports = module.exports = dashboardRoutes;
