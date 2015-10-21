"use strict";

var React = require("react");

var ActionsBar = React.createClass({
	displayName: "ActionsBar",

	"propTypes": {
		"pageTitle": React.PropTypes.string.isRequired
	},
	render: function render() {
		var pageTitle = this.props.pageTitle;

		return React.createElement(
			"div",
			{ className: "row actions-bar" },
			React.createElement(
				"div",
				{ className: "large-6 columns page-title" },
				React.createElement(
					"h1",
					null,
					pageTitle
				)
			),
			React.createElement(
				"div",
				{ className: "large-6 columns buttons-bar" },
				this.props.children
			)
		);
	}
});

exports = module.exports = ActionsBar;