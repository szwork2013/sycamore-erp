"use strict";

var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var ProductVariationConstants = require("../constants/ProductVariationConstants");

var Api = require("../services/Api");

var ProductVariationActions = {
	getProductVariations: function getProductVariations(queryOptions) {
		Api.getProductVariations(queryOptions, function (response) {
			AppDispatcher.handleViewAction({
				actionType: ProductVariationConstants.UPDATE_PRODUCT_VARIATION_GROUPS,
				list: response.body
			});
		});
	},
	saveProductVariation: function saveProductVariation(productVariation) {
		if (typeof productVariation._id != "undefined" && productVariation._id != null) {
			// POST
			Api.postProductVariation(productVariation._id, productVariation, function (response) {
				AppDispatcher.handleViewAction({
					actionType: ProductVariationConstants.UPDATE_PRODUCT_VARIATION_GROUP,
					productVariation: response.body
				});
			});
		} else {
			// PUT
			Api.putProductVariation(productVariation, function (response) {
				AppDispatcher.handleViewAction({
					actionType: ProductVariationConstants.UPDATE_PRODUCT_VARIATION_GROUP,
					productVariation: response.body
				});
			});
		}
	},
	updateProductVariationName: function updateProductVariationName(event) {
		AppDispatcher.handleViewAction({
			actionType: ProductVariationConstants.UPDATE_PRODUCT_VARIATION_GROUP_NAME,
			name: event.target.value
		});
	}
};

module.exports = ProductVariationActions;