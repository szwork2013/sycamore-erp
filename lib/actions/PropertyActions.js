"use strict";

var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var PropertyConstants = require("../constants/PropertyConstants");

var Api = require("../services/Api");

var PropertyActions = {
	getProperties: function getProperties(queryOptions) {
		Api.getProperties(queryOptions, function (response) {
			AppDispatcher.handleViewAction({
				actionType: PropertyConstants.UPDATE_PROPERTIES,
				list: response.body
			});
		});
	},
	saveProperty: function saveProperty(property) {
		if (typeof property._id != "undefined" && property._id != null) {
			// POST
			Api.postProperty(property._id, property, function (response) {
				AppDispatcher.handleViewAction({
					actionType: PropertyConstants.UPDATE_PROPERTY,
					property: response.body
				});
			});
		} else {
			// PUT
			Api.putProperty(property, function (response) {
				AppDispatcher.handleViewAction({
					actionType: PropertyConstants.UPDATE_PROPERTY,
					property: response.body
				});
			});
		}
	},
	setCustomerOnProperty: function setCustomerOnProperty(value, selectedOptions) {
		var customer = selectedOptions[0];
		AppDispatcher.handleViewAction({
			actionType: PropertyConstants.SET_CUSTOMER_ON_PROPERTY,
			customer: customer
		});
	},
	updatePropertyAddressLine1: function updatePropertyAddressLine1(event) {
		AppDispatcher.handleViewAction({
			actionType: PropertyConstants.UPDATE_PROPERTY_ADDRESS_LINE1,
			line1: event.target.value
		});
	},
	updatePropertyAddressLine2: function updatePropertyAddressLine2(event) {
		AppDispatcher.handleViewAction({
			actionType: PropertyConstants.UPDATE_PROPERTY_ADDRESS_LINE2,
			line2: event.target.value
		});
	},
	updatePropertyAddressLine3: function updatePropertyAddressLine3(event) {
		AppDispatcher.handleViewAction({
			actionType: PropertyConstants.UPDATE_PROPERTY_ADDRESS_LINE3,
			line3: event.target.value
		});
	},
	updatePropertyAddressLine4: function updatePropertyAddressLine4(event) {
		AppDispatcher.handleViewAction({
			actionType: PropertyConstants.UPDATE_PROPERTY_ADDRESS_LINE4,
			line4: event.target.value
		});
	},
	updatePropertyAddressPostCode: function updatePropertyAddressPostCode(event) {
		AppDispatcher.handleViewAction({
			actionType: PropertyConstants.UPDATE_PROPERTY_ADDRESS_POSTCODE,
			postCode: event.target.value
		});
	},
	updatePropertyAccessArrangements: function updatePropertyAccessArrangements(event) {
		AppDispatcher.handleViewAction({
			actionType: PropertyConstants.UPDATE_PROPERTY_ACCESS_ARRANGEMENTS,
			accessArrangements: event.target.value
		});
	},
	updatePropertyTelephone: function updatePropertyTelephone(event) {
		AppDispatcher.handleViewAction({
			actionType: PropertyConstants.UPDATE_PROPERTY_TELEPHONE,
			telephone: event.target.value
		});
	}
};

module.exports = PropertyActions;