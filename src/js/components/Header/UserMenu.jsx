var React = require("react");
var Notifications = require("./Notifications");
var UserAccountMenu = require("./UserAccountMenu");

var UserMenu = React.createClass({
	render: function() {
		return (
			<ul className="right">
				<Notifications notifications={this.props.notifications} />
				<UserAccountMenu user={this.props.user} />
			</ul>
		);
	}
});

exports = module.exports = UserMenu;