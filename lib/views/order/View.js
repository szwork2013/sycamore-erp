"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var ActionsBar = require("sycamore-platform-components").ActionsBar;

var OrderStore = require("../../stores/OrderStore");
var OrderActions = require("../../actions/OrderActions");

var Api = require("../../services/Api");

var moment = require("moment");
var numbro = require("numbro");

numbro.culture('en-GB');

var View = React.createClass({
	displayName: "View",

	_onChange: function _onChange() {
		this.setState({
			order: OrderStore.getState()
		});
	},
	componentDidMount: function componentDidMount() {
		OrderStore.addChangeListener(this._onChange);
		if (typeof this.props.locals != "undefined" && typeof this.props.locals.order != "undefined") {
			OrderStore.loadData(this.props.locals.order);
		}
	},
	componentWillUnmount: function componentWillUnmount() {
		OrderStore.removeChangeListener(this._onChange);
	},
	getInitialState: function getInitialState() {
		return {
			order: OrderStore.getState(),
			editable: false
		};
	},
	handleEditClick: function handleEditClick() {
		this.setState({ editable: true });
	},
	renderEditButton: function renderEditButton() {
		if (this.state.editable == false && this.state.order.status != "Accepted") {
			return React.createElement(
				"a",
				{ className: "right fancy radius button tiny", href: "#", onClick: this.handleEditClick, style: { "background": "lightgreen", "color": "green" } },
				React.createElement("i", { className: "in-button-icon fa fa-fw fa-pencil-square-o" }),
				" Edit"
			);
		}
	},
	renderSaveButton: function renderSaveButton() {
		if (this.state.editable == true && this.state.order.status != "Accepted") {
			return React.createElement(
				"a",
				{ className: "right fancy radius button tiny", href: "#", onClick: OrderActions.saveOrder.bind(this, this.state.order), style: { "background": "lightgreen", "color": "green" } },
				React.createElement("i", { className: "in-button-icon fa fa-fw fa-floppy-o" }),
				" Save"
			);
		}
	},
	renderDateAccepted: function renderDateAccepted() {
		if (this.state.order.dateAccepted != null) {
			return React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "large-4 columns" },
					React.createElement(
						"label",
						{ className: "right inline" },
						"Date Accepted"
					)
				),
				React.createElement(
					"div",
					{ className: "large-8 columns" },
					React.createElement(
						"label",
						{ className: "left inline" },
						moment(this.state.order.dateAccepted).format("DD/MM/YYYY")
					)
				)
			);
		}
	},
	handleAgreeClick: function handleAgreeClick() {
		var applicationUrl = this.props.locals.applicationUrl;
		var order = OrderStore.getState();
		var orderId = order._id;

		Api.postOrder(orderId, order, function (response) {
			window.location.href = applicationUrl + "customer/a/order/" + orderId + "/confirm";
		});
	},
	renderAgreeButton: function renderAgreeButton() {
		var locals = this.props.locals;
		var applicationUrl = locals.applicationUrl,
		    order = locals.order;

		if (order.status != "Accepted") {
			if (this.state.order.terms.orderCorrectAgreed && this.state.order.terms.propertyTidyAgreed && this.state.order.terms.noticeAgreed && this.state.order.terms.paymentAgreed) {
				return React.createElement(
					"a",
					{ href: "#", className: "right fancy radius button tiny", style: { "background": "lightgreen", "color": "green" }, onClick: this.handleAgreeClick },
					React.createElement("i", { className: "in-button-icon fa fa-fw fa-check" }),
					" Agree"
				);
			} else {
				return React.createElement(
					"a",
					{ href: "#", className: "right fancy radius button tiny", disabled: true, style: { "background": "lightcoral", "color": "red" } },
					React.createElement("i", { className: "in-button-icon fa fa-fw fa-check" }),
					" Agree"
				);
			}
		}
	},
	render: function render() {
		var locals = this.props.locals;
		var applicationUrl = locals.applicationUrl;
		var order = locals.order; /*,
                            customer = {},
                            billingAddress = {},
                            delivery = {},
                            deliveryAddress = {}; */
		var orderStatus = order.status;
		var pageTitle;

		var agreeText = "";

		if (orderStatus == "Accepted") {
			pageTitle = "Order";
			agreeText = "This order has been agreed. Thank you.";
		} else {
			pageTitle = "Order Confirmation";
			agreeText = "Please click the Agree button to confirm and agree your order.";
		}
		/*
  		if ((typeof order.customer != "undefined") && (order.customer != null)) {
  			customer = order.customer;
  			if ((typeof customer.billingAddress != "undefined") && (customer.billingAddress != null)) {
  				billingAddress = customer.billingAddress;
  			}
  		}
  
  		if ((typeof order.property != "undefined") && (order.property != null)) {
  			delivery = order.property;
  			if ((typeof delivery.address != "undefined") && (delivery.address != null)) {
  				deliveryAddress = delivery.address;
  			}
  		}
  */
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
						this.renderEditButton(),
						this.renderSaveButton()
					)
				),
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "large-12 columns" },
						React.createElement(
							"p",
							null,
							React.createElement("br", null),
							React.createElement(
								"strong",
								null,
								"Instructions"
							)
						),
						React.createElement(
							"p",
							null,
							"Please check over this order and fill in any details that are missing by clicking the \"Edit\" button in the top right corner and then the \"Save\" button to save your changes."
						),
						React.createElement(
							"p",
							null,
							"Please confirm that the details of the products are correct and then tick the boxes at the bottom of this page."
						),
						React.createElement(
							"p",
							null,
							"Finally, to confirm and Agree to this order please click the \"Agree\" button at the bottom right of this page."
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
									React.createElement(
										"label",
										{ className: "left" },
										order.status
									)
								)
							),
							this.renderDateAccepted()
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
									React.createElement(
										"label",
										{ className: "left" },
										moment(order.delivery.date).format("DD/MM/YYYY")
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
										{ className: "right inline" },
										"Customer Name"
									)
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									React.createElement("input", { disabled: !this.state.editable, type: "text", value: this.state.order.billing.customerName, onChange: OrderActions.updateBillingCustomerName })
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
										{ className: "right inline" },
										"Company Name"
									)
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									React.createElement("input", { disabled: !this.state.editable, type: "text", value: order.billing.companyName, onChange: OrderActions.updateBillingCompanyName })
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
										{ className: "right inline" },
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
											React.createElement("input", { disabled: !this.state.editable, type: "text", value: order.billing.address.line1, onChange: OrderActions.updateBillingAddressLine1 })
										)
									),
									React.createElement(
										"div",
										{ className: "row" },
										React.createElement(
											"div",
											{ className: "large-12 columns" },
											React.createElement("input", { disabled: !this.state.editable, type: "text", value: order.billing.address.line2, onChange: OrderActions.updateBillingAddressLine2 })
										)
									),
									React.createElement(
										"div",
										{ className: "row" },
										React.createElement(
											"div",
											{ className: "large-12 columns" },
											React.createElement("input", { disabled: !this.state.editable, type: "text", value: order.billing.address.line3, onChange: OrderActions.updateBillingAddressLine3 })
										)
									),
									React.createElement(
										"div",
										{ className: "row" },
										React.createElement(
											"div",
											{ className: "large-12 columns" },
											React.createElement("input", { disabled: !this.state.editable, type: "text", value: order.billing.address.line4, onChange: OrderActions.updateBillingAddressLine4 })
										)
									),
									React.createElement(
										"div",
										{ className: "row" },
										React.createElement(
											"div",
											{ className: "large-12 columns" },
											React.createElement("input", { disabled: !this.state.editable, type: "text", value: order.billing.address.postCode, onChange: OrderActions.updateBillingAddressPostCode })
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
										{ className: "right inline" },
										"Telephone"
									)
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									React.createElement("input", { disabled: !this.state.editable, type: "text", value: order.billing.telephone, onChange: OrderActions.updateBillingTelephone })
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
										{ className: "right inline" },
										"Email"
									)
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									React.createElement("input", { disabled: !this.state.editable, type: "text", value: order.billing.email, onChange: OrderActions.updateBillingEmail })
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
										{ className: "right inline" },
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
											React.createElement("input", { disabled: !this.state.editable, type: "text", value: order.delivery.address.line1, onChange: OrderActions.updateDeliveryAddressLine1 })
										)
									),
									React.createElement(
										"div",
										{ className: "row" },
										React.createElement(
											"div",
											{ className: "large-12 columns" },
											React.createElement("input", { disabled: !this.state.editable, type: "text", value: order.delivery.address.line2, onChange: OrderActions.updateDeliveryAddressLine2 })
										)
									),
									React.createElement(
										"div",
										{ className: "row" },
										React.createElement(
											"div",
											{ className: "large-12 columns" },
											React.createElement("input", { disabled: !this.state.editable, type: "text", value: order.delivery.address.line3, onChange: OrderActions.updateDeliveryAddressLine3 })
										)
									),
									React.createElement(
										"div",
										{ className: "row" },
										React.createElement(
											"div",
											{ className: "large-12 columns" },
											React.createElement("input", { disabled: !this.state.editable, type: "text", value: order.delivery.address.line4, onChange: OrderActions.updateDeliveryAddressLine4 })
										)
									),
									React.createElement(
										"div",
										{ className: "row" },
										React.createElement(
											"div",
											{ className: "large-12 columns" },
											React.createElement("input", { disabled: !this.state.editable, type: "text", value: order.delivery.address.postCode, onChange: OrderActions.updateDeliveryAddressPostCode })
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
										{ className: "right inline" },
										"Telephone"
									)
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									React.createElement("input", { disabled: !this.state.editable, type: "text", value: order.delivery.telephone, onChange: OrderActions.updateDeliveryTelephone })
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
										{ className: "right inline" },
										"Access Arrangements"
									)
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									React.createElement("textarea", { disabled: !this.state.editable, value: order.delivery.accessArrangements, onChange: OrderActions.updateDeliveryAccessArrangements })
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
										{ className: "table-cell large-10" },
										"Product"
									),
									React.createElement(
										"div",
										{ className: "table-cell large-1" },
										" "
									),
									React.createElement(
										"div",
										{ className: "table-cell large-1" },
										" "
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
											{ className: "table-cell" },
											" "
										),
										React.createElement(
											"div",
											{ className: "table-cell" },
											" "
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
										{ className: "table-cell left-box" },
										"Sub Total"
									),
									React.createElement(
										"div",
										{ className: "table-cell right-box text-right" },
										numbro(order.subTotal).formatCurrency("0.00")
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
										{ className: "table-cell left-box" },
										"VAT"
									),
									React.createElement(
										"div",
										{ className: "table-cell right-box text-right" },
										numbro(order.VAT).formatCurrency("0.00")
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
										numbro(order.total).formatCurrency("0.00")
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
										React.createElement("input", { disabled: this.state.order.terms.orderCorrectAgreed, type: "checkbox", checked: this.state.order.terms.orderCorrectAgreed, onChange: OrderActions.setOrderCorrect }),
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
										React.createElement("input", { disabled: this.state.order.terms.propertyTidyAgreed, type: "checkbox", checked: this.state.order.terms.propertyTidyAgreed, onChange: OrderActions.setPropertyTidy }),
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
										React.createElement("input", { disabled: this.state.order.terms.noticeAgreed, type: "checkbox", checked: this.state.order.terms.noticeAgreed, onChange: OrderActions.setNoticeAgreed }),
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
										React.createElement("input", { disabled: this.state.order.terms.paymentAgreed, type: "checkbox", checked: this.state.order.terms.paymentAgreed, onChange: OrderActions.setPaymentAgreed }),
										" I acknowledge that agreeing to this order will result in me/my company being under obligation to pay for this order in full prior to installation."
									)
								)
							)
						)
					)
				),
				React.createElement(
					"div",
					{ style: { "background": "#fff" } },
					React.createElement(
						ActionsBar,
						{ pageTitle: agreeText },
						this.renderAgreeButton()
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