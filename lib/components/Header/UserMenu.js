"use strict";

var React = require("react");
var Notifications = require("./Notifications");
var UserAccountMenu = require("./UserAccountMenu");

var UserMenu = React.createClass({
	displayName: "UserMenu",

	render: function render() {
		return React.createElement(
			"ul",
			{ className: "right" },
			React.createElement(Notifications, { notifications: this.props.notifications }),
			React.createElement(UserAccountMenu, { user: this.props.user })
		);
	}
});

exports = module.exports = UserMenu;