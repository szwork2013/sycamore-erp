var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var QuoteConstants = require("../constants/QuoteConstants");

var Api = require("../services/Api");

var QuoteActions = {
	saveQuote: function(quote) {
		if(	(typeof(quote._id) != "undefined") &&
			(quote._id != null) ) {
// POST
			Api.postQuote(
				quote._id,
				quote,
				function(response) {
					AppDispatcher.handleViewAction({
						actionType: QuoteConstants.UPDATE_QUOTE,
						quote: response.body
					});
				}
			);			
		} else {
// PUT
			Api.putQuote(
				quote,
				function(response) {
					AppDispatcher.handleViewAction({
						actionType: QuoteConstants.UPDATE_QUOTE,
						quote: response.body
					});
				}
			);
		}
	},
	addProductToQuote: function(product) {
		AppDispatcher.handleViewAction({
			actionType: QuoteConstants.ADD_PRODUCT_TO_QUOTE,
			product: product
		});
	},
	setCustomerOnQuote: function(value, selectedOptions) {
		var customer = selectedOptions[0];
		AppDispatcher.handleViewAction({
			actionType: QuoteConstants.SET_CUSTOMER_ON_QUOTE,
			customer: customer
		});
		var queryOptions = {
			filter: {
				customer: customer._id
			}
		};
		Api.getProperties(queryOptions, function(response) {
			AppDispatcher.handleViewAction({
				actionType: QuoteConstants.UPDATE_PROPERTIES,
				items: response.body.items
			});
		});
	},
	setProductQuantityOnQuote: function(productIndex, event) {
		AppDispatcher.handleViewAction({
			actionType: QuoteConstants.SET_PRODUCT_QUANTITY_ON_QUOTE,
			productIndex: productIndex,
			value: event.target.value
		});
	},
	setPropertyOnQuote: function(value, selectedOptions) {
		var property = selectedOptions[0];
		AppDispatcher.handleViewAction({
			actionType: QuoteConstants.SET_PROPERTY_ON_QUOTE,
			property: property
		});
	},
}

module.exports = QuoteActions;