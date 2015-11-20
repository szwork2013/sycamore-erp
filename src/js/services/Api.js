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
	putCustomer: function(queryOptions, callback) {
		request
		.put("/sycamore-erp/customer")
		.send(queryOptions)
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.end(callback);
	},
	putOrder: function(queryOptions, callback) {
		request
		.put("/sycamore-erp/order")
		.send(queryOptions)
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.end(callback);
	},
	putProduct: function(queryOptions, callback) {
		request
		.put("/sycamore-erp/product")
		.send(queryOptions)
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.end(callback);
	},
	putProperty: function(queryOptions, callback) {
		request
		.put("/sycamore-erp/property")
		.send(queryOptions)
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.end(callback);
	},
	putSupplier: function(queryOptions, callback) {
		request
		.put("/sycamore-erp/supplier")
		.send(queryOptions)
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.end(callback);
	},
	postCustomer: function(queryOptions, callback) {
		request
		.post("/sycamore-erp/customer")
		.send(queryOptions)
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.end(callback);
	},
	postOrder: function(queryOptions, callback) {
		request
		.post("/sycamore-erp/order")
		.send(queryOptions)
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.end(callback);
	},
	postProduct: function(queryOptions, callback) {
		request
		.post("/sycamore-erp/product")
		.send(queryOptions)
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.end(callback);
	},
	postProperty: function(queryOptions, callback) {
		request
		.post("/sycamore-erp/property")
		.send(queryOptions)
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.end(callback);
	},
	postSupplier: function(queryOptions, callback) {
		request
		.post("/sycamore-erp/supplier")
		.send(queryOptions)
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.end(callback);
	}
};

exports = module.exports = Api;