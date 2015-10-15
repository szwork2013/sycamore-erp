var express	= require("express");

exports = module.exports = function(servicesContainer, modelsContainer) {
	var Router							= express.Router();

	var customerRoutes					= require("./customerRoutes")(servicesContainer, modelsContainer);
	var dashboardRoutes					= require("./dashboardRoutes")(servicesContainer, modelsContainer);
	var orderRoutes						= require("./orderRoutes")(servicesContainer, modelsContainer);
	var productRoutes					= require("./productRoutes")(servicesContainer, modelsContainer);
	var propertyRoutes					= require("./propertyRoutes")(servicesContainer, modelsContainer);
	var supplierRoutes					= require("./supplierRoutes")(servicesContainer, modelsContainer);

	Router.use("/",						customerRoutes);
	Router.use("/",						dashboardRoutes);
	Router.use("/",						orderRoutes);
	Router.use("/",						productRoutes);
	Router.use("/",						propertyRoutes);
	Router.use("/",						supplierRoutes);

	return Router;
};