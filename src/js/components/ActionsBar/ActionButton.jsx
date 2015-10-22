var React = require("react");

var ActionButton = React.createClass({
	"propTypes": {
		"label":	React.PropTypes.string.isRequired,
		"onClick":	React.PropTypes.func.isRequired
	},
	render: function() {
		var label = this.props.label;
		var onClick = this.props.onClick;

		return (
			<a className="right fancy radius button tiny" onClick={onClick}>{label}</a>
		);
	}
});

exports = module.exports = ActionButton;