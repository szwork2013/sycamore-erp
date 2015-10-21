var React = require("react");
var Layout = require("../Layout");
var ActionsBar = require("../../components/ActionsBar");

var View = React.createClass({
	getInitialState: function() {
		return {};
	},
	render: function() {
		var properties = this.props.locals.properties;
		var pageTitle = "Properties";

		return (
			<Layout pageTitle={pageTitle} locals={this.props.locals}>
				<ActionsBar pageTitle={pageTitle}>
					<a href="/sycamore-erp/property" className="right fancy radius button tiny">
						<i className="in-button-icon fa fa-fw fa-plus"></i> Create
					</a>
				</ActionsBar>
				<div className="row">
					<div className="large-12 columns">
						<div className="table">
							<div className="table-head">
								<div className="table-row">
									<div className="table-cell">Name</div>
									<div className="table-cell large-1">Actions</div>
								</div>
							</div>
							<div className="table-body">
							{
								properties.map(function(property) {
									return (
										<div className="table-row">
											<div className="table-cell">{property.name}</div>
											<div className="table-cell">
												<a href={"/sycamore-erp/property/" + property._id}>
													<i className="icon-button fa fa-fw fa-pencil"></i>
												</a>
												<a href={"/sycamore-erp/property/" + property._id + "/edit.html"}>
													<i className="icon-button fa fa-fw fa-pencil"></i>
												</a>
												<a href={"/sycamore-erp/property/" + property._id + "/delete"}>
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
	React.render(<View locals={locals} />, document);
}

exports = module.exports = View;