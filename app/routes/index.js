var express	= require("express");

exports = module.exports = function(servicesContainer, modelsContainer) {
	var Router							= express.Router();
/*
	var authenticationRoutes			= require("./authenticationRoutes")(servicesContainer, modelsContainer);
	var applicationRoutes				= require("./applicationRoutes")(servicesContainer, modelsContainer);
	var configurationRoutes				= require("./configurationRoutes")(servicesContainer, modelsContainer);
	var dashboardRoutes					= require("./dashboardRoutes")(servicesContainer, modelsContainer);
	var entityRoutes					= require("./entityRoutes")(servicesContainer, modelsContainer);
	var installationRoutes				= require("./installationRoutes")(servicesContainer, modelsContainer);
	var integrationRoutes				= require("./integrationRoutes")(servicesContainer, modelsContainer);
	var permissionRoutes				= require("./permissionRoutes")(servicesContainer, modelsContainer);
	var roleRoutes						= require("./roleRoutes")(servicesContainer, modelsContainer);
	var userRoutes						= require("./userRoutes")(servicesContainer, modelsContainer);

	Router.use("/",						dashboardRoutes);
	Router.use("/configuration",		configurationRoutes);
	Router.use("/entity",				entityRoutes);
	Router.use("/installation",			installationRoutes);
	Router.use("/integration",			integrationRoutes);
	Router.use("/platform/application",	applicationRoutes);
	Router.use("/platform/permission",	permissionRoutes);
	Router.use("/platform/role",		roleRoutes);
	Router.use("/user",					authenticationRoutes);
	Router.use("/user",					userRoutes);
*/

	var supplierRoutes					= require("./supplierRoutes")(servicesContainer, modelsContainer);

	Router.use("/",						supplierRoutes);

	return Router;
};