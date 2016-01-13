"use strict";

var domain = require("domain");
var React = require("react");
var ReactDOM = require("react-dom");
var Layout = require("sycamore-platform-components").Layout;
var ActionsBar = require("sycamore-platform-components").ActionsBar;
var ReactTabs = require("react-tabs");
var DatePicker = require("react-datepicker");
var Select = require("react-select");

var moment = require("moment");
var numbro = require("numbro");

numbro.culture('en-GB');

var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

Tabs.setUseDefaultStyles(false);

var Order = require("../../components/Order");
var OrderStore = require("../../stores/OrderStore");
var OrderActions = require("../../actions/OrderActions");

var Api = require("../../services/Api");

var statusOptions = [{ value: "Draft", label: "Draft" }, { value: "Unaccepted", label: "Unaccepted" }, { value: "Accepted", label: "Accepted" }];

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
			order: OrderStore.getState()
		};
	},
	handleSaveClick: function handleSaveClick(e) {
		e.preventDefault();
		var order = OrderStore.getState();
		var applicationUrl = this.props.locals.applicationUrl;

		if (typeof order._id != "undefined" && order._id != null) {
			// POST
			var orderId = order._id;
			Api.postOrder(orderId, order, function (response) {
				window.location.href = applicationUrl + "order/" + orderId;
			});
		} else {
			// PUT
			Api.putOrder(order, function (response) {
				var orderId = response.body._id;
				window.location.href = applicationUrl + "order/" + orderId;
			});
		}
	},
	renderAddProductButton: function renderAddProductButton() {
		if (this.state.order.status != "Accepted") {
			return React.createElement(
				"a",
				{ className: "button tiny radius fancy", onClick: OrderActions.addProductToOrder },
				"Add Product"
			);
		}
	},
	renderSaveButton: function renderSaveButton() {
		var buttonAction;

		if (typeof this.props.locals != "undefined" && typeof this.props.locals.order != "undefined" && this.props.locals.order != null && typeof this.props.locals.order._id != "undefined") {
			buttonAction = "Save";
		} else {
			buttonAction = "Create";
		}

		return React.createElement("input", { className: "right fancy radius button tiny", type: "submit", value: buttonAction });
	},
	renderDraftButton: function renderDraftButton() {
		return React.createElement(
			"a",
			{ className: "right fancy radius button tiny", href: "#", onClick: OrderActions.setStatus.bind(this, "Draft") },
			"Make Draft"
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
		if (this.state.order.status != "Accepted") {
			return React.createElement(
				"div",
				null,
				this.renderSaveButton(),
				this.renderEmailButton()
			);
		} else {
			return React.createElement(
				"div",
				null,
				this.renderDraftButton()
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
	render: function render() {
		var buttonAction, pageTitle, order, editable;

		if (this.state.order.status == "Accepted") {
			editable = false;
		} else {
			editable = true;
		}

		if (typeof this.props.locals.order != "undefined") {
			order = this.props.locals.order;
		}

		if (order != null && typeof order._id != "undefined") {
			pageTitle = "Edit order";
		} else {
			pageTitle = "New order";
		}

		return React.createElement(
			Layout,
			{ pageTitle: pageTitle, locals: this.props.locals },
			React.createElement(
				"form",
				{ action: "#", onSubmit: this.handleSaveClick },
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
											React.createElement(
												"label",
												{ className: "left inline" },
												this.state.order.status
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
											React.createElement(DatePicker, { disabled: !editable,
												dateFormat: "DD/MM/YYYY",
												selected: moment(this.state.order.delivery.date),
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
											"Customer Name"
										)
									),
									React.createElement(
										"div",
										{ className: "large-8 columns" },
										React.createElement("input", { disabled: !editable,
											onChange: OrderActions.updateBillingCustomerName,
											type: "text",
											required: true,
											value: this.state.order.billing.customerName })
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
										React.createElement("input", { disabled: !editable,
											onChange: OrderActions.updateBillingCompanyName,
											type: "text",
											value: this.state.order.billing.companyName })
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
											React.createElement("input", { disabled: !editable,
												onChange: OrderActions.updateBillingAddressLine1,
												type: "text",
												value: this.state.order.billing.address.line1 })
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
											React.createElement("input", { disabled: !editable,
												onChange: OrderActions.updateBillingAddressLine2,
												type: "text",
												value: this.state.order.billing.address.line2 })
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
											React.createElement("input", { disabled: !editable,
												onChange: OrderActions.updateBillingAddressLine3,
												type: "text",
												value: this.state.order.billing.address.line3 })
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
											React.createElement("input", { disabled: !editable,
												onChange: OrderActions.updateBillingAddressLine4,
												type: "text",
												value: this.state.order.billing.address.line4 })
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
											React.createElement("input", { disabled: !editable,
												onChange: OrderActions.updateBillingAddressPostCode,
												type: "text",
												value: this.state.order.billing.address.postCode })
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
										React.createElement("input", { disabled: !editable,
											onChange: OrderActions.updateBillingTelephone,
											type: "text",
											value: this.state.order.billing.telephone })
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
										React.createElement("input", { disabled: !editable,
											onChange: OrderActions.updateBillingEmail,
											type: "email",
											required: true,
											value: this.state.order.billing.email })
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
											React.createElement(
												"label",
												{ className: "right inline" },
												"Line 1"
											)
										),
										React.createElement(
											"div",
											{ className: "large-8 columns" },
											React.createElement("input", { disabled: !editable,
												onChange: OrderActions.updateDeliveryAddressLine1,
												type: "text",
												value: this.state.order.delivery.address.line1 })
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
											React.createElement("input", { disabled: !editable,
												onChange: OrderActions.updateDeliveryAddressLine2,
												type: "text",
												value: this.state.order.delivery.address.line2 })
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
											React.createElement("input", { disabled: !editable,
												onChange: OrderActions.updateDeliveryAddressLine3,
												type: "text",
												value: this.state.order.delivery.address.line3 })
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
											React.createElement("input", { disabled: !editable,
												onChange: OrderActions.updateDeliveryAddressLine4,
												type: "text",
												value: this.state.order.delivery.address.line4 })
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
												"Post Code"
											)
										),
										React.createElement(
											"div",
											{ className: "large-8 columns" },
											React.createElement("input", { disabled: !editable,
												onChange: OrderActions.updateDeliveryAddressPostCode,
												type: "text",
												value: this.state.order.delivery.address.postCode })
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
										React.createElement("textarea", { disabled: !editable,
											onChange: OrderActions.updateDeliveryAccessArrangements,
											value: this.state.order.delivery.accessArrangements })
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
										React.createElement("input", { disabled: !editable,
											onChange: OrderActions.updateDeliveryTelephone,
											type: "text",
											value: this.state.order.delivery.telephone })
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
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-12 columns" },
										this.renderAddProductButton()
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
												{ className: "table-cell large-9" },
												"Product"
											),
											React.createElement(
												"div",
												{ className: "table-cell large-1" },
												" "
											),
											React.createElement(
												"div",
												{ className: "table-cell large-2" },
												" "
											)
										)
									),
									React.createElement(
										"div",
										{ className: "table-body" },
										this.state.order.products.map(function (product, productIndex) {
											return React.createElement(
												"div",
												{ className: "table-row", key: productIndex },
												React.createElement(
													"div",
													{ className: "table-cell", style: { "padding": 0 } },
													React.createElement("input", { disabled: !editable, onChange: OrderActions.setProductName.bind(this, productIndex), type: "text", value: product.name, style: { "margin": 0 } })
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
												{ className: "table-cell text-right right-box", style: { "padding": 0 } },
												React.createElement(
													"div",
													{ className: "row collapse" },
													React.createElement(
														"div",
														{ className: "large-3 columns" },
														React.createElement(
															"span",
															{ className: "prefix" },
															"£"
														)
													),
													React.createElement(
														"div",
														{ className: "large-9 columns" },
														React.createElement("input", { disabled: !editable,
															className: "subTotal text-right",
															type: "number",
															onChange: OrderActions.setSubTotal,
															value: this.state.order.subTotal,
															style: { "margin": 0 },
															step: "0.01" })
													)
												)
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
												{ className: "table-cell text-right right-box", style: { "padding": 0 } },
												React.createElement(
													"div",
													{ className: "row collapse" },
													React.createElement(
														"div",
														{ className: "large-3 columns" },
														React.createElement(
															"span",
															{ className: "prefix" },
															"£"
														)
													),
													React.createElement(
														"div",
														{ className: "large-9 columns" },
														React.createElement(
															"span",
															{ className: "text-right",
																style: {
																	"margin": 0,
																	"-webkit-appearance": "none",
																	"-webkit-border-radius": "0px",
																	"background-color": "#FFFFFF",
																	"font-family": "inherit",
																	"border-style": "solid",
																	"border-width": "1px",
																	"border-color": "#cccccc",
																	"box-shadow": "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
																	"color": "rgba(0, 0, 0, 0.75)",
																	"display": "block",
																	"font-size": "0.875rem",
																	"padding": "0.5rem",
																	"height": "2.3125rem",
																	"width": "100%",
																	"-webkit-box-sizing": "border-box",
																	"-moz-box-sizing": "border-box",
																	"box-sizing": "border-box",
																	"transition": "box-shadow 0.45s, border-color 0.45s ease-in-out"
																} },
															numbro(this.state.order.VAT).formatCurrency("0.00")
														)
													)
												)
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
												React.createElement(
													"strong",
													null,
													"Total"
												)
											),
											React.createElement(
												"div",
												{ className: "table-cell text-right right-box", style: { "padding": 0 } },
												React.createElement(
													"div",
													{ className: "row collapse" },
													React.createElement(
														"div",
														{ className: "large-3 columns" },
														React.createElement(
															"span",
															{ className: "prefix" },
															"£"
														)
													),
													React.createElement(
														"div",
														{ className: "large-9 columns" },
														React.createElement(
															"span",
															{ className: "text-right",
																style: {
																	"margin": 0,
																	"-webkit-appearance": "none",
																	"-webkit-border-radius": "0px",
																	"background-color": "#FFFFFF",
																	"font-family": "inherit",
																	"border-style": "solid",
																	"border-width": "1px",
																	"border-color": "#cccccc",
																	"box-shadow": "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
																	"color": "rgba(0, 0, 0, 0.75)",
																	"display": "block",
																	"font-size": "0.875rem",
																	"padding": "0.5rem",
																	"height": "2.3125rem",
																	"width": "100%",
																	"-webkit-box-sizing": "border-box",
																	"-moz-box-sizing": "border-box",
																	"box-sizing": "border-box",
																	"transition": "box-shadow 0.45s, border-color 0.45s ease-in-out"
																} },
															numbro(this.state.order.total).formatCurrency("0.00")
														)
													)
												)
											)
										)
									)
								)
							)
						)
					)
				)
			)
		);
	}
});

if (process.browser) {
	ReactDOM.render(React.createElement(View, { locals: locals }), document);
}

exports = module.exports = View;