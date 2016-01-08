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

	setStatus: function(status) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.SET_STATUS,
			status: status
		});
	},
	setDeliveryDate: function(date) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.SET_DELIVERY_DATE,
			date: date
		});
	},
	updateBillingCustomerName: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_BILLING_CUSTOMER_NAME,
			customerName: event.target.value
		});
	},
	updateBillingCompanyName: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_BILLING_COMPANY_NAME,
			companyName: event.target.value
		});
	},
	updateBillingAddressLine1: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_BILLING_ADDRESS_LINE1,
			line1: event.target.value
		});
	},
	updateBillingAddressLine2: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_BILLING_ADDRESS_LINE2,
			line2: event.target.value
		});
	},
	updateBillingAddressLine3: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_BILLING_ADDRESS_LINE3,
			line3: event.target.value
		});
	},
	updateBillingAddressLine4: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_BILLING_ADDRESS_LINE4,
			line4: event.target.value
		});
	},
	updateBillingAddressPostCode: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_BILLING_ADDRESS_POSTCODE,
			postCode: event.target.value
		});
	},
	updateBillingEmail: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_BILLING_EMAIL,
			email: event.target.value
		});
	},
	updateBillingTelephone: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_BILLING_TELEPHONE,
			telephone: event.target.value
		});
	},
	updateDeliveryAddressLine1: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_DELIVERY_ADDRESS_LINE1,
			line1: event.target.value
		});
	},
	updateDeliveryAddressLine2: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_DELIVERY_ADDRESS_LINE2,
			line2: event.target.value
		});
	},
	updateDeliveryAddressLine3: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_DELIVERY_ADDRESS_LINE3,
			line3: event.target.value
		});
	},
	updateDeliveryAddressLine4: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_DELIVERY_ADDRESS_LINE4,
			line4: event.target.value
		});
	},
	updateDeliveryAddressPostCode: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_DELIVERY_ADDRESS_POSTCODE,
			postCode: event.target.value
		});
	},
	updateDeliveryAccessArrangements: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_DELIVERY_ACCESS_ARRANGEMENTS,
			accessArrangements: event.target.value
		});
	},
	updateDeliveryTelephone: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.UPDATE_DELIVERY_TELEPHONE,
			telephone: event.target.value
		});
	},

	addProductToOrder: function() {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.ADD_PRODUCT_TO_ORDER
		});
	},
	setProductQuantityOnOrder: function(productIndex, event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.SET_PRODUCT_QUANTITY_ON_ORDER,
			productIndex: productIndex,
			value: event.target.value
		});
	},
	setProductName: function(productIndex, event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.SET_PRODUCT_NAME_ON_ORDER,
			productIndex: productIndex,
			value: event.target.value
		});
	},
	setSubTotal: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.SET_SUBTOTAL,
			subTotal: event.target.value
		});
	},
	setVAT: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.SET_VAT,
			VAT: event.target.value
		});
	},
	setTotal: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.SET_TOTAL,
			total: event.target.value
		});
	},

	setOrderCorrect: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.SET_ORDER_CORRECT,
			value: event.target.value
		});
	},
	setPropertyTidy: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.SET_PROPERTY_TIDY,
			value: event.target.value
		});
	},
	setNoticeAgreed: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.SET_NOTICE_AGREED,
			value: event.target.value
		});
	},
	setPaymentAgreed: function(event) {
		AppDispatcher.handleViewAction({
			actionType: OrderConstants.SET_PAYMENT_AGREED,
			value: event.target.value
		});
	}
}

module.exports = OrderActions;