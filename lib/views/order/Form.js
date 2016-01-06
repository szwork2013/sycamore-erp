"use strict";

var domain = require("domain");
var React = require("react");
var ReactDOM = require("react-dom");
var Layout = require("sycamore-platform-components").Layout;
var ActionsBar = require("sycamore-platform-components").ActionsBar;
var ReactTabs = require("react-tabs");
var DatePicker = require("react-datepicker");
var Select = require("react-select");

var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

Tabs.setUseDefaultStyles(false);

var Order = require("../../components/Order");
var OrderStore = require("../../stores/OrderStore");
var OrderActions = require("../../actions/OrderActions");

var statusOptions = [{ value: "Draft", label: "Draft" }, { value: "Unaccepted", label: "Unaccepted" }, { value: "Accepted", label: "Accepted" }];

var View = React.createClass({
	displayName: "View",

	handleSaveClick: function handleSaveClick() {
		var d = domain.create();

		d.on("error", function (error) {
			console.log(error);
		});

		d.run(function () {
			OrderStore.getOrder(d.intercept(function (order) {
				OrderActions.saveOrder(order);
			}));
		});
	},
	renderSaveButton: function renderSaveButton() {
		var buttonAction;

		if (typeof this.props.locals != "undefined" && typeof this.props.locals.order != "undefined" && this.props.locals.order != null && typeof this.props.locals.order._id != "undefined") {
			buttonAction = "Save";
		} else {
			buttonAction = "Create";
		}

		return React.createElement(
			"a",
			{ className: "right fancy radius button tiny", href: "#", onClick: this.handleSaveClick },
			buttonAction
		);
	},
	renderEmailButton: function renderEmailButton() {
		var orderId;

		if (typeof this.props.locals != "undefined" && typeof this.props.locals.order != "undefined" && this.props.locals.order != null && typeof this.props.locals.order._id != "undefined") {
			return React.createElement(
				"a",
				{ className: "right fancy radius button tiny", href: "/sycamore-erp/order/" + this.props.locals.order._id + "/email" },
				"Email Order"
			);
		}
	},
	renderButtons: function renderButtons() {
		return React.createElement(
			"div",
			null,
			this.renderSaveButton(),
			this.renderEmailButton()
		);
	},
	render: function render() {
		var buttonAction, pageTitle, order;

		if (typeof this.props.locals.order != "undefined") {
			order = this.props.locals.order;
		}

		if (order != null && typeof order._id != "undefined") {
			pageTitle = "Edit order";
			buttonAction = "Save";
		} else {
			pageTitle = "New order";
			buttonAction = "Create";
		}

		return React.createElement(
			Layout,
			{ pageTitle: pageTitle, locals: this.props.locals },
			React.createElement(
				ActionsBar,
				{ pageTitle: pageTitle },
				this.renderButtons()
			),
			React.createElement(
				Tabs,
				null,
				React.createElement(
					TabList,
					null,
					React.createElement(
						Tab,
						null,
						"Order"
					),
					React.createElement(
						Tab,
						null,
						"Emails"
					)
				),
				React.createElement(
					TabPanel,
					null,
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(
							"div",
							{ className: "large-6 columns" },
							React.createElement(
								"fieldset",
								null,
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-4 columns" },
										React.createElement(
											"label",
											{ className: "right inline" },
											"Order Status"
										)
									),
									React.createElement(
										"div",
										{ className: "large-8 columns" },
										React.createElement(Select, {
											options: statusOptions,
											onChange: OrderActions.setStatus,
											value: this.state.order.status })
									)
								)
							)
						),
						React.createElement(
							"div",
							{ className: "large-6 columns" },
							React.createElement(
								"fieldset",
								null,
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-4 columns" },
										React.createElement(
											"label",
											{ className: "right inline" },
											"Delivery Date"
										)
									),
									React.createElement(
										"div",
										{ className: "large-3 columns end" },
										React.createElement(DatePicker, {
											dateFormat: "DD/MM/YYYY",
											selected: this.state.order.deliveryDate,
											onChange: OrderActions.setDeliveryDate })
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
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "large-4 columns" },
									React.createElement(
										"label",
										{ className: "right inline" },
										"Company Name / Name"
									)
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									React.createElement("input", { disabled: !this.props.editable,
										onChange: CustomerActions.updateCustomerName,
										type: "text",
										value: this.state.customer.name })
								)
							),
							React.createElement(
								"fieldset",
								null,
								React.createElement(
									"label",
									null,
									"Billing Address"
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
											"Line 1"
										)
									),
									React.createElement(
										"div",
										{ className: "large-8 columns" },
										React.createElement("input", { disabled: !this.props.editable,
											onChange: CustomerActions.updateCustomerBillingAddressLine1,
											type: "text",
											value: this.state.customer.billingAddress.line1 })
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
											"Line 2"
										)
									),
									React.createElement(
										"div",
										{ className: "large-8 columns" },
										React.createElement("input", { disabled: !this.props.editable,
											onChange: CustomerActions.updateCustomerBillingAddressLine2,
											type: "text",
											value: this.state.customer.billingAddress.line2 })
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
											"Line 3"
										)
									),
									React.createElement(
										"div",
										{ className: "large-8 columns" },
										React.createElement("input", { disabled: !this.props.editable,
											onChange: CustomerActions.updateCustomerBillingAddressLine3,
											type: "text",
											value: this.state.customer.billingAddress.line3 })
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
											"Line 4"
										)
									),
									React.createElement(
										"div",
										{ className: "large-8 columns" },
										React.createElement("input", { disabled: !this.props.editable,
											onChange: CustomerActions.updateCustomerBillingAddressLine4,
											type: "text",
											value: this.state.customer.billingAddress.line4 })
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
											"PostCode"
										)
									),
									React.createElement(
										"div",
										{ className: "large-8 columns" },
										React.createElement("input", { disabled: !this.props.editable,
											onChange: CustomerActions.updateCustomerBillingAddressPostCode,
											type: "text",
											value: this.state.customer.billingAddress.postCode })
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
									React.createElement("input", { disabled: !this.props.editable,
										onChange: CustomerActions.updateCustomerTelephone,
										type: "text",
										value: this.state.customer.telephone })
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
									React.createElement("input", { disabled: !this.props.editable,
										onChange: CustomerActions.updateCustomerEmail,
										type: "text",
										value: this.state.customer.email })
								)
							)
						),
						React.createElement(
							"div",
							{ className: "large-6 columns" },
							React.createElement(
								"fieldset",
								null,
								React.createElement(
									"label",
									null,
									"Delivery Address"
								),
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-4 columns" },
										React.createElement("label", { className: "right inline" })
									),
									React.createElement(
										"div",
										{ className: "large-8 columns" },
										React.createElement("input", { disabled: !this.props.editable,
											onChange: PropertyActions.updatePropertyAddressLine1,
											type: "text",
											value: this.state.property.address.line1 })
									)
								),
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-4 columns" },
										React.createElement("label", { className: "right inline" })
									),
									React.createElement(
										"div",
										{ className: "large-8 columns" },
										React.createElement("input", { disabled: !this.props.editable,
											onChange: PropertyActions.updatePropertyAddressLine2,
											type: "text",
											value: this.state.property.address.line2 })
									)
								),
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-4 columns" },
										React.createElement("label", { className: "right inline" })
									),
									React.createElement(
										"div",
										{ className: "large-8 columns" },
										React.createElement("input", { disabled: !this.props.editable,
											onChange: PropertyActions.updatePropertyAddressLine3,
											type: "text",
											value: this.state.property.address.line3 })
									)
								),
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-4 columns" },
										React.createElement("label", { className: "right inline" })
									),
									React.createElement(
										"div",
										{ className: "large-8 columns" },
										React.createElement("input", { disabled: !this.props.editable,
											onChange: PropertyActions.updatePropertyAddressLine4,
											type: "text",
											value: this.state.property.address.line4 })
									)
								),
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-4 columns" },
										React.createElement("label", { className: "right inline" })
									),
									React.createElement(
										"div",
										{ className: "large-8 columns" },
										React.createElement("input", { disabled: !this.props.editable,
											onChange: PropertyActions.updatePropertyAddressPostCode,
											type: "text",
											value: this.state.property.address.postCode })
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
										"Access Arrangements"
									)
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									React.createElement("textarea", { disabled: !this.props.editable,
										onChange: PropertyActions.updatePropertyAccessArrangements,
										value: this.state.property.accessArrangements })
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
										"Access Telephone"
									)
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									React.createElement("input", { disabled: !this.props.editable,
										onChange: PropertyActions.updatePropertyTelephone,
										type: "text",
										value: this.state.property.telephone })
								)
							)
						)
					)
				),
				React.createElement(TabPanel, null)
			)
		);
	}
});

if (process.browser) {
	ReactDOM.render(React.createElement(View, { locals: locals }), document);
}

exports = module.exports = View;