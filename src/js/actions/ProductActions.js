var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var ProductConstants = require("../constants/ProductConstants");

var Api = require("../services/Api");

var ProductActions = {
	getProducts: function(queryOptions) {
		Api.getProducts(queryOptions, function(response) {
			AppDispatcher.handleViewAction({
				actionType: ProductConstants.UPDATE_PRODUCTS,
				list: response.body
			});
		});
	},
	saveProduct: function(product) {
		if(	(typeof(product._id) != "undefined") &&
			(product._id != null) ) {
// POST
			Api.postProduct(
				product._id,
				product,
				function(response) {
					AppDispatcher.handleViewAction({
						actionType: ProductConstants.UPDATE_PRODUCT,
						product: response.body
					});
				}
			);			
		} else {
// PUT
			Api.putProduct(
				product,
				function(response) {
					AppDispatcher.handleViewAction({
						actionType: ProductConstants.UPDATE_PRODUCT,
						product: response.body
					});
				}
			);
		}
	},
	updateProductName: function(event) {
		AppDispatcher.handleViewAction({
			actionType: ProductConstants.UPDATE_PRODUCT_NAME,
			name: event.target.value
		});
	},
	selectProductSupplier: function(supplierId) {
		console.log(supplierId);
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