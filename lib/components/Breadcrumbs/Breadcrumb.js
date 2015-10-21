"use strict";

var React = require("react");

var Breadcrumb = React.createClass({
	displayName: "Breadcrumb",

	"propTypes": {
		"label": React.PropTypes.string.isRequired
	},
	render: function render() {
		var label = this.props.label;

		return React.createElement(
			"li",
			null,
			label
		);
	}
});

exports = module.exports = Breadcrumb;