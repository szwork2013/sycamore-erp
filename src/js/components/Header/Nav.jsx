var React = require("react");
var NavMenu = require("./NavMenu");
var Notifications = require("../Notifications");

var Nav = React.createClass({
	getInitialState: function() {
		var state = {
			applicationName: this.props.applicationName,
			applicationUrl: "/",
			menus: [],
			username: "User"
		};

		if(typeof(this.props.applicationUrl) != "undefined") {
			state.applicationUrl = this.props.applicationUrl;
		}

		if(typeof(this.props.menus) != "undefined") {
			state.menus = this.props.menus;
		}

		return state;
	},
	render: function() {
		return (
			<nav data-topbar="data-topbar" role="navigation" className="top-bar">
				<ul className="title-area">
					<li className="name">
						<h1><a href={this.state.applicationUrl}>{this.state.applicationName}</a></h1>
					</li>
					<li className="toggle-topbar menu-icon">
						<a href="#">
							<span>Menu</span>
						</a>
					</li>
				</ul>
				<section className="top-bar-section">
					<ul className="right">
						<Notifications />
						<li className="has-dropdown">
							<a href="#">{this.state.username}</a>
							<ul className="dropdown">
								<li><a href="/user/profile/view">My Account</a></li>
								<li className="divider"></li>
								<li><a href="/user/logout">Logout</a></li>
							</ul>
						</li>
					</ul>
					<ul className="left">
						{
							this.state.menus.map(function(menu, i) {
								return (<NavMenu key={menu.name} menu={menu.menu} name={menu.name} permission={menu.permission} />);
							})
						}
					</ul>
				</section>
			</nav>
		);
	}
});

exports = module.exports = Nav;