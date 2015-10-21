var React = require("react");
var Layout = require("../Layout");
var ActionsBar = require("../../components/ActionsBar");

var View = React.createClass({
	getInitialState: function() {
		return {};
	},
	render: function() {
		var pageTitle = "ERP Dashboard";

		return (
			<Layout pageTitle={pageTitle} locals={this.props.locals}>
				<ActionsBar pageTitle={pageTitle} />
				<div className="row">
					<div className="large-12 columns">
					</div>
				</div>
			</Layout>
		);
	}
});

if(process.browser) {
	React.render(<View locals={locals} />, document);
}

exports = module.exports = View;