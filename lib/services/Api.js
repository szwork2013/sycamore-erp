"use strict";

var request = require("superagent");

var Api = {
	handleError: function handleError(error) {
		console.log(error);
	},
	getCustomers: function getCustomers(queryOptions, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function () {
			request.get("/sycamore-erp/customers.json").send(queryOptions).set("Accept", "application/json").end(d.intercept(callback));
		});
	},
	getProducts: function getProducts(queryOptions, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function () {
			request.get("/sycamore-erp/products.json").send(queryOptions).set("Accept", "application/json").end(d.intercept(callback));
		});
	},
	getProperties: function getProperties(queryOptions, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function () {
			request.get("/sycamore-erp/properties.json").send(queryOptions).set("Accept", "application/json").end(d.intercept(callback));
		});
	},
	getSuppliers: function getSuppliers(queryOptions, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function () {
			request.get("/sycamore-erp/suppliers.json").send(queryOptions).set("Accept", "application/json").end(d.intercept(callback));
		});
	},
	putCustomer: function putCustomer(customer, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function () {
			request.put("/sycamore-erp/customer").send({ customer: customer }).set("Accept", "application/json").set("Content-Type", "application/json").end(d.intercept(callback));
		});
	},
	putOrder: function putOrder(order, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function () {
			request.put("/sycamore-erp/order").send({ order: order }).set("Accept", "application/json").set("Content-Type", "application/json").end(d.intercept(callback));
		});
	},
	putProduct: function putProduct(product, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function () {
			request.put("/sycamore-erp/product").send({ product: product }).set("Accept", "application/json").set("Content-Type", "application/json").end(d.intercept(callback));
		});
	},
	putProperty: function putProperty(property, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function () {
			request.put("/sycamore-erp/property").send({ property: property }).set("Accept", "application/json").set("Content-Type", "application/json").end(d.intercept(callback));
		});
	},
	putSupplier: function putSupplier(supplier, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function () {
			request.put("/sycamore-erp/supplier").send({ supplier: supplier }).set("Accept", "application/json").set("Content-Type", "application/json").end(d.intercept(callback));
		});
	},
	postCustomer: function postCustomer(id, customer, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function () {
			request.post("/sycamore-erp/customer/" + id).send({ customer: customer }).set("Accept", "application/json").set("Content-Type", "application/json").end(d.intercept(callback));
		});
	},
	postOrder: function postOrder(id, order, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function () {
			request.post("/sycamore-erp/order/" + id).send({ order: order }).set("Accept", "application/json").set("Content-Type", "application/json").end(d.intercept(callback));
		});
	},
	postProduct: function postProduct(id, product, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function () {
			request.post("/sycamore-erp/product/" + id).send({ product: product }).set("Accept", "application/json").set("Content-Type", "application/json").end(d.intercept(callback));
		});
	},
	postProperty: function postProperty(id, property, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function () {
			request.post("/sycamore-erp/property/" + id).send({ property: property }).set("Accept", "application/json").set("Content-Type", "application/json").end(d.intercept(callback));
		});
	},
	postSupplier: function postSupplier(id, supplier, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function () {
			request.post("/sycamore-erp/supplier/" + id).send({ supplier: supplier }).set("Accept", "application/json").set("Content-Type", "application/json").end(d.intercept(callback));
		});
	}
};

exports = module.exports = Api;