"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var Layout = require("sycamore-platform-components").Layout;
var ActionsBar = require("sycamore-platform-components").ActionsBar;
var List = require("sycamore-platform-components").List;
var ListStore = require("sycamore-platform-components").ListStore;
var SettingsButton = require("sycamore-platform-components").SettingsButton;

var ApplicationActions = require("../../actions/ApplicationActions");

var View = React.createClass({
	displayName: "View",

	_onUpdate: function _onUpdate() {
		ApplicationActions.getOrders(ListStore.getQueryOptions());
	},
	render: function render() {
		return React.createElement(
			Layout,
			{ pageTitle: this.state.list.title, locals: this.props.locals },
			React.createElement(
				ActionsBar,
				{ pageTitle: this.state.list.title },
				React.createElement(SettingsButton, null),
				React.createElement(
					"a",
					{ href: "/sycamore-erp/order", className: "right fancy radius button tiny" },
					React.createElement("i", { className: "in-button-icon fa fa-fw fa-plus" }),
					" Create"
				)
			),
			React.createElement(List, { updateListener: this._onUpdate })
		);
	}
});

if (process.browser) {
	ReactDOM.render(React.createElement(View, { locals: locals }), document);
}

exports = module.exports = View;