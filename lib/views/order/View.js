"use strict";

var React = require("react");

var View = React.createClass({
	displayName: "View",

	render: function render() {
		var order = this.props.locals.order;

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
					order.customer.name,
					"Billing Address:",
					order.customer.billingAddress.line1,
					order.customer.billingAddress.line2,
					order.customer.billingAddress.line3,
					order.customer.billingAddress.line4,
					order.customer.billingAddress.postCode,
					order.customer.billingAddress.telephone,
					order.customer.billingAddress.email
				),
				React.createElement(
					"pre",
					null,
					"Delivery Address:",
					order.property.address.line1,
					order.property.address.line2,
					order.property.address.line3,
					order.property.address.line4,
					order.property.address.postCode,
					order.property.telephone,
					order.property.accessArrangements
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