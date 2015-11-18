"use strict";

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

var Customer = require("../../components/Customer");
var CustomerStore = require("../../stores/CustomerStore");
var CustomerActions = require("../../actions/CustomerActions");

var View = React.createClass({
	displayName: "View",

	handleSaveClick: function handleSaveClick() {
		CustomerActions.saveCustomer(CustomerStore.getCustomer());
	},
	render: function render() {
		var buttonAction, pageTitle, customer;

		if (typeof this.props.locals.customer != "undefined") {
			customer = this.props.locals.customer;
		}

		if (customer != null && typeof customer._id != "undefined") {
			pageTitle = "Edit customer";
			buttonAction = "Save";
		} else {
			pageTitle = "New customer";
			buttonAction = "Create";
		}

		return React.createElement(
			Layout,
			{ pageTitle: pageTitle, locals: this.props.locals },
			React.createElement(
				ActionsBar,
				{ pageTitle: pageTitle },
				React.createElement(
					"a",
					{ className: "right fancy radius button tiny", href: "#", onClick: this.handleSaveClick },
					buttonAction
				)
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
						"General"
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
							React.createElement(Customer, { customer: customer, editable: true, isNew: true })
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