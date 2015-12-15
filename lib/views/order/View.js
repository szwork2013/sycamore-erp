"use strict";

var React = require("react");
var ActionsBar = require("sycamore-platform-components").ActionsBar;

var View = React.createClass({
	displayName: "View",

	render: function render() {
		var order = this.props.locals.order,
		    customer = {},
		    billingAddress = {},
		    delivery = {},
		    deliveryAddress = {};

		if (typeof order.customer != "undefined" && order.customer != null) {
			customer = order.customer;
			if (typeof customer.billingAddress != "undefined" && customer.billingAddress != null) {
				billingAddress = customer.billingAddress;
			}
		}

		if (typeof order.property != "undefined" && order.property != null) {
			delivery = order.property;
			if (typeof delivery.address != "undefined" && delivery.address != null) {
				deliveryAddress = delivery.address;
			}
		}

		return React.createElement(
			"html",
			null,
			React.createElement(
				"head",
				null,
				React.createElement("meta", { charSet: "utf-8" }),
				React.createElement("link", { rel: "stylesheet", type: "text/css", href: "/css/styles.css" })
			),
			React.createElement(
				"body",
				null,
				React.createElement(
					ActionsBar,
					{ pageTitle: "Order" },
					React.createElement(
						"a",
						{ href: this.props.locals.applicationUrl + "order", className: "right fancy radius button tiny" },
						React.createElement("i", { className: "in-button-icon fa fa-fw fa-plus" }),
						" Save & Agree"
					)
				),
				React.createElement(
					"div",
					{ "class": "row" },
					React.createElement(
						"div",
						{ "class": "large-6 columns" },
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
						)
					),
					React.createElement(
						"div",
						{ "class": "large-6 columns" },
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
						)
					)
				),
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "large-12 columns" },
						React.createElement(
							"div",
							{ className: "table" },
							React.createElement(
								"div",
								{ className: "table-header" },
								React.createElement(
									"div",
									{ className: "table-row" },
									React.createElement(
										"div",
										{ className: "table-cell large-6" },
										"Product"
									),
									React.createElement(
										"div",
										{ className: "table-cell large-1" },
										"Item Price"
									),
									React.createElement(
										"div",
										{ className: "table-cell large-1" },
										"Quantity"
									),
									React.createElement(
										"div",
										{ className: "table-cell large-1" },
										"Sub Total"
									),
									React.createElement(
										"div",
										{ className: "table-cell large-1" },
										"VAT"
									),
									React.createElement(
										"div",
										{ className: "table-cell large-1" },
										"Total"
									)
								)
							),
							React.createElement(
								"div",
								{ className: "table-body" },
								order.products.map(function (product, productIndex) {
									return React.createElement(
										"div",
										{ className: "table-row", key: productIndex },
										React.createElement(
											"div",
											{ className: "table-cell" },
											product.product.name
										),
										React.createElement(
											"div",
											{ className: "table-cell" },
											product.product.price
										),
										React.createElement(
											"div",
											{ className: "table-cell" },
											product.quantity
										),
										React.createElement(
											"div",
											{ className: "table-cell" },
											product.subTotal
										),
										React.createElement(
											"div",
											{ className: "table-cell" },
											product.VAT
										),
										React.createElement(
											"div",
											{ className: "table-cell" },
											product.total
										)
									);
								}, this)
							),
							React.createElement(
								"div",
								{ className: "table-footer" },
								React.createElement(
									"div",
									{ className: "table-row" },
									React.createElement(
										"div",
										{ className: "table-cell" },
										" "
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										" "
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										" "
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										" "
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										"Sub Total"
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										this.props.order.subTotal
									)
								),
								React.createElement(
									"div",
									{ className: "table-row" },
									React.createElement(
										"div",
										{ className: "table-cell" },
										" "
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										" "
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										" "
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										" "
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										"VAT"
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										this.props.order.VAT
									)
								),
								React.createElement(
									"div",
									{ className: "table-row" },
									React.createElement(
										"div",
										{ className: "table-cell" },
										" "
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										" "
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										" "
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										" "
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										React.createElement(
											"strong",
											null,
											"Total"
										)
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										this.props.order.total
									)
								)
							)
						)
					)
				),
				React.createElement("script", { type: "text/javascript", dangerouslySetInnerHTML: { __html: js } }),
				React.createElement("script", { type: "text/javascript", src: jsTemplate })
			)
		);
	}
});

if (process.browser) {
	ReactDOM.render(React.createElement(View, { locals: locals }), document);
}

exports = module.exports = View;