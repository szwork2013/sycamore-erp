var React = require("react");
var Nav = require("./Header/Nav");

var Header = React.createClass({
	"propTypes": {
		"authenticated":	React.PropTypes.bool.isRequired,
		"applicationName":	React.PropTypes.string.isRequired,
		"applicationUrl":	React.PropTypes.string.isRequired,
		"menus":			React.PropTypes.array.isRequired,
		"notifications":	React.PropTypes.array.isRequired,
		"user":				React.PropTypes.object.isRequired
	},
	render: function() {
		var authenticated = this.props.authenticated;
		var applicationName = this.props.applicationName;
		var applicationUrl = this.props.applicationUrl;
		var menus = this.props.menus;
		var notifications = this.props.notifications;
		var user = this.props.user;

		return (
			<header>
				<Nav authenticated={authenticated}
					 applicationName={applicationName}
					 applicationUrl={applicationUrl}
					 menus={menus}
					 notifications={notifications}
					 user={user} />
			</header>
		);
	}
});

exports = module.exports = Header;