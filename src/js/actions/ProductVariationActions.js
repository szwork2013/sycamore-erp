var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var ProductVariationConstants = require("../constants/ProductVariationConstants");

var Api = require("../services/Api");

var ProductVariationActions = {
	getProductVariations: function(queryOptions) {
		Api.getProductVariations(queryOptions, function(response) {
			AppDispatcher.handleViewAction({
				actionType: ProductVariationConstants.UPDATE_PRODUCT_VARIATIONS,
				list: response.body
			});
		});
	},
	saveProductVariation: function(productVariation) {
		if(	(typeof(productVariation._id) != "undefined") &&
			(productVariation._id != null) ) {
// POST
			Api.postProductVariation(
				productVariation._id,
				productVariation,
				function(response) {
					AppDispatcher.handleViewAction({
						actionType: ProductVariationConstants.UPDATE_PRODUCT_VARIATION,
						productVariation: response.body
					});
				}
			);
		} else {
// PUT
			Api.putProductVariation(
				productVariation,
				function(response) {
					AppDispatcher.handleViewAction({
						actionType: ProductVariationConstants.UPDATE_PRODUCT_VARIATION,
						productVariation: response.body
					});
				}
			);
		}
	},
	updateProductVariationLabel: function(event) {
		AppDispatcher.handleViewAction({
			actionType: ProductVariationConstants.UPDATE_PRODUCT_VARIATION_LABEL,
			label: event.target.value
		});
	},
	updateProductVariationName: function(event) {
		AppDispatcher.handleViewAction({
			actionType: ProductVariationConstants.UPDATE_PRODUCT_VARIATION_NAME,
			name: event.target.value
		});
	}
}

module.exports = ProductVariationActions;