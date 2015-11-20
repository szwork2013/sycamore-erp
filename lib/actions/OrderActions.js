"use strict";

var domain = require("domain");
var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var OrderConstants = require("../constants/OrderConstants");

var Api = require("../services/Api");

var OrderActions = {
	saveOrder: function saveOrder(order) {
		if (typeof order._id != "undefined") {
			Api.postOrder({
				order: order
			}, function (error, response) {
				AppDispatcher.handleViewAction({
					actionType: OrderConstants.UPDATE_ORDER,
					order: response.body
				});
			});
		} else {
			Api.putOrder({
				order: order
			}, function (error, response) {
				AppDispatcher.handleViewAction({
					actionType: OrderConstants.UPDATE_ORDER,
					order: response.body
				});
			});
		}
	},
	addProductToOrder: function addProductToOrder(product) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.ADD_PRODUCT_TO_ORDER,
			product: product
		});
	},
	setCustomerOnOrder: function setCustomerOnOrder(customer) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.SET_CUSTOMER_ON_ORDER,
			customer: customer
		});
		var queryOptions = {
			customer: customer._id
		};
		Api.getProperties(queryOptions, function (error, response) {
			AppDispatcher.handleViewAction({
				actionType: OrderConstants.UPDATE_PROPERTIES,
				items: response.body.items
			});
		});
	},
	setProductQuantityOnOrder: function setProductQuantityOnOrder(productIndex, event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.SET_PRODUCT_QUANTITY_ON_ORDER,
			productIndex: productIndex,
			value: event.target.value
		});
	},
	setPropertyOnOrder: function setPropertyOnOrder(property) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.SET_PROPERTY_ON_ORDER,
			property: property
		});
	}
};

module.exports = OrderActions;