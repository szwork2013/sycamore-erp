"use strict";

var React = require("react");
var NavMenuItem = require("./NavMenuItem");

var NavMenu = React.createClass({
	displayName: "NavMenu",

	getInitialState: function getInitialState() {
		var state = {
			navMenuClass: "has-dropdown",
			menu: [],
			name: this.props.name,
			permission: this.props.permission
		};

		if (this.props.menu) {
			state.menu = this.props.menu;
		}

		return state;
	},
	handleOnMouseOver: function handleOnMouseOver() {
		this.setState({ navMenuClass: "has-dropdown hover" });
	},
	handleOnMouseOut: function handleOnMouseOut() {
		this.setState({ navMenuClass: "has-dropdown" });
	},
	render: function render() {
		var navMenuClass = this.state.navMenuClass;

		return React.createElement(
			"li",
			{ className: navMenuClass, onMouseOver: this.handleOnMouseOver, onMouseOut: this.handleOnMouseOut },
			React.createElement(
				"a",
				{ href: "#" },
				this.state.name
			),
			React.createElement(
				"ul",
				{ className: "dropdown" },
				this.state.menu.map(function (menuItem) {
					return React.createElement(NavMenuItem, { name: menuItem.name, submenu: menuItem.submenu, url: menuItem.url });
				})
			)
		);
	}
});

exports = module.exports = NavMenu;