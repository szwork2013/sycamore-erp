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
	}
};

exports = module.exports = Api;