var React = require("react");

var NavMenuItem = React.createClass({
	getInitialState: function() {
		var state = {
			menuItemClass: "has-dropdown",
			name: "",
			permission: null,
			submenu: [],
			url: "#"
		};

		if(	(typeof(this.props.submenu) != "undefined") &&
			(this.props.submenu != null) ) {
			state.submenu = this.props.submenu;
		}

		if(	(typeof(this.props.name) != "undefined") &&
			(this.props.name != null) ) {
			state.name = this.props.name;
		}

		if(	(typeof(this.props.permission) != "undefined") &&
			(this.props.permission != null) ) {
			state.permission = this.props.permission;
		}

		if(	(typeof(this.props.url) != "undefined") &&
			(this.props.url != null) ) {
			state.url = this.props.url;
		}

		return state; 
	},
	handleOnMouseOver: function() {
		if(this.state.submenu.length > 0) {
			this.setState({ menuItemClass: "has-dropdown hover" });
		}
	},
	handleOnMouseOut: function() {
		if(this.state.submenu.length > 0) {
			this.setState({ menuItemClass: "has-dropdown" });
		}
	},
	render: function() {
		var menuItem;
		var menuItemClass = "";
		var menuItemUrl = this.state.url;

		if(this.state.submenu.length > 0) {
			menuItemClass = this.state.menuItemClass;
			menuItem = <ul className="dropdown">{this.state.submenu.map(function(menuItem) { return (<NavMenuItem key={menuItem.name} name={menuItem.name} submenu={menuItem.submenu} url={menuItem.url} />); }) }</ul>;
		} else {
			menuItem = <span></span>;
		}

		return (
			<li className={menuItemClass} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut}>
				<a href={menuItemUrl}>{this.state.name}</a>
				{menuItem}
			</li>
		);
	}
});

exports = module.exports = NavMenuItem;