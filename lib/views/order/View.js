"use strict";

var React = require("react");

var View = React.createClass({
	displayName: "View",

	render: function render() {
		var order = this.props.locals.order,
		    customer = {},
		    billingAddress = {},
		    delivery = {},
		    deliveryAddress = {};

		if (typeof order.customer != "undefined") {
			customer = order.customer;
			if (typeof customer.billingAddress != "undefined") {
				billingAddress = customer.billingAddress;
			}
		}

		if (typeof order.property != "undefined") {
			delivery = order.property;
			if (typeof delivery.address != "undefined") {
				deliveryAddress = delivery.address;
			}
		}

		return React.createElement(
			"html",
			null,
			React.createElement("head", null),
			React.createElement(
				"body",
				null,
				React.createElement(
					"h1",
					null,
					"Order"
				),
				React.createElement(
					"pre",
					null,
					"Name: ",
					customer.name,
					"Billing Address:",
					billingAddress.line1,
					billingAddress.line2,
					billingAddress.line3,
					billingAddress.line4,
					billingAddress.postCode,
					customer.telephone,
					customer.email
				),
				React.createElement(
					"pre",
					null,
					"Delivery Address:",
					deliveryAddress.line1,
					deliveryAddress.line2,
					deliveryAddress.line3,
					deliveryAddress.line4,
					deliveryAddress.postCode,
					delivery.telephone,
					delivery.accessArrangements
				),
				order.products.map(function (product) {
					React.createElement(
						"pre",
						null,
						product.name
					);
				}),
				React.createElement(
					"pre",
					null,
					"SubTotal: ",
					order.subTotal,
					"VAT: ",
					order.VAT,
					"Total: ",
					order.total
				)
			)
		);
	}
});

if (process.browser) {
	ReactDOM.render(React.createElement(View, { locals: locals }), document);
}

exports = module.exports = View;