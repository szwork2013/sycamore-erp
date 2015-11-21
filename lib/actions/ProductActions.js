"use strict";

var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var ProductConstants = require("../constants/ProductConstants");

var Api = require("../services/Api");

var ProductActions = {
	getProducts: function getProducts(queryOptions) {
		Api.getProducts(queryOptions, function (response) {
			AppDispatcher.handleViewAction({
				actionType: ProductConstants.UPDATE_PRODUCTS,
				list: response.body
			});
		});
	},
	saveProduct: function saveProduct(product) {
		if (typeof product._id != "undefined" && product._id != null) {
			// POST
			Api.postProduct(product._id, product, function (response) {
				AppDispatcher.handleViewAction({
					actionType: ProductConstants.UPDATE_PRODUCT,
					product: response.body
				});
			});
		} else {
			// PUT
			Api.putProduct(product, function (response) {
				AppDispatcher.handleViewAction({
					actionType: ProductConstants.UPDATE_PRODUCT,
					product: response.body
				});
			});
		}
	},
	updateProductName: function updateProductName(event) {
		AppDispatcher.handleViewAction({
			actionType: ProductConstants.UPDATE_PRODUCT_NAME,
			name: event.target.value
		});
	},
	selectProductSupplier: function selectProductSupplier(supplierId, selectedOptions) {
		var supplier = selectedOptions[0];
		AppDispatcher.handleViewAction({
			actionType: ProductConstants.SELECT_PRODUCT_SUPPLIER,
			supplier: supplier
		});
	},
	updateProductCode: function updateProductCode(event) {
		AppDispatcher.handleViewAction({
			actionType: ProductConstants.UPDATE_PRODUCT_CODE,
			productCode: event.target.value
		});
	},
	updateProductPrice: function updateProductPrice(event) {
		AppDispatcher.handleViewAction({
			actionType: ProductConstants.UPDATE_PRODUCT_PRICE,
			price: event.target.value
		});
	}
};

module.exports = ProductActions;