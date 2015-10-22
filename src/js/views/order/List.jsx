var React = require("react");
var ReactDOM = require("react-dom");
var Layout = require("../Layout");
var ActionsBar = require("../../components/ActionsBar");

var View = React.createClass({
	getInitialState: function() {
		return {};
	},
	render: function() {
		var orders = this.props.locals.orders;
		var pageTitle = "Orders";

		return (
			<Layout pageTitle={pageTitle} locals={this.props.locals}>
				<ActionsBar pageTitle={pageTitle}>
					<a href="/sycamore-erp/order" className="right fancy radius button tiny">
						<i className="in-button-icon fa fa-fw fa-plus"></i> Create
					</a>
				</ActionsBar>
				<div className="row">
					<div className="large-12 columns">
						<div className="table">
							<div className="table-head">
								<div className="table-row">
									<div className="table-cell">Id</div>
									<div className="table-cell large-1">Actions</div>
								</div>
							</div>
							<div className="table-body">
							{
								orders.map(function(order) {
									return (
										<div className="row">
											<div className="table-cell"></div>
											<div className="table-cell"></div>
										</div>
									);
								})
							}
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
});

if(process.browser) {
	ReactDOM.render(<View locals={locals} />, document);
}

exports = module.exports = View;