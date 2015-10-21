var React = require("react");
var Breadcrumb = require("./Breadcrumbs/Breadcrumb");

var Breadcrumbs = React.createClass({
	"propTypes": {
		"breadcrumbs": React.PropTypes.arrayOf(React.PropTypes.object).isRequired
	},
	render: function() {
		var breadcrumbs = this.props.breadcrumbs;

		return (
			<div className="row">
				<ul className="breadcrumbs">
					{
						breadcrumbs.map(function(breadcrumbObj) {
							return (
								<Breadcrumb key={breadcrumbObj.label} label={breadcrumbObj.label} />
							);
						})
					}
				</ul>
			</div>
		);
	}
});

exports = module.exports = Breadcrumbs;