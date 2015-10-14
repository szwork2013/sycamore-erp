var React = require("react");
var NavMenuItem = require("./NavMenuItem");

var NavMenu = React.createClass({
	getInitialState: function() {
		var state = {
			navMenuClass: "has-dropdown",
			menu: [],
			name: this.props.name,
			permission: this.props.permission
		};

		if(this.props.menu) {
			state.menu = this.props.menu;
		}

		return state;
	},
	handleOnMouseOver: function() {
		this.setState({ navMenuClass: "has-dropdown hover" });
	},
	handleOnMouseOut: function() {
		this.setState({ navMenuClass: "has-dropdown" });
	},
	render: function() {
		var navMenuClass = this.state.navMenuClass;

		return (
			<li className={navMenuClass} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut}>
				<a href="#">{this.state.name}</a>
				<ul className="dropdown">
					{
						this.state.menu.map(function(menuItem) {
							return (<NavMenuItem name={menuItem.name} submenu={menuItem.submenu} url={menuItem.url} />);
						})
					}
				</ul>
			</li>
		);
	}
});

exports = module.exports = NavMenu;