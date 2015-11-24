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

var ProductVariationGroup = require("../../components/ProductVariationGroup");
var ProductVariationGroupStore = require("../../stores/ProductVariationGroupStore");
var ProductVariationGroupActions = require("../../actions/ProductVariationGroupActions");

var View = React.createClass({
	displayName: "View",

	handleSaveClick: function handleSaveClick() {
		ProductVariationGroupActions.saveProductVariationGroup(ProductVariationGroupStore.getProductVariationGroup());
	},
	render: function render() {
		var buttonAction, pageTitle, productVariationGroup;

		if (typeof this.props.locals.productVariationGroup != "undefined") {
			productVariationGroup = this.props.locals.productVariationGroup;
		}

		if (productVariationGroup != null && typeof productVariationGroup._id != "undefined") {
			pageTitle = "Edit product variation group";
			buttonAction = "Save";
		} else {
			pageTitle = "New product variation group";
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
							React.createElement(ProductVariationGroup, { productVariationGroup: productVariationGroup, editable: true, isNew: true })
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