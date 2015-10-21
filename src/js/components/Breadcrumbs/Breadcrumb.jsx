var React = require("react");

var Breadcrumb = React.createClass({
	"propTypes": {
		"label": React.PropTypes.string.isRequired
	},
	render: function() {
		var label = this.props.label;

		return (
			<li>{label}</li>
		);
	}
});

exports = module.exports = Breadcrumb;