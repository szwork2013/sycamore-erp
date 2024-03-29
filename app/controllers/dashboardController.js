var domain = require("domain");
var React = require("react");
var ReactDOMServer = require("react-dom/server");

function dashboardController(servicesContainer, modelsContainer) {
	dashboardController.prototype.servicesContainer = servicesContainer;
	dashboardController.prototype.modelsContainer = modelsContainer;
}

dashboardController.prototype.viewDashboardAction = function(request, response, next) {
	var d = domain.create();
	
	d.on("error", next);
	
	d.run(function() {
		response.locals.template = "dashboard/Index";

		var View = React.createFactory(require("../../lib/views/" + response.locals.template + ".js"));
		var html = ReactDOMServer.renderToString(View({ locals: response.locals }));

		response.send(html);
	});
}

exports = module.exports = dashboardController;