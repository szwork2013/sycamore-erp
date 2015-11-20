var domain = require("domain");
var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var CustomerConstants = require("../constants/CustomerConstants");

var Api = require("../services/Api");

var CustomerActions = {
	getCustomers: function(queryOptions) {
		Api.getCustomers(queryOptions, function(response) {
			AppDispatcher.handleViewAction({
				actionType: CustomerConstants.UPDATE_CUSTOMERS,
				list: response.body
			});
		});
	},
	saveCustomer: function(customer) {
		if(	(typeof(customer._id) != "undefined") &&
			(customer._id != null) ) {
// POST
			Api.postCustomer(
				customer,
				function(response) {
					AppDispatcher.handleViewAction({
						actionType: CustomerConstants.UPDATE_CUSTOMER,
						customer: response.body
					});
				}
			);			
		} else {
// PUT
			Api.putCustomer(
				customer,
				function(response) {
					AppDispatcher.handleViewAction({
						actionType: CustomerConstants.UPDATE_CUSTOMER,
						customer: response.body
					});
				}
			);
		}
	},
	updateCustomerName: function(event) {
		AppDispatcher.handleViewAction({
			actionType: CustomerConstants.UPDATE_CUSTOMER_NAME,
			name: event.target.value
		});
	},
	updateCustomerBillingAddressLine1: function(event) {
		AppDispatcher.handleViewAction({
			actionType: CustomerConstants.UPDATE_CUSTOMER_BILLING_ADDRESS_LINE1,
			line1: event.target.value
		});
	},
	updateCustomerBillingAddressLine2: function(event) {
		AppDispatcher.handleViewAction({
			actionType: CustomerConstants.UPDATE_CUSTOMER_BILLING_ADDRESS_LINE2,
			line2: event.target.value
		});
	},
	updateCustomerBillingAddressLine3: function(event) {
		AppDispatcher.handleViewAction({
			actionType: CustomerConstants.UPDATE_CUSTOMER_BILLING_ADDRESS_LINE3,
			line3: event.target.value
		});
	},
	updateCustomerBillingAddressLine4: function(event) {
		AppDispatcher.handleViewAction({
			actionType: CustomerConstants.UPDATE_CUSTOMER_BILLING_ADDRESS_LINE4,
			line4: event.target.value
		});
	},
	updateCustomerBillingAddressPostCode: function(event) {
		AppDispatcher.handleViewAction({
			actionType: CustomerConstants.UPDATE_CUSTOMER_BILLING_ADDRESS_POSTCODE,
			postCode: event.target.value
		});
	},
	updateCustomerTelephone: function(event) {
		AppDispatcher.handleViewAction({
			actionType: CustomerConstants.UPDATE_CUSTOMER_TELEPHONE,
			telephone: event.target.value
		});
	},
	updateCustomerEmail: function(event) {
		AppDispatcher.handleViewAction({
			actionType: CustomerConstants.UPDATE_CUSTOMER_EMAIL,
			email: event.target.value
		});
	}
}

module.exports = CustomerActions;