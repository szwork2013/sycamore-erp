"use strict";

var React = require("react");

var Notifications = React.createClass({
	displayName: "Notifications",

	getInitialState: function getInitialState() {
		var state = {};
		return state;
	},
	render: function render() {
		return React.createElement(
			"li",
			{ className: "has-dropdown notifications" },
			React.createElement(
				"a",
				{ href: "#" },
				React.createElement("i", { className: "fa fa-2x fa-bell-o" })
			)
		);
	}
});

exports = module.exports = Notifications;