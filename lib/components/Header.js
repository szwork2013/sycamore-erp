"use strict";

var React = require("react");
var Nav = require("./Header/Nav");

var Header = React.createClass({
	displayName: "Header",

	getInitialState: function getInitialState() {
		var state = {
			applicationName: this.props.applicationName,
			applicationUrl: this.props.applicationUrl,
			menus: this.props.menus
		};

		return state;
	},
	render: function render() {
		return React.createElement(
			"header",
			null,
			React.createElement(Nav, { applicationName: this.state.applicationName, applicationUrl: this.state.applicationUrl, menus: this.state.menus })
		);
	}
});

exports = module.exports = Header;