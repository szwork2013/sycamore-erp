"use strict";

var domain = require("domain");
var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var AppConstants = require("../constants/AppConstants");

var Api = require("../services/Api");

var ApplicationActions = {
	addProductToOrder: function addProductToOrder(product) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.ADD_PRODUCT_TO_ORDER,
			product: product
		});
	},
	createOrder: function createOrder(order) {
		var queryOptions = {
			order: order
		};
		Api.putOrder(queryOptions, function (error, response) {
			AppDispatcher.handleViewAction({
				actionType: AppConstants.CREATE_ORDER
			});
		});
	},
	setCustomerOnOrder: function setCustomerOnOrder(customer) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.SET_CUSTOMER_ON_ORDER,
			customer: customer
		});
		var queryOptions = {
			customer: customer._id
		};
		Api.getProperties(queryOptions, function (error, response) {
			AppDispatcher.handleViewAction({
				actionType: AppConstants.UPDATE_PROPERTIES,
				items: response.body.items
			});
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
				list: response.body
			});
		});
	},
	getProducts: function getProducts(queryOptions) {
		Api.getProducts(queryOptions, function (error, response) {
			AppDispatcher.handleViewAction({
				actionType: AppConstants.UPDATE_PRODUCTS,
				list: response.body
			});
		});
	},
	getProperties: function getProperties(queryOptions) {
		Api.getProperties(queryOptions, function (error, response) {
			AppDispatcher.handleViewAction({
				actionType: AppConstants.UPDATE_PROPERTIES,
				list: response.body
			});
		});
	},
	getSuppliers: function getSuppliers(queryOptions) {
		Api.getSuppliers(queryOptions, function (error, response) {
			AppDispatcher.handleViewAction({
				actionType: AppConstants.UPDATE_SUPPLIERS,
				list: response.body
			});
		});
	}
};

module.exports = ApplicationActions;