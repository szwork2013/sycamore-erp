var React = require("react");
var NavMenuItem = require("./NavMenuItem");

var NavMenu = React.createClass({
	"propTypes": {
		"label":		React.PropTypes.string.isRequired,
		"menuItems":	React.PropTypes.array.isRequired,
		"permission":	React.PropTypes.string.isRequired
	},
	getInitialState: function() {
		return {
			navMenuClass: "has-dropdown"
		}
	},
	handleOnMouseOver: function() {
		this.setState({ navMenuClass: "has-dropdown hover" });
	},
	handleOnMouseOut: function() {
		this.setState({ navMenuClass: "has-dropdown" });
	},
	render: function() {
		var label = this.props.label;
		var menuItems = this.props.menuItems;
		var navMenuClass = this.state.navMenuClass;
		var permission = this.props.permission;

		return (
			<li className={navMenuClass} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut}>
				<a href="#">{label}</a>
				<ul className="dropdown">
					{
						menuItems.map(function(menuItem) {
							return (
								<NavMenuItem key={menuItem.name}
											 name={menuItem.name}
											 submenu={menuItem.submenu}
											 url={menuItem.url} />
							);
						})
					}
				</ul>
			</li>
		);
	}
});

exports = module.exports = NavMenu;