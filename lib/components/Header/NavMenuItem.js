"use strict";

var React = require("react");

var NavMenuItem = React.createClass({
	displayName: "NavMenuItem",

	getInitialState: function getInitialState() {
		var state = {
			menuItemClass: "has-dropdown",
			name: "",
			permission: null,
			submenu: [],
			url: "#"
		};

		if (typeof this.props.submenu != "undefined" && this.props.submenu != null) {
			state.submenu = this.props.submenu;
		}

		if (typeof this.props.name != "undefined" && this.props.name != null) {
			state.name = this.props.name;
		}

		if (typeof this.props.permission != "undefined" && this.props.permission != null) {
			state.permission = this.props.permission;
		}

		if (typeof this.props.url != "undefined" && this.props.url != null) {
			state.url = this.props.url;
		}

		return state;
	},
	handleOnMouseOver: function handleOnMouseOver() {
		if (this.state.submenu.length > 0) {
			this.setState({ menuItemClass: "has-dropdown hover" });
		}
	},
	handleOnMouseOut: function handleOnMouseOut() {
		if (this.state.submenu.length > 0) {
			this.setState({ menuItemClass: "has-dropdown" });
		}
	},
	render: function render() {
		var menuItem;
		var menuItemClass = "";
		var menuItemUrl = this.state.url;

		if (this.state.submenu.length > 0) {
			menuItemClass = this.state.menuItemClass;
			menuItem = React.createElement(
				"ul",
				{ className: "dropdown" },
				this.state.submenu.map(function (menuItem) {
					return React.createElement(NavMenuItem, { key: menuItem.name, name: menuItem.name, submenu: menuItem.submenu, url: menuItem.url });
				})
			);
		} else {
			menuItem = React.createElement("span", null);
		}

		return React.createElement(
			"li",
			{ className: menuItemClass, onMouseOver: this.handleOnMouseOver, onMouseOut: this.handleOnMouseOut },
			React.createElement(
				"a",
				{ href: menuItemUrl },
				this.state.name
			),
			menuItem
		);
	}
});

exports = module.exports = NavMenuItem;