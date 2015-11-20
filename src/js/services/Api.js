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
		var customer = queryOptions.customer;
		var id = customer._id;

		request
		.post("/sycamore-erp/customer/" + id)
		.send(queryOptions)
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.end(callback);
	},
	postOrder: function(queryOptions, callback) {
		var order = queryOptions.order;
		var id = order._id;

		request
		.post("/sycamore-erp/order/" + id)
		.send(queryOptions)
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.end(callback);
	},
	postProduct: function(queryOptions, callback) {
		var product = queryOptions.product;
		var id = product._id;

		request
		.post("/sycamore-erp/product/" + id)
		.send(queryOptions)
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.end(callback);
	},
	postProperty: function(queryOptions, callback) {
		var property = queryOptions.property;
		var id = property._id;

		request
		.post("/sycamore-erp/property/" + id)
		.send(queryOptions)
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.end(callback);
	},
	postSupplier: function(queryOptions, callback) {
		var supplier = queryOptions.supplier;
		var id = supplier._id;

		request
		.post("/sycamore-erp/supplier/" + id)
		.send(queryOptions)
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.end(callback);
	}
};

exports = module.exports = Api;