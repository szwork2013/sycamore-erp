var domain = require("domain");
var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var CustomerConstants = require("../constants/CustomerConstants");

var Api = require("../services/Api");

var CustomerActions = {
	getCustomers: function(queryOptions) {
		var d = domain.create();

		d.on("error", function(error) {
			console.log("getCustomers() -> error:");
			console.log(error);
		});

		d.run(function() {
			Api.getCustomers(queryOptions, d.intercept(function(response) {
				AppDispatcher.handleViewAction({
					actionType: CustomerConstants.UPDATE_CUSTOMERS,
					list: response.body
				});
			}));
		});
	},
	saveCustomer: function(customer) {
		var d = domain.create();

		d.on("error", function(error) {
			console.log("saveCustomer() -> error:");
			console.log(error);
		});

		d.run(function() {
			if(typeof(customer._id) != "undefined") {
				Api.postCustomer(
					{
						customer: customer
					},
					d.intercept(function(response) {
						AppDispatcher.handleViewAction({
							actionType: CustomerConstants.UPDATE_CUSTOMER,
							customer: response.body
						});
					})
				);			
			} else {
				Api.putCustomer(
					{
						customer: customer
					},
					d.intercept(function(response) {
						AppDispatcher.handleViewAction({
							actionType: CustomerConstants.UPDATE_CUSTOMER,
							customer: response.body
						});
					})
				);
			}
		});
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