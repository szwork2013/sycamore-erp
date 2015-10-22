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
	putOrder: function putOrder(queryOptions, callback) {
		request.put("/sycamore-erp/order").send(queryOptions).set('Accept', 'application/json').set('Content-Type', 'application/json').end(callback);
	}
};

exports = module.exports = Api;