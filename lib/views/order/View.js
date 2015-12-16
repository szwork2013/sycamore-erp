"use strict";

var React = require("react");
var ActionsBar = require("sycamore-platform-components").ActionsBar;

var View = React.createClass({
	displayName: "View",

	render: function render() {
		var locals = this.props.locals;
		var applicationUrl = locals.applicationUrl;
		var order = locals.order,
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

		var js = "var locals = JSON.parse('" + JSON.stringify(locals) + "');";
		var jsTemplate = "";
		if (applicationUrl == "/") {
			jsTemplate = "/js/views/" + locals.template + ".js";
		} else {
			jsTemplate = "/node_modules" + applicationUrl + "public/js/views/" + locals.template + ".js";
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
					"div",
					{ className: "row", style: { "background": "#0a1724" } },
					React.createElement(
						"div",
						{ className: "large-1 columns" },
						React.createElement("img", { className: "img-responsive", src: "http://www.fusionfurnituresolutions.co.uk/images/logo.png" })
					)
				),
				React.createElement(
					ActionsBar,
					{ pageTitle: "Order" },
					React.createElement(
						"a",
						{ href: this.props.locals.applicationUrl + "order", className: "right fancy radius button tiny", style: { "background": "lightgreen", "color": "green" } },
						React.createElement("i", { className: "in-button-icon fa fa-fw fa-plus" }),
						" Save & Agree"
					)
				),
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "large-6 columns" },
						React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"div",
								{ className: "large-4 columns" },
								React.createElement(
									"label",
									{ className: "right" },
									"Name"
								)
							),
							React.createElement(
								"div",
								{ className: "large-8 columns" },
								customer.name
							)
						),
						React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"div",
								{ className: "large-4 columns" },
								React.createElement(
									"label",
									{ className: "right" },
									"Billing Address"
								)
							),
							React.createElement(
								"div",
								{ className: "large-8 columns" },
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-12 columns" },
										billingAddress.line1
									)
								),
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-12 columns" },
										billingAddress.line2
									)
								),
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-12 columns" },
										billingAddress.line3
									)
								),
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-12 columns" },
										billingAddress.line4
									)
								),
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-12 columns" },
										billingAddress.postCode
									)
								)
							)
						),
						React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"div",
								{ className: "large-4 columns" },
								React.createElement(
									"label",
									{ className: "right" },
									"Telephone"
								)
							),
							React.createElement(
								"div",
								{ className: "large-8 columns" },
								customer.telephone
							)
						),
						React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"div",
								{ className: "large-4 columns" },
								React.createElement(
									"label",
									{ className: "right" },
									"Email"
								)
							),
							React.createElement(
								"div",
								{ className: "large-8 columns" },
								customer.email
							)
						)
					),
					React.createElement(
						"div",
						{ className: "large-6 columns" },
						React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"div",
								{ className: "large-4 columns" },
								React.createElement(
									"label",
									{ className: "right" },
									"Delivery Address"
								)
							),
							React.createElement(
								"div",
								{ className: "large-8 columns" },
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-12 columns" },
										deliveryAddress.line1
									)
								),
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-12 columns" },
										deliveryAddress.line2
									)
								),
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-12 columns" },
										deliveryAddress.line3
									)
								),
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-12 columns" },
										deliveryAddress.line4
									)
								),
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-12 columns" },
										deliveryAddress.postCode
									)
								)
							)
						),
						React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"div",
								{ className: "large-4 columns" },
								React.createElement(
									"label",
									{ className: "right" },
									"Telephone"
								)
							),
							React.createElement(
								"div",
								{ className: "large-8 columns" },
								delivery.telephone
							)
						),
						React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"div",
								{ className: "large-4 columns" },
								React.createElement(
									"label",
									{ className: "right" },
									"Access Arrangements"
								)
							),
							React.createElement(
								"div",
								{ className: "large-8 columns" },
								delivery.accessArrangements
							)
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
										order.subTotal
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
										order.VAT
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
											"label",
											{ className: "right" },
											"Total"
										)
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										order.total
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