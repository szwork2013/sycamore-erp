var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var OrderConstants = require("../constants/OrderConstants");

var Api = require("../services/Api");

var OrderActions = {
	saveOrder: function(order) {
		if(	(typeof(order._id) != "undefined") &&
			(order._id != null) ) {
// POST
			Api.postOrder(
				order._id,
				order,
				function(response) {
					AppDispatcher.handleViewAction({
						actionType: OrderConstants.UPDATE_ORDER,
						order: response.body
					});
				}
			);			
		} else {
// PUT
			Api.putOrder(
				order,
				function(response) {
					AppDispatcher.handleViewAction({
						actionType: OrderConstants.UPDATE_ORDER,
						order: response.body
					});
				}
			);
		}
	},
	addProductToOrder: function(product) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.ADD_PRODUCT_TO_ORDER,
			product: product
		});
	},
	setCustomerOnOrder: function(value, selectedOptions) {
		var customer = selectedOptions[0];
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.SET_CUSTOMER_ON_ORDER,
			customer: customer
		});
		var queryOptions = {
			customer: customer._id
		};
		Api.getProperties(queryOptions, function(error, response) {
			AppDispatcher.handleViewAction({
				actionType: OrderConstants.UPDATE_PROPERTIES,
				items: response.body.items
			});
		});
	},
	setProductQuantityOnOrder: function(productIndex, event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.SET_PRODUCT_QUANTITY_ON_ORDER,
			productIndex: productIndex,
			value: event.target.value
		});
	},
	setPropertyOnOrder: function(value, selectedOptions) {
		var property = selectedOptions[0];
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.SET_PROPERTY_ON_ORDER,
			property: property
		});
	},
}

module.exports = OrderActions;