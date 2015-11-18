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

var Supplier = require("../../components/Supplier");
var SupplierStore = require("../../stores/SupplierStore");
var SupplierActions = require("../../actions/SupplierActions");

var View = React.createClass({
	displayName: "View",

	handleSaveClick: function handleSaveClick() {
		SupplierActions.saveSupplier(SupplierStore.getSupplier());
	},
	render: function render() {
		var buttonAction, pageTitle, supplier;

		if (typeof this.props.locals.supplier != "undefined") {
			supplier = this.props.locals.supplier;
		}

		if (supplier != null && typeof supplier._id != "undefined") {
			pageTitle = "Edit supplier";
			buttonAction = "Save";
		} else {
			pageTitle = "New supplier";
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
							React.createElement(Supplier, { supplier: supplier, editable: true, isNew: true })
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