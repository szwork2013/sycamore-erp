var React = require("react");

var Notifications = React.createClass({
	getInitialState: function() {
		var state = {};
		return state;
	},
	render: function() {
		return (
			<li className="has-dropdown notifications">
				<a href="#"><i className="fa fa-2x fa-bell-o"></i></a>
			</li>
		);
	}
});

exports = module.exports = Notifications;