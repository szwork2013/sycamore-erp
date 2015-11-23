"use strict";

var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var ProductVariationGroupConstants = require("../constants/ProductVariationGroupConstants");

var Api = require("../services/Api");

var ProductVariationGroupActions = {
	getProductVariationGroups: function getProductVariationGroups(queryOptions) {
		Api.getProductVariationGroups(queryOptions, function (response) {
			AppDispatcher.handleViewAction({
				actionType: ProductVariationGroupConstants.UPDATE_PRODUCT_VARIATION_GROUPS,
				list: response.body
			});
		});
	},
	saveProductVariationGroup: function saveProductVariationGroup(productVariationGroup) {
		if (typeof productVariationGroup._id != "undefined" && productVariationGroup._id != null) {
			// POST
			Api.postProductVariationGroup(productVariationGroup._id, productVariationGroup, function (response) {
				AppDispatcher.handleViewAction({
					actionType: ProductVariationGroupConstants.UPDATE_PRODUCT_VARIATION_GROUP,
					productVariationGroup: response.body
				});
			});
		} else {
			// PUT
			Api.putProductVariationGroup(productVariationGroup, function (response) {
				AppDispatcher.handleViewAction({
					actionType: ProductVariationGroupConstants.UPDATE_PRODUCT_VARIATION_GROUP,
					productVariationGroup: response.body
				});
			});
		}
	},
	updateProductVariationGroupName: function updateProductVariationGroupName(event) {
		AppDispatcher.handleViewAction({
			actionType: ProductVariationGroupConstants.UPDATE_PRODUCT_VARIATION_GROUP_NAME,
			name: event.target.value
		});
	}
};

module.exports = ProductVariationGroupActions;