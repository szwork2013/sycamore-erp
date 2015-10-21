var React = require("react");
var NavMenu = require("./NavMenu");
var UserMenu = require("./UserMenu");

var Nav = React.createClass({
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

		var topBarSection = <section className="top-bar-section"></section>;

		if(authenticated) {
			var topBarSection = <section className="top-bar-section">
									<UserMenu notifications={notifications} user={user} />
									<ul className="left">
										{
											menus.map(function(menu, i) {
												return (
													<NavMenu key={menu.name}
															 label={menu.name}
															 menuItems={menu.menu}
															 permission={menu.permission} />
												);
											})
										}
									</ul>
								</section>;
		}

		return (
			<nav data-topbar="data-topbar" role="navigation" className="top-bar">
				<ul className="title-area">
					<li className="name">
						<h1>
							<a href={applicationUrl}>
								{applicationName}
							</a>
						</h1>
					</li>
					<li className="toggle-topbar menu-icon">
						<a href="#">
							<span>Menu</span>
						</a>
					</li>
				</ul>
				{topBarSection}
			</nav>
		);
	}
});

exports = module.exports = Nav;