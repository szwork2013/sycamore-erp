var React = require("react");
var ReactDOM = require("react-dom");
var Layout = require("../Layout");
var ActionsBar = require("../../components/ActionsBar");

var View = React.createClass({
	getInitialState: function() {
		return {};
	},
	render: function() {
		var customers = this.props.locals.customers;
		var pageTitle = "Customers";

		return (
			<Layout pageTitle={pageTitle} locals={this.props.locals}>
				<ActionsBar pageTitle={pageTitle}>
					<a href="/sycamore-erp/customer" className="right fancy radius button tiny">
						<i className="in-button-icon fa fa-fw fa-plus"></i> Create
					</a>
				</ActionsBar>
				<div className="row">
					<div className="large-12 columns">
						<div className="table">
							<div className="table-head">
								<div className="table-row">
									<div className="table-cell">Id</div>
									<div className="table-cell">Display Name</div>
									<div className="table-cell">Code</div>
									<div className="table-cell">Name</div>
									<div className="table-cell large-1">Actions</div>
								</div>
							</div>
							<div className="table-body">
							{
								customers.map(function(customer) {
									return (
										<div className="table-row">
											<div className="table-cell">{customer.Id}</div>
											<div className="table-cell">{customer.DisplayName}</div>
											<div className="table-cell">{customer.Code}</div>
											<div className="table-cell">{customer.Name}</div>
											<div className="table-cell">
												<a href={"/customer/view/" + customer._id}>
													<i className="fa fa-fw fa-user icon-button"></i>
												</a>
												<a href={"/customer/edit/" + customer._id}>
													<i className="fa fa-fw fa-pencil icon-button"></i>
												</a>
												<a href={"/customer/delete/" + customer._id}>
													<i className="fa fa-fw fa-trash-o icon-button"></i>
												</a>
											</div>
										</div>
									)
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