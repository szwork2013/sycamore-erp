var domain = require("domain");
var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var PropertyConstants = require("../constants/PropertyConstants");

var Api = require("../services/Api");

var PropertyActions = {
	saveProperty: function(property) {
		if(typeof(property._id) != "undefined") {
			Api.postProperty(
				{
					property: property
				},
				function(error, response) {
					AppDispatcher.handleViewAction({
						actionType: PropertyConstants.UPDATE_PROPERTY,
						property: response.body
					});
				}
			);			
		} else {
			Api.putProperty(
				{
					property: property
				},
				function(error, response) {
					AppDispatcher.handleViewAction({
						actionType: PropertyConstants.UPDATE_PROPERTY,
						property: response.body
					});
				}
			);
		}
	},
	updatePropertyAddressLine1: function(event) {
		AppDispatcher.handleViewAction({
			actionType: PropertyConstants.UPDATE_PROPERTY_ADDRESS_LINE1,
			line1: event.target.value
		});
	},
	updatePropertyAddressLine2: function(event) {
		AppDispatcher.handleViewAction({
			actionType: PropertyConstants.UPDATE_PROPERTY_ADDRESS_LINE2,
			line2: event.target.value
		});
	},
	updatePropertyAddressLine3: function(event) {
		AppDispatcher.handleViewAction({
			actionType: PropertyConstants.UPDATE_PROPERTY_ADDRESS_LINE3,
			line3: event.target.value
		});
	},
	updatePropertyAddressLine4: function(event) {
		AppDispatcher.handleViewAction({
			actionType: PropertyConstants.UPDATE_PROPERTY_ADDRESS_LINE4,
			line4: event.target.value
		});
	},
	updatePropertyAddressPostCode: function(event) {
		AppDispatcher.handleViewAction({
			actionType: PropertyConstants.UPDATE_PROPERTY_ADDRESS_POSTCODE,
			postCode: event.target.value
		});
	},
	updatePropertyAccessArrangements: function(event) {
		AppDispatcher.handleViewAction({
			actionType: PropertyConstants.UPDATE_PROPERTY_ACCESS_ARRANGEMENTS,
			accessArrangements: event.target.value
		});
	},
	updatePropertyTelephone: function(event) {
		AppDispatcher.handleViewAction({
			actionType: PropertyConstants.UPDATE_PROPERTY_TELEPHONE,
			telephone: event.target.value
		});
	}
}

module.exports = PropertyActions;