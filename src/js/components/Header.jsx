var React = require("react");
var Nav = require("./Header/Nav");

var Header = React.createClass({
	getInitialState: function() {
		var state = {
			applicationName: this.props.applicationName,
			applicationUrl: this.props.applicationUrl,
			menus: this.props.menus
		};

		return state;
	},
	render: function() {
		return (
			<header>
				<Nav applicationName={this.state.applicationName} applicationUrl={this.state.applicationUrl} menus={this.state.menus} />
			</header>
		);
	}
});

exports = module.exports = Header;