var domain = require("domain");
var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var OrderConstants = require("../constants/OrderConstants");

var Api = require("../services/Api");

var OrderActions = {
	saveOrder: function(order) {
		var d = domain.create();

		d.on("error", function(error) {
			console.log("saveOrder() -> error:");
			console.log(error);
		});

		d.run(function() {
			if(typeof(order._id) != "undefined") {
				Api.postOrder(
					{
						order: order
					},
					d.intercept(function(response) {
						AppDispatcher.handleViewAction({
							actionType: OrderConstants.UPDATE_ORDER,
							order: response.body
						});
					})
				);			
			} else {
				Api.putOrder(
					{
						order: order
					},
					d.intercept(function(response) {
						AppDispatcher.handleViewAction({
							actionType: OrderConstants.UPDATE_ORDER,
							order: response.body
						});
					})
				);
			}
		});
	},
	addProductToOrder: function(product) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.ADD_PRODUCT_TO_ORDER,
			product: product
		});
	},
	setCustomerOnOrder: function(customer) {
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
	setPropertyOnOrder: function(property) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.SET_PROPERTY_ON_ORDER,
			property: property
		});
	},
}

module.exports = OrderActions;