var request = require("superagent");

var Api = {
	getCustomers: function(queryOptions, callback) {
		request
		.get("http://fusion-furniture-solutions.herokuapp.com/sycamore-erp/customers.json")
		.end(callback);
	},
	getProducts: function(queryOptions, callback) {
		request
		.get("http://fusion-furniture-solutions.herokuapp.com/sycamore-erp/products.json")
		.end(callback);
	},
	getProperties: function(queryOptions, callback) {
		request
		.get("http://fusion-furniture-solutions.herokuapp.com/sycamore-erp/properties.json")
		.end(callback);
	},
	getSuppliers: function(queryOptions, callback) {
		request
		.get("http://fusion-furniture-solutions.herokuapp.com/sycamore-erp/suppliers.json")
		.end(callback);
	}
};

exports = module.exports = Api;