var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var Api = require("../services/Api");

var ApplicationActions = {
	addProductToOrder: function(product) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.ADD_PRODUCT_TO_ORDER,
			product: product
		});
	},
	setCustomerOnOrder: function(customer) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.SET_CUSTOMER_ON_ORDER,
			customer: customer
		});
		var queryOptions = {
			customer: customer._id
		};
		Api.getProperties(queryOptions, function(error, response) {
			AppDispatcher.handleViewAction({
				actionType: AppConstants.UPDATE_PROPERTIES,
				items: response.body.items
			});
		});
	},
	setProductQuantityOnOrder: function(productIndex, value) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.SET_PRODUCT_QUANTITY_ON_ORDER,
			productIndex: productIndex,
			value: value
		});
	},
	setPropertyOnOrder: function(property) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.SET_PROPERTY_ON_ORDER,
			property: property
		});
	},
	getCustomers: function(queryOptions) {
		Api.getCustomers(queryOptions, function(error, response) {
			AppDispatcher.handleViewAction({
				actionType: AppConstants.UPDATE_CUSTOMERS,
				items: response.body.items
			});
		});
	},
	getProducts: function(queryOptions) {
		Api.getProducts(queryOptions, function(error, response) {
			AppDispatcher.handleViewAction({
				actionType: AppConstants.UPDATE_PRODUCTS,
				items: response.body.items
			});
		});
	},
	getProperties: function(queryOptions) {
		Api.getProperties(queryOptions, function(error, response) {
			AppDispatcher.handleViewAction({
				actionType: AppConstants.UPDATE_PROPERTIES,
				items: response.body.items
			});
		});
	},
	getSuppliers: function(queryOptions) {
		Api.getSuppliers(queryOptions, function(error, response) {
			AppDispatcher.handleViewAction({
				actionType: AppConstants.UPDATE_SUPPLIERS,
				items: response.body.items
			});
		});
	}
}

module.exports = ApplicationActions;