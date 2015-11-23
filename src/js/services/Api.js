var domain = require("domain");
var request = require("superagent");

var Api = {
	handleError: function(error) {
		console.log(error);
	},
	getCustomers: function(queryOptions, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function() {
			request
			.get("/sycamore-erp/customers.json")
			.send(queryOptions)
			.set("Accept", "application/json")
			.end(d.intercept(callback));
		});
	},
	getProducts: function(queryOptions, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function() {
			request
			.get("/sycamore-erp/products.json")
			.send(queryOptions)
			.set("Accept", "application/json")
			.end(d.intercept(callback));
		});
	},
	getProductVariations: function(queryOptions, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function() {
			request
			.get("/sycamore-erp/productVariations.json")
			.send(queryOptions)
			.set("Accept", "application/json")
			.end(d.intercept(callback));
		});
	},
	getProductVariationGroups: function(queryOptions, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function() {
			request
			.get("/sycamore-erp/productVariationGroups.json")
			.send(queryOptions)
			.set("Accept", "application/json")
			.end(d.intercept(callback));
		});
	},
	getProperties: function(queryOptions, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function() {
			request
			.get("/sycamore-erp/properties.json")
			.send(queryOptions)
			.set("Accept", "application/json")
			.end(d.intercept(callback));
		});
	},
	getSuppliers: function(queryOptions, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function() {
			request
			.get("/sycamore-erp/suppliers.json")
			.send(queryOptions)
			.set("Accept", "application/json")
			.end(d.intercept(callback));
		});
	},
	putCustomer: function(customer, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function() {
			request
			.put("/sycamore-erp/customer")
			.send({ customer: customer })
			.set("Accept", "application/json")
			.set("Content-Type", "application/json")
			.end(d.intercept(callback));
		});
	},
	putOrder: function(order, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function() {
			request
			.put("/sycamore-erp/order")
			.send({ order: order })
			.set("Accept", "application/json")
			.set("Content-Type", "application/json")
			.end(d.intercept(callback));
		});
	},
	putProduct: function(product, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function() {
			request
			.put("/sycamore-erp/product")
			.send({ product: product })
			.set("Accept", "application/json")
			.set("Content-Type", "application/json")
			.end(d.intercept(callback));
		});
	},
	putProductVariation: function(productVariation, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function() {
			request
			.put("/sycamore-erp/productVariation")
			.send({ productVariation: productVariation })
			.set("Accept", "application/json")
			.set("Content-Type", "application/json")
			.end(d.intercept(callback));
		});
	},
	putProductVariationGroup: function(productVariationGroup, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function() {
			request
			.put("/sycamore-erp/productVariationGroup")
			.send({ productVariationGroup: productVariationGroup })
			.set("Accept", "application/json")
			.set("Content-Type", "application/json")
			.end(d.intercept(callback));
		});
	},
	putProperty: function(property, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function() {
			request
			.put("/sycamore-erp/property")
			.send({ property: property })
			.set("Accept", "application/json")
			.set("Content-Type", "application/json")
			.end(d.intercept(callback));
		});
	},
	putSupplier: function(supplier, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function() {
			request
			.put("/sycamore-erp/supplier")
			.send({ supplier: supplier })
			.set("Accept", "application/json")
			.set("Content-Type", "application/json")
			.end(d.intercept(callback));
		});
	},
	postCustomer: function(id, customer, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function() {
			request
			.post("/sycamore-erp/customer/" + id)
			.send({ customer: customer })
			.set("Accept", "application/json")
			.set("Content-Type", "application/json")
			.end(d.intercept(callback));
		});
	},
	postOrder: function(id, order, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function() {
			request
			.post("/sycamore-erp/order/" + id)
			.send({ order: order })
			.set("Accept", "application/json")
			.set("Content-Type", "application/json")
			.end(d.intercept(callback));
		});
	},
	postProduct: function(id, product, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function() {
			request
			.post("/sycamore-erp/product/" + id)
			.send({ product: product })
			.set("Accept", "application/json")
			.set("Content-Type", "application/json")
			.end(d.intercept(callback));
		});
	},
	postProductVariation: function(id, product, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function() {
			request
			.post("/sycamore-erp/productVariation/" + id)
			.send({ product: product })
			.set("Accept", "application/json")
			.set("Content-Type", "application/json")
			.end(d.intercept(callback));
		});
	},
	postProductVariationGroup: function(id, product, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function() {
			request
			.post("/sycamore-erp/productVariationGroup/" + id)
			.send({ product: product })
			.set("Accept", "application/json")
			.set("Content-Type", "application/json")
			.end(d.intercept(callback));
		});
	},
	postProperty: function(id, property, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function() {
			request
			.post("/sycamore-erp/property/" + id)
			.send({ property: property })
			.set("Accept", "application/json")
			.set("Content-Type", "application/json")
			.end(d.intercept(callback));
		});
	},
	postSupplier: function(id, supplier, callback) {
		var d = domain.create();

		d.on("error", this.handleError);

		d.run(function() {
			request
			.post("/sycamore-erp/supplier/" + id)
			.send({ supplier: supplier })
			.set("Accept", "application/json")
			.set("Content-Type", "application/json")
			.end(d.intercept(callback));
		});
	}
};

exports = module.exports = Api;