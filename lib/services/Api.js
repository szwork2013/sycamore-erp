"use strict";

var request = require("superagent");

var Api = {
	getSuppliers: function getSuppliers(queryOptions, callback) {
		request.get("http://fusion-furniture-solutions.herokuapp.com/sycamore-erp/suppliers.json").end(callback);
	}
};

exports = module.exports = Api;