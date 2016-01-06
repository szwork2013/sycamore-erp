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

	_onChange: function _onChange() {
		this.setState({
			order: {
				_id: OrderStore.getId(),
				status: OrderStore.getStatus(),
				deliveryDate: OrderStore.getDeliveryDate(),
				customer: OrderStore.getCustomer(),
				property: OrderStore.getProperty(),
				products: OrderStore.getProducts(),
				subTotal: OrderStore.getSubTotal(),
				VAT: OrderStore.getVAT(),
				total: OrderStore.getTotal()
			}
		});
	},
	componentDidMount: function componentDidMount() {
		OrderStore.addChangeListener(this._onChange);
		OrderStore.loadData(this.props.order);
	},
	componentWillUnount: function componentWillUnount() {
		OrderStore.removeChangeListener(this._onChange);
	},
	getInitialState: function getInitialState() {
		return {
			order: {
				_id: OrderStore.getId(),
				status: OrderStore.getStatus(),
				deliveryDate: OrderStore.getDeliveryDate(),
				customer: OrderStore.getCustomer(),
				property: OrderStore.getProperty(),
				products: OrderStore.getProducts(),
				subTotal: OrderStore.getSubTotal(),
				VAT: OrderStore.getVAT(),
				total: OrderStore.getTotal()
			}
		};
	},
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
											selected: this.state.order.delivery.date,
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
									React.createElement("input", { onChange: OrderActions.updateCustomerName,
										type: "text",
										value: this.state.billing.customerName })
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
									React.createElement("input", { onChange: OrderActions.updateCompanyName,
										type: "text",
										value: this.state.billing.companyName })
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
										React.createElement("input", { onChange: OrderActions.updateBillingAddressLine1,
											type: "text",
											value: this.state.billing.address.line1 })
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
										React.createElement("input", { onChange: OrderActions.updateBillingAddressLine2,
											type: "text",
											value: this.state.billing.address.line2 })
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
										React.createElement("input", { onChange: OrderActions.updateBillingAddressLine3,
											type: "text",
											value: this.state.billing.address.line3 })
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
										React.createElement("input", { onChange: OrderActions.updateBillingAddressLine4,
											type: "text",
											value: this.state.billing.address.line4 })
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
										React.createElement("input", { onChange: OrderActions.updateBillingAddressPostCode,
											type: "text",
											value: this.state.billing.address.postCode })
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
									React.createElement("input", { onChange: OrderActions.updateBillingTelephone,
										type: "text",
										value: this.state.billing.telephone })
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
									React.createElement("input", { onChange: OrderActions.updateBillingEmail,
										type: "text",
										value: this.state.billing.email })
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
										React.createElement("input", { onChange: OrderyActions.updateDeliveryAddressLine1,
											type: "text",
											value: this.state.delivery.address.line1 })
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
										React.createElement("input", { onChange: OrderActions.updateDeliveryAddressLine2,
											type: "text",
											value: this.state.delivery.address.line2 })
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
										React.createElement("input", { onChange: OrderActions.updateDeliveryAddressLine3,
											type: "text",
											value: this.state.delivery.address.line3 })
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
										React.createElement("input", { onChange: OrderActions.updateDeliveryAddressLine4,
											type: "text",
											value: this.state.delivery.address.line4 })
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
										React.createElement("input", { onChange: OrderActions.updateDeliveryAddressPostCode,
											type: "text",
											value: this.state.delivery.address.postCode })
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
									React.createElement("textarea", { onChange: OrderActions.updateDeliveryAccessArrangements,
										value: this.state.delivery.accessArrangements })
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
									React.createElement("input", { onChange: OrderActions.updateDeliveryTelephone,
										type: "text",
										value: this.state.delivery.telephone })
								)
							)
						)
					),
					React.createElement(ProductsTable, { order: this.state.order, products: this.state.order.products })
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