"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var ActionsBar = require("sycamore-platform-components").ActionsBar;

var moment = require("moment");

var View = React.createClass({
	displayName: "View",

	renderAgreeButton: function renderAgreeButton() {
		var locals = this.props.locals;
		var applicationUrl = locals.applicationUrl,
		    order = locals.order;
		var customer = order.customer,
		    orderStatus = order.status;

		if (typeof order.customer != "undefined" && order.customer != null) {
			customer = order.customer;
		}

		if (orderStatus != "Accepted") {
			return React.createElement(
				"a",
				{ href: this.props.locals.applicationUrl + "customer/" + customer._id + "/order/" + order._id + "/confirm", className: "right fancy radius button tiny", style: { "background": "lightgreen", "color": "green" } },
				React.createElement("i", { className: "in-button-icon fa fa-fw fa-check" }),
				" Agree"
			);
		}
	},
	render: function render() {
		var locals = this.props.locals;
		var applicationUrl = locals.applicationUrl;
		var order = locals.order,
		    customer = {},
		    billingAddress = {},
		    delivery = {},
		    deliveryAddress = {};
		var orderStatus = order.status;
		var pageTitle;

		if (orderStatus == "Accepted") {
			pageTitle = "Order";
		} else {
			pageTitle = "Order Confirmation";
		}

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
				React.createElement("link", { rel: "stylesheet", type: "text/css", href: "/css/styles.css" }),
				React.createElement(
					"title",
					null,
					pageTitle
				)
			),
			React.createElement(
				"body",
				{ style: { "background": "#f0f0f0" } },
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
					"div",
					{ style: { "background": "#fff" } },
					React.createElement(
						ActionsBar,
						{ pageTitle: pageTitle },
						this.renderAgreeButton()
					)
				),
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "large-8 large-offset-2 columns end" },
						React.createElement(
							"fieldset",
							{ style: { "background": "#fff" } },
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "large-12 columns" },
									React.createElement(
										"label",
										null,
										React.createElement("input", { type: "checkbox" }),
										" I confirm that the quantities, colours, options and all items of furniture are correct on this order."
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
										"label",
										null,
										React.createElement("input", { type: "checkbox" }),
										" I confirm that my property will be in a condition where it is ready for the furniture to be installed on the delivery date."
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
										"label",
										null,
										React.createElement("input", { type: "checkbox" }),
										" I agree to give 48 hours notice in the event that I need to change the delivery date."
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
										"label",
										null,
										React.createElement("input", { type: "checkbox" }),
										" I acknowledge that agreeing to this order will result in me/my company being under obligation to pay for this order in full prior to installation."
									)
								)
							)
						)
					)
				),
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "large-6 columns" },
						React.createElement(
							"fieldset",
							{ style: { "background": "#fff" } },
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "large-4 columns" },
									React.createElement(
										"label",
										{ className: "right" },
										"Order Status"
									)
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									order.status
								)
							)
						)
					),
					React.createElement(
						"div",
						{ className: "large-6 columns" },
						React.createElement(
							"fieldset",
							{ style: { "background": "#fff" } },
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "large-4 columns" },
									React.createElement(
										"label",
										{ className: "right" },
										"Delivery Date"
									)
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									moment(order.delivery.date).format("DD/MM/YYYY")
								)
							)
						)
					)
				),
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "large-6 columns" },
						React.createElement(
							"fieldset",
							{ style: { "background": "#fff" } },
							React.createElement(
								"label",
								null,
								"Billing Details"
							),
							React.createElement("hr", null),
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "large-4 columns" },
									React.createElement(
										"label",
										{ className: "right" },
										"Customer Name"
									)
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									order.billing.customerName
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
										"Company Name"
									)
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									order.billing.companyName
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
											order.billing.address.line1
										)
									),
									React.createElement(
										"div",
										{ className: "row" },
										React.createElement(
											"div",
											{ className: "large-12 columns" },
											order.billing.address.line2
										)
									),
									React.createElement(
										"div",
										{ className: "row" },
										React.createElement(
											"div",
											{ className: "large-12 columns" },
											order.billing.address.line3
										)
									),
									React.createElement(
										"div",
										{ className: "row" },
										React.createElement(
											"div",
											{ className: "large-12 columns" },
											order.billing.address.line4
										)
									),
									React.createElement(
										"div",
										{ className: "row" },
										React.createElement(
											"div",
											{ className: "large-12 columns" },
											order.billing.address.postCode
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
									order.billing.telephone
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
									order.billing.email
								)
							)
						)
					),
					React.createElement(
						"div",
						{ className: "large-6 columns" },
						React.createElement(
							"fieldset",
							{ style: { "background": "#fff" } },
							React.createElement(
								"label",
								null,
								"Delivery Details"
							),
							React.createElement("hr", null),
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
											order.delivery.address.line1
										)
									),
									React.createElement(
										"div",
										{ className: "row" },
										React.createElement(
											"div",
											{ className: "large-12 columns" },
											order.delivery.address.line2
										)
									),
									React.createElement(
										"div",
										{ className: "row" },
										React.createElement(
											"div",
											{ className: "large-12 columns" },
											order.delivery.address.line3
										)
									),
									React.createElement(
										"div",
										{ className: "row" },
										React.createElement(
											"div",
											{ className: "large-12 columns" },
											order.delivery.address.line4
										)
									),
									React.createElement(
										"div",
										{ className: "row" },
										React.createElement(
											"div",
											{ className: "large-12 columns" },
											order.delivery.address.postCode
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
									order.delivery.telephone
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
									order.delivery.accessArrangements
								)
							)
						)
					)
				),
				React.createElement(
					"div",
					{ className: "row", style: { "background": "#f0f0f0" } },
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
										{ className: "table-cell large-1 text-right" },
										"Item Price"
									),
									React.createElement(
										"div",
										{ className: "table-cell large-1 text-center" },
										"Quantity"
									),
									React.createElement(
										"div",
										{ className: "table-cell large-1 text-right" },
										"Sub Total"
									),
									React.createElement(
										"div",
										{ className: "table-cell large-1 text-right" },
										"VAT"
									),
									React.createElement(
										"div",
										{ className: "table-cell large-1 text-right" },
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
											product.name
										),
										React.createElement(
											"div",
											{ className: "table-cell text-right" },
											"£ ",
											product.price
										),
										React.createElement(
											"div",
											{ className: "table-cell text-center" },
											product.quantity
										),
										React.createElement(
											"div",
											{ className: "table-cell text-right" },
											"£ ",
											product.subTotal
										),
										React.createElement(
											"div",
											{ className: "table-cell text-right" },
											"£ ",
											product.VAT
										),
										React.createElement(
											"div",
											{ className: "table-cell text-right" },
											"£ ",
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
										{ className: "table-cell left-box" },
										"Sub Total"
									),
									React.createElement(
										"div",
										{ className: "table-cell right-box text-right" },
										"£ ",
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
										{ className: "table-cell left-box" },
										"VAT"
									),
									React.createElement(
										"div",
										{ className: "table-cell right-box text-right" },
										"£ ",
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
										{ className: "table-cell left-box", style: { "background": "lightblue", "color": "#02f" } },
										React.createElement(
											"strong",
											null,
											"Total"
										)
									),
									React.createElement(
										"div",
										{ className: "table-cell right-box text-right" },
										"£ ",
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