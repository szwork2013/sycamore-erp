var domain = require("domain");
var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var ProductConstants = require("../constants/ProductConstants");

var Api = require("../services/Api");

var ProductActions = {
	getProducts: function(queryOptions) {
		var d = domain.create();

		d.on("error", function(error) {
			console.log("getProducts() -> error:");
			console.log(error);
		});

		d.run(function() {
			Api.getProducts(queryOptions, d.intercept(function(response) {
				AppDispatcher.handleViewAction({
					actionType: ProductConstants.UPDATE_PRODUCTS,
					list: response.body
				});
			}));
		});
	},
	saveProduct: function(product) {
		var d = domain.create();

		d.on("error", function(error) {
			console.log("saveProduct() -> error:");
			console.log(error);
		});

		d.run(function() {
			if(typeof(product._id) != "undefined") {
				Api.postProduct(
					{
						product: product
					},
					d.intercept(function(response) {
						AppDispatcher.handleViewAction({
							actionType: ProductConstants.UPDATE_PRODUCT,
							product: response.body
						});
					})
				);			
			} else {
				Api.putProduct(
					{
						product: product
					},
					d.intercept(function(response) {
						AppDispatcher.handleViewAction({
							actionType: ProductConstants.UPDATE_PRODUCT,
							product: response.body
						});
					})
				);
			}
		});
	},
	updateProductName: function(event) {
		AppDispatcher.handleViewAction({
			actionType: ProductConstants.UPDATE_PRODUCT_NAME,
			name: event.target.value
		});
	},
	selectProductSupplier: function(supplierId) {
		AppDispatcher.handleViewAction({
			actionType: ProductConstants.SELECT_PRODUCT_SUPPLIER,
			supplierId: supplierId
		});
	},
	updateProductCode: function(event) {
		AppDispatcher.handleViewAction({
			actionType: ProductConstants.UPDATE_PRODUCT_CODE,
			productCode: event.target.value
		});
	},
	updateProductPrice: function(event) {
		AppDispatcher.handleViewAction({
			actionType: ProductConstants.UPDATE_PRODUCT_PRICE,
			price: event.target.value
		});
	}
}

module.exports = ProductActions;