"use strict";

var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var OrderConstants = require("../constants/OrderConstants");

var Api = require("../services/Api");

var OrderActions = {
	saveOrder: function saveOrder(order) {
		if (typeof order._id != "undefined" && order._id != null) {
			// POST
			Api.postOrder(order._id, order, function (response) {
				AppDispatcher.handleViewAction({
					actionType: OrderConstants.UPDATE_ORDER,
					order: response.body
				});
			});
		} else {
			// PUT
			Api.putOrder(order, function (response) {
				AppDispatcher.handleViewAction({
					actionType: OrderConstants.UPDATE_ORDER,
					order: response.body
				});
			});
		}
	},

	setStatus: function setStatus(status) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.SET_STATUS,
			status: status
		});
	},
	setDeliveryDate: function setDeliveryDate(date) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.SET_DELIVERY_DATE,
			date: date
		});
	},
	updateBillingCustomerName: function updateBillingCustomerName(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_BILLING_CUSTOMER_NAME,
			customerName: event.target.value
		});
	},
	updateBillingCompanyName: function updateBillingCompanyName(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_BILLING_COMPANY_NAME,
			companyName: event.target.value
		});
	},
	updateBillingAddressLine1: function updateBillingAddressLine1(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_BILLING_ADDRESS_LINE1,
			line1: event.target.value
		});
	},
	updateBillingAddressLine2: function updateBillingAddressLine2(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_BILLING_ADDRESS_LINE2,
			line2: event.target.value
		});
	},
	updateBillingAddressLine3: function updateBillingAddressLine3(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_BILLING_ADDRESS_LINE3,
			line3: event.target.value
		});
	},
	updateBillingAddressLine4: function updateBillingAddressLine4(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_BILLING_ADDRESS_LINE4,
			line4: event.target.value
		});
	},
	updateBillingAddressPostCode: function updateBillingAddressPostCode(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_BILLING_ADDRESS_POSTCODE,
			postCode: event.target.value
		});
	},
	updateBillingEmail: function updateBillingEmail(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_BILLING_EMAIL,
			email: event.target.value
		});
	},
	updateBillingTelephone: function updateBillingTelephone(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_BILLING_TELEPHONE,
			telephone: event.target.value
		});
	},
	updateDeliveryAddressLine1: function updateDeliveryAddressLine1(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_DELIVERY_ADDRESS_LINE1,
			line1: event.target.value
		});
	},
	updateDeliveryAddressLine2: function updateDeliveryAddressLine2(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_DELIVERY_ADDRESS_LINE2,
			line2: event.target.value
		});
	},
	updateDeliveryAddressLine3: function updateDeliveryAddressLine3(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_DELIVERY_ADDRESS_LINE3,
			line3: event.target.value
		});
	},
	updateDeliveryAddressLine4: function updateDeliveryAddressLine4(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_DELIVERY_ADDRESS_LINE4,
			line4: event.target.value
		});
	},
	updateDeliveryAddressPostCode: function updateDeliveryAddressPostCode(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_DELIVERY_ADDRESS_POSTCODE,
			postCode: event.target.value
		});
	},
	updateDeliveryAccessArrangements: function updateDeliveryAccessArrangements(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_DELIVERY_ACCESS_ARRANGEMENTS,
			accessArrangements: event.target.value
		});
	},
	updateDeliveryTelephone: function updateDeliveryTelephone(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_DELIVERY_TELEPHONE,
			telephone: event.target.value
		});
	},

	addProductToOrder: function addProductToOrder() {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.ADD_PRODUCT_TO_ORDER
		});
	},
	setProductQuantityOnOrder: function setProductQuantityOnOrder(productIndex, event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.SET_PRODUCT_QUANTITY_ON_ORDER,
			productIndex: productIndex,
			value: event.target.value
		});
	}
};

module.exports = OrderActions;