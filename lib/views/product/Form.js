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

var Product = require("../../components/Product");
var ProductStore = require("../../stores/ProductStore");
var ProductActions = require("../../actions/ProductActions");

var View = React.createClass({
	displayName: "View",

	handleSaveClick: function handleSaveClick() {
		ProductActions.saveProduct(ProductStore.getProduct());
	},
	render: function render() {
		var buttonAction, pageTitle, product;

		if (typeof this.props.locals.product != "undefined") {
			product = this.props.locals.product;
		}

		if (product != null && typeof product._id != "undefined") {
			pageTitle = "Edit product";
			buttonAction = "Save";
		} else {
			pageTitle = "New product";
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
							React.createElement(Product, { product: product, editable: true, isNew: true })
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