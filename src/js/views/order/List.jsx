var React = require("react");
var Layout = require("../Layout");
var Header = require("../../components/Header");

var View = React.createClass({
	getInitialState: function() {
		var locals = this.props.locals;

		var state = {
			applicationName: "",
			menus: [],
			title: "Sycamore ERP - Orders"
		};

		if(typeof(locals) != "undefined") {
			if(typeof(locals.applicationName) != "undefined") {
				state.applicationName = locals.applicationName;
			}
			if(typeof(locals.menus) != "undefined") {
				state.menus = locals.menus;
			}
		}

		return state;
	},
	render: function() {
		return (
			<Layout title={this.state.title} locals={this.props.locals}>
				<Header applicationName={this.state.applicationName} applicationUrl={this.state.applicationUrl} menus={this.state.menus} />
				<div className="row">
					<ul className="breadcrumbs">
						<li>Orders</li>
					</ul>
				</div>
				<div className="row">
					<div className="large-10 columns">
						<h1>Orders</h1>
					</div>
					<div className="large-2 columns">
						<a href="/order/create" className="right fancy radius button tiny">
							<i className="in-button-icon fa fa-fw fa-plus"></i> Create
						</a>
					</div>
				</div>
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