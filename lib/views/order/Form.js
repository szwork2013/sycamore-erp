"use strict";

var domain = require("domain");
var React = require("react");
var ReactDOM = require("react-dom");
var Layout = require("sycamore-platform-components").Layout;
var ActionsBar = require("sycamore-platform-components").ActionsBar;
var ReactTabs = require("react-tabs");
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

Tabs.setUseDefaultStyles(false);

var Order = require("../../components/Order");
var OrderStore = require("../../stores/OrderStore");
var OrderActions = require("../../actions/OrderActions");

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
					React.createElement(Order, { order: order, editable: true, isNew: true })
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