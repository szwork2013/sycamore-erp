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
		    quote = locals.quote;
		var customer = quote.customer,
		    quoteStatus = quote.status;

		if (typeof quote.customer != "undefined" && quote.customer != null) {
			customer = quote.customer;
		}

		if (quoteStatus != "Accepted") {
			return React.createElement(
				"a",
				{ href: this.props.locals.applicationUrl + "customer/" + customer._id + "/quote/" + quote._id + "/confirm", className: "right fancy radius button tiny", style: { "background": "lightgreen", "color": "green" } },
				React.createElement("i", { className: "in-button-icon fa fa-fw fa-check" }),
				" Agree"
			);
		}
	},
	render: function render() {
		var locals = this.props.locals;
		var applicationUrl = locals.applicationUrl;
		var quote = locals.quote,
		    customer = {},
		    billingAddress = {},
		    delivery = {},
		    deliveryAddress = {};
		var quoteStatus = quote.status;
		var pageTitle;

		if (quoteStatus == "Accepted") {
			pageTitle = "Quote";
		} else {
			pageTitle = "Quote Confirmation";
		}

		if (typeof quote.customer != "undefined" && quote.customer != null) {
			customer = quote.customer;
			if (typeof customer.billingAddress != "undefined" && customer.billingAddress != null) {
				billingAddress = customer.billingAddress;
			}
		}

		if (typeof quote.property != "undefined" && quote.property != null) {
			delivery = quote.property;
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
										"Quote Status"
									)
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									quote.status
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
									moment(quote.deliveryDate).format("DD/MM/YYYY")
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
										"Company Name / Name"
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
								quote.products.map(function (product, productIndex) {
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
											{ className: "table-cell text-right" },
											"£ ",
											product.product.price
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
										quote.subTotal
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
										quote.VAT
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
										quote.total
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