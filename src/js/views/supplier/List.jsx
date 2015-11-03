var React = require("react");
var ReactDOM = require("react-dom");
var Layout = require("sycamore-platform-components").Layout;
var ActionsBar = require("sycamore-platform-components").ActionsBar;

var View = React.createClass({
	getInitialState: function() {
		return {};
	},
	render: function() {
		var suppliers = this.props.locals.suppliers;
		var pageTitle = "Suppliers";

		return (
			<Layout pageTitle={pageTitle} locals={this.props.locals}>
				<ActionsBar pageTitle={pageTitle}>
					<a href="/sycamore-erp/supplier" className="right fancy radius button tiny">
						<i className="in-button-icon fa fa-fw fa-plus"></i> Create
					</a>
				</ActionsBar>
				<div className="row">
					<div className="large-12 columns">
						<div className="table">
							<div className="table-header">
								<div className="table-row">
									<div className="table-cell">Name</div>
									<div className="table-cell large-1">Actions</div>
								</div>
							</div>
							<div className="table-body">
							{
								suppliers.map(function(supplier) {
									return (
										<div className="table-row">
											<div className="table-cell">{supplier.name}</div>
											<div className="table-cell">
												<a href={"/sycamore-erp/supplier/" + supplier._id}>
													<i className="icon-button fa fa-fw fa-pencil"></i>
												</a>
												<a href={"/sycamore-erp/supplier/" + supplier._id + "/edit.html"}>
													<i className="icon-button fa fa-fw fa-pencil"></i>
												</a>
												<a href={"/sycamore-erp/supplier/" + supplier._id + "/delete"}>
													<i className="icon-button fa fa-fw fa-trash-o"></i>
												</a>
											</div>
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