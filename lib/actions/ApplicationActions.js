'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var Api = require("../services/Api");

var ApplicationActions = {
	addProductToOrder: function addProductToOrder(product) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.ADD_PRODUCT_TO_ORDER,
			product: product
		});
	},
	setCustomerOnOrder: function setCustomerOnOrder(customer) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.SET_CUSTOMER_ON_ORDER,
			customer: customer
		});
	},
	setProductQuantityOnOrder: function setProductQuantityOnOrder(productIndex, value) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.SET_PRODUCT_QUANTITY_ON_ORDER,
			productIndex: productIndex,
			value: value
		});
	},
	setPropertyOnOrder: function setPropertyOnOrder(property) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.SET_PROPERTY_ON_ORDER,
			property: property
		});
	},
	getCustomers: function getCustomers(queryOptions) {
		Api.getCustomers(queryOptions, function (error, response) {
			AppDispatcher.handleViewAction({
				actionType: AppConstants.UPDATE_CUSTOMERS,
				items: response.body.items
			});
		});
	},
	getProducts: function getProducts(queryOptions) {
		Api.getProducts(queryOptions, function (error, response) {
			AppDispatcher.handleViewAction({
				actionType: AppConstants.UPDATE_PRODUCTS,
				items: response.body.items
			});
		});
	},
	getProperties: function getProperties(queryOptions) {
		Api.getProperties(queryOptions, function (error, response) {
			AppDispatcher.handleViewAction({
				actionType: AppConstants.UPDATE_PROPERTIES,
				items: response.body.items
			});
		});
	},
	getSuppliers: function getSuppliers(queryOptions) {
		Api.getSuppliers(queryOptions, function (error, response) {
			AppDispatcher.handleViewAction({
				actionType: AppConstants.UPDATE_SUPPLIERS,
				items: response.body.items
			});
		});
	}
};

module.exports = ApplicationActions;