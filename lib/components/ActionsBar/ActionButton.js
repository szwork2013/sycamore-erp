"use strict";

var React = require("react");

var ActionButton = React.createClass({
	displayName: "ActionButton",

	"propTypes": {
		"label": React.PropTypes.string.isRequired,
		"onClick": React.PropTypes.func.isRequired
	},
	render: function render() {
		var label = this.props.label;
		var onClick = this.props.onClick;

		return React.createElement(
			"a",
			{ className: "right fancy radius button tiny", onClick: onClick },
			label
		);
	}
});

exports = module.exports = ActionButton;