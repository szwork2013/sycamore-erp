"use strict";

var React = require("react");
var NavMenuItem = require("./NavMenuItem");

var NavMenu = React.createClass({
	displayName: "NavMenu",

	"propTypes": {
		"label": React.PropTypes.string.isRequired,
		"menuItems": React.PropTypes.array.isRequired,
		"permission": React.PropTypes.string.isRequired
	},
	getInitialState: function getInitialState() {
		return {
			navMenuClass: "has-dropdown"
		};
	},
	handleOnMouseOver: function handleOnMouseOver() {
		this.setState({ navMenuClass: "has-dropdown hover" });
	},
	handleOnMouseOut: function handleOnMouseOut() {
		this.setState({ navMenuClass: "has-dropdown" });
	},
	render: function render() {
		var label = this.props.label;
		var menuItems = this.props.menuItems;
		var navMenuClass = this.state.navMenuClass;
		var permission = this.props.permission;

		return React.createElement(
			"li",
			{ className: navMenuClass, onMouseOver: this.handleOnMouseOver, onMouseOut: this.handleOnMouseOut },
			React.createElement(
				"a",
				{ href: "#" },
				label
			),
			React.createElement(
				"ul",
				{ className: "dropdown" },
				menuItems.map(function (menuItem) {
					return React.createElement(NavMenuItem, { key: menuItem.name,
						name: menuItem.name,
						submenu: menuItem.submenu,
						url: menuItem.url });
				})
			)
		);
	}
});

exports = module.exports = NavMenu;