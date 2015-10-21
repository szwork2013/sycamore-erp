"use strict";

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
	displayName: "UserAccountMenu",

	"propTypes": {
		"user": React.PropTypes.object.isRequired
	},
	_onChange: function _onChange() {
		this.setState(getUserFromStore());
	},
	componentDidMount: function componentDidMount() {
		UserStore.addChangeListener(this._onChange);
		UserStore.setUser(this.props.user);
	},
	getInitialState: function getInitialState() {
		return {
			navMenuClass: "has-dropdown",
			user: UserStore.getUser()
		};
	},
	handleOnMouseOver: function handleOnMouseOver() {
		this.setState({ navMenuClass: "has-dropdown hover" });
	},
	handleOnMouseOut: function handleOnMouseOut() {
		this.setState({ navMenuClass: "has-dropdown" });
	},
	render: function render() {
		var name = this.state.user.name;
		var navMenuClass = this.state.navMenuClass;

		return React.createElement(
			"li",
			{ className: navMenuClass, onMouseOver: this.handleOnMouseOver, onMouseOut: this.handleOnMouseOut },
			React.createElement(
				"a",
				{ href: "#" },
				name
			),
			React.createElement(
				"ul",
				{ className: "dropdown" },
				React.createElement(
					"li",
					null,
					React.createElement(
						"a",
						{ href: AppConstants.USERMENU_MYACCOUNT_LINK },
						AppConstants.USERMENU_MYACCOUNT_TEXT
					)
				),
				React.createElement("li", { className: "divider" }),
				React.createElement(
					"li",
					null,
					React.createElement(
						"a",
						{ href: AppConstants.USERMENU_LOGOUT_LINK },
						AppConstants.USERMENU_LOGOUT_TEXT
					)
				)
			)
		);
	}
});

exports = module.exports = UserAccountMenu;