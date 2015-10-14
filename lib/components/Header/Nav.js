"use strict";

var React = require("react");
var NavMenu = require("./NavMenu");
var Notifications = require("../Notifications");

var Nav = React.createClass({
	displayName: "Nav",

	getInitialState: function getInitialState() {
		var state = {
			applicationName: this.props.applicationName,
			applicationUrl: "/",
			menus: [],
			username: "User"
		};

		if (typeof this.props.applicationUrl != "undefined") {
			state.applicationUrl = this.props.applicationUrl;
		}

		if (typeof this.props.menus != "undefined") {
			state.menus = this.props.menus;
		}

		return state;
	},
	render: function render() {
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
							{ href: this.state.applicationUrl },
							this.state.applicationName
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
			React.createElement(
				"section",
				{ className: "top-bar-section" },
				React.createElement(
					"ul",
					{ className: "right" },
					React.createElement(Notifications, null),
					React.createElement(
						"li",
						{ className: "has-dropdown" },
						React.createElement(
							"a",
							{ href: "#" },
							this.state.username
						),
						React.createElement(
							"ul",
							{ className: "dropdown" },
							React.createElement(
								"li",
								null,
								React.createElement(
									"a",
									{ href: "/user/profile/view" },
									"My Account"
								)
							),
							React.createElement("li", { className: "divider" }),
							React.createElement(
								"li",
								null,
								React.createElement(
									"a",
									{ href: "/user/logout" },
									"Logout"
								)
							)
						)
					)
				),
				React.createElement(
					"ul",
					{ className: "left" },
					this.state.menus.map(function (menu, i) {
						return React.createElement(NavMenu, { key: menu.name, menu: menu.menu, name: menu.name, permission: menu.permission });
					})
				)
			)
		);
	}
});

exports = module.exports = Nav;