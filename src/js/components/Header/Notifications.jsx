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
	"propTypes": {
		"notifications": React.PropTypes.array.isRequired
	},
	_onChange: function() {
		this.setState(getNotificationsFromStore());
	},
	componentDidMount: function() {
		NotificationsStore.addChangeListener(this._onChange);
		NotificationsStore.setNotifications(this.props.notifications);
	},
	getInitialState: function() {
		return getNotificationsFromStore();
	},
	render: function() {
		var unreadCount = this.state.unreadCount;
		var unreadCounterClass = "unread-notifications-counter";

		if(unreadCount > 0) {
			unreadCounterClass = "unread-notifications-counter label";
		}
		var unreadCounter = <span className={unreadCounterClass}>{unreadCount}</span>;

		return (
			<li className="has-dropdown notifications">
				<a href="#">
					<i className="fa fa-2x fa-bell-o"></i>
					{unreadCounter}
				</a>
			</li>
		);
	}
});

exports = module.exports = Notifications;