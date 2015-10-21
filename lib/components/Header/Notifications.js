"use strict";

var React = require("react");
var AppConstants = require("../../constants/AppConstants");
//var ApplicationActions = require("../../actions/ApplicationActions");
var NotificationsStore = require("../../stores/NotificationsStore");

function getNotificationsFromStore() {
	return {
		notifications: NotificationsStore.getNotifications(),
		unreadCount: NotificationsStore.getUnreadCount()
	};
}

var Notifications = React.createClass({
	displayName: "Notifications",

	"propTypes": {
		"notifications": React.PropTypes.array.isRequired
	},
	_onChange: function _onChange() {
		this.setState(getNotificationsFromStore());
	},
	componentDidMount: function componentDidMount() {
		NotificationsStore.addChangeListener(this._onChange);
		NotificationsStore.setNotifications(this.props.notifications);
	},
	getInitialState: function getInitialState() {
		return getNotificationsFromStore();
	},
	render: function render() {
		var unreadCount = this.state.unreadCount;
		var unreadCounterClass = "unread-notifications-counter";

		if (unreadCount > 0) {
			unreadCounterClass = "unread-notifications-counter label";
		}
		var unreadCounter = React.createElement(
			"span",
			{ className: unreadCounterClass },
			unreadCount
		);

		return React.createElement(
			"li",
			{ className: "has-dropdown notifications" },
			React.createElement(
				"a",
				{ href: "#" },
				React.createElement("i", { className: "fa fa-2x fa-bell-o" }),
				unreadCounter
			)
		);
	}
});

exports = module.exports = Notifications;