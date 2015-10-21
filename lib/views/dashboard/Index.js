"use strict";

var React = require("react");
var Layout = require("../Layout");
var ActionsBar = require("../../components/ActionsBar");

var View = React.createClass({
	displayName: "View",

	getInitialState: function getInitialState() {
		return {};
	},
	render: function render() {
		var pageTitle = "ERP Dashboard";

		return React.createElement(
			Layout,
			{ pageTitle: pageTitle, locals: this.props.locals },
			React.createElement(ActionsBar, { pageTitle: pageTitle }),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement("div", { className: "large-12 columns" })
			)
		);
	}
});

if (process.browser) {
	React.render(React.createElement(View, { locals: locals }), document);
}

exports = module.exports = View;