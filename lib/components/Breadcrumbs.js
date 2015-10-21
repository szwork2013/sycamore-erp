"use strict";

var React = require("react");
var Breadcrumb = require("./Breadcrumbs/Breadcrumb");

var Breadcrumbs = React.createClass({
	displayName: "Breadcrumbs",

	"propTypes": {
		"breadcrumbs": React.PropTypes.arrayOf(React.PropTypes.object).isRequired
	},
	render: function render() {
		var breadcrumbs = this.props.breadcrumbs;

		return React.createElement(
			"div",
			{ className: "row" },
			React.createElement(
				"ul",
				{ className: "breadcrumbs" },
				breadcrumbs.map(function (breadcrumbObj) {
					return React.createElement(Breadcrumb, { key: breadcrumbObj.label, label: breadcrumbObj.label });
				})
			)
		);
	}
});

exports = module.exports = Breadcrumbs;