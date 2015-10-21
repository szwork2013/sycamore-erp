var React = require("react");

var ActionsBar = React.createClass({
	"propTypes": {
		"pageTitle": React.PropTypes.string.isRequired
	},
	render: function() {
		var pageTitle = this.props.pageTitle;

		return (
			<div className="row actions-bar">
				<div className="large-6 columns page-title">
					<h1>{pageTitle}</h1>
				</div>
				<div className="large-6 columns buttons-bar">
					{this.props.children}
				</div>
			</div>
		);
	}
});

exports = module.exports = ActionsBar;