var React = require("react");
var AppConstants = require("../../constants/AppConstants");
//var ApplicationActions = require("../../actions/ApplicationActions");
var UserStore = require("../../stores/UserStore");

function getUserFromStore() {
	return {
		user: UserStore.getUser()
	};
}

var UserAccountMenu = React.createClass({
	"propTypes": {
		"user": React.PropTypes.object.isRequired
	},
	_onChange: function() {
		this.setState(getUserFromStore());
	},
	componentDidMount: function() {
		UserStore.addChangeListener(this._onChange);
		UserStore.setUser(this.props.user);
	},
	getInitialState: function() {
		return {
			navMenuClass: "has-dropdown",
			user: UserStore.getUser(),
		};
	},
	handleOnMouseOver: function() {
		this.setState({ navMenuClass: "has-dropdown hover" });
	},
	handleOnMouseOut: function() {
		this.setState({ navMenuClass: "has-dropdown" });
	},
	render: function() {
		var name = this.state.user.name;
		var navMenuClass = this.state.navMenuClass;

		return (
			<li className={navMenuClass} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut}>
				<a href="#">{name}</a>
				<ul className="dropdown">
					<li>
						<a href={AppConstants.USERMENU_MYACCOUNT_LINK}>{AppConstants.USERMENU_MYACCOUNT_TEXT}</a>
					</li>
					<li className="divider"></li>
					<li>
						<a href={AppConstants.USERMENU_LOGOUT_LINK}>{AppConstants.USERMENU_LOGOUT_TEXT}</a>
					</li>
				</ul>
			</li>
		);
	}
});

exports = module.exports = UserAccountMenu;