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
var CustomersSelect = require("../../components/CustomersSelect");
var Property = require("../../components/Property");

var View = React.createClass({
	displayName: "View",

	getInitialState: function getInitialState() {
		return {};
	},
	handleCustomerChange: function handleCustomerChange(value) {
		console.log(value);
	},
	render: function render() {
		var pageTitle = "New property";

		return React.createElement(
			Layout,
			{ pageTitle: pageTitle, locals: this.props.locals },
			React.createElement(
				"form",
				{ action: "/sycamore-erp/property", encType: "application/x-www-form-urlencoded", method: "POST" },
				React.createElement(
					ActionsBar,
					{ pageTitle: pageTitle },
					React.createElement("input", { type: "submit", className: "right fancy radius button tiny", value: "Create" })
				),
				React.createElement(
					Tabs,
					null,
					React.createElement(
						Tab,
						null,
						"General"
					),
					React.createElement(
						TabPanel,
						null,
						React.createElement(Property, { editable: true, isNew: true })
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