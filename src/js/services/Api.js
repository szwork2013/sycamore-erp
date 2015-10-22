var request = require("superagent");

var Api = {
	getCustomers: function(queryOptions, callback) {
		request
		.get("/sycamore-erp/customers.json")
		.end(callback);
	},
	getProducts: function(queryOptions, callback) {
		request
		.get("/sycamore-erp/products.json")
		.end(callback);
	},
	getProperties: function(queryOptions, callback) {
		request
		.get("/sycamore-erp/properties.json")
		.end(callback);
	},
	getSuppliers: function(queryOptions, callback) {
		request
		.get("/sycamore-erp/suppliers.json")
		.end(callback);
	},
	putOrder: function(queryOptions, callback) {
		request
		.put("/sycamore-erp/order")
		.send(queryOptions)
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.end(callback);
	}
};

exports = module.exports = Api;