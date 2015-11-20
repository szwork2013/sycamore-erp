"use strict";

var request = require("superagent");

var Api = {
	getCustomers: function getCustomers(queryOptions, callback) {
		request.get("/sycamore-erp/customers.json").end(callback);
	},
	getProducts: function getProducts(queryOptions, callback) {
		request.get("/sycamore-erp/products.json").end(callback);
	},
	getProperties: function getProperties(queryOptions, callback) {
		request.get("/sycamore-erp/properties.json").end(callback);
	},
	getSuppliers: function getSuppliers(queryOptions, callback) {
		request.get("/sycamore-erp/suppliers.json").end(callback);
	},
	putCustomer: function putCustomer(queryOptions, callback) {
		request.put("/sycamore-erp/customer").send(queryOptions).set('Accept', 'application/json').set('Content-Type', 'application/json').end(callback);
	},
	putOrder: function putOrder(queryOptions, callback) {
		request.put("/sycamore-erp/order").send(queryOptions).set('Accept', 'application/json').set('Content-Type', 'application/json').end(callback);
	},
	putProduct: function putProduct(queryOptions, callback) {
		request.put("/sycamore-erp/product").send(queryOptions).set('Accept', 'application/json').set('Content-Type', 'application/json').end(callback);
	},
	putProperty: function putProperty(queryOptions, callback) {
		request.put("/sycamore-erp/property").send(queryOptions).set('Accept', 'application/json').set('Content-Type', 'application/json').end(callback);
	},
	putSupplier: function putSupplier(queryOptions, callback) {
		request.put("/sycamore-erp/supplier").send(queryOptions).set('Accept', 'application/json').set('Content-Type', 'application/json').end(callback);
	},
	postCustomer: function postCustomer(queryOptions, callback) {
		var customer = queryOptions.customer;
		var id = customer._id;

		request.post("/sycamore-erp/customer/" + id).send(queryOptions).set('Accept', 'application/json').set('Content-Type', 'application/json').end(callback);
	},
	postOrder: function postOrder(queryOptions, callback) {
		var order = queryOptions.order;
		var id = order._id;

		request.post("/sycamore-erp/order/" + id).send(queryOptions).set('Accept', 'application/json').set('Content-Type', 'application/json').end(callback);
	},
	postProduct: function postProduct(queryOptions, callback) {
		var product = queryOptions.product;
		var id = product._id;

		request.post("/sycamore-erp/product/" + id).send(queryOptions).set('Accept', 'application/json').set('Content-Type', 'application/json').end(callback);
	},
	postProperty: function postProperty(queryOptions, callback) {
		var property = queryOptions.property;
		var id = property._id;

		request.post("/sycamore-erp/property/" + id).send(queryOptions).set('Accept', 'application/json').set('Content-Type', 'application/json').end(callback);
	},
	postSupplier: function postSupplier(queryOptions, callback) {
		var supplier = queryOptions.supplier;
		var id = supplier._id;

		request.post("/sycamore-erp/supplier/" + id).send(queryOptions).set('Accept', 'application/json').set('Content-Type', 'application/json').end(callback);
	}
};

exports = module.exports = Api;