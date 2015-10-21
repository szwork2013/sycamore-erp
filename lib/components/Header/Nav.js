"use strict";

var React = require("react");
var NavMenu = require("./NavMenu");
var UserMenu = require("./UserMenu");

var Nav = React.createClass({
	displayName: "Nav",

	"propTypes": {
		"authenticated": React.PropTypes.bool.isRequired,
		"applicationName": React.PropTypes.string.isRequired,
		"applicationUrl": React.PropTypes.string.isRequired,
		"menus": React.PropTypes.array.isRequired,
		"notifications": React.PropTypes.array.isRequired,
		"user": React.PropTypes.object.isRequired
	},
	render: function render() {
		var authenticated = this.props.authenticated;
		var applicationName = this.props.applicationName;
		var applicationUrl = this.props.applicationUrl;
		var menus = this.props.menus;
		var notifications = this.props.notifications;
		var user = this.props.user;

		var topBarSection = React.createElement("section", { className: "top-bar-section" });

		if (authenticated) {
			var topBarSection = React.createElement(
				"section",
				{ className: "top-bar-section" },
				React.createElement(UserMenu, { notifications: notifications, user: user }),
				React.createElement(
					"ul",
					{ className: "left" },
					menus.map(function (menu, i) {
						return React.createElement(NavMenu, { key: menu.name,
							label: menu.name,
							menuItems: menu.menu,
							permission: menu.permission });
					})
				)
			);
		}

		return React.createElement(
			"nav",
			{ "data-topbar": "data-topbar", role: "navigation", className: "top-bar" },
			React.createElement(
				"ul",
				{ className: "title-area" },
				React.createElement(
					"li",
					{ className: "name" },
					React.createElement(
						"h1",
						null,
						React.createElement(
							"a",
							{ href: applicationUrl },
							applicationName
						)
					)
				),
				React.createElement(
					"li",
					{ className: "toggle-topbar menu-icon" },
					React.createElement(
						"a",
						{ href: "#" },
						React.createElement(
							"span",
							null,
							"Menu"
						)
					)
				)
			),
			topBarSection
		);
	}
});

exports = module.exports = Nav;