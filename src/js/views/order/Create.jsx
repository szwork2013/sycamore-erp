var React = require("react");
var Layout = require("../Layout");
var Header = require("../../components/Header");

var CustomersSelect = require("../../components/CustomersSelect");
var PropertiesSelect = require("../../components/PropertiesSelect");
var ProductsSelect = require("../../components/ProductsSelect");

var View = React.createClass({
	getInitialState: function() {
		var locals = this.props.locals;

		var state = {
			applicationName: "",
			menus: [],
			title: "Sycamore ERP - New order"
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
	handleCustomerChange: function(value) {

	},
	handlePropertyChange: function(value) {

	},
	handleProductChange: function(value) {

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
						<h1>New order</h1>
					</div>
					<div className="large-2 columns">
						<a href="/order/create" className="right fancy radius button tiny">
							<i className="in-button-icon fa fa-fw fa-plus"></i> Save
						</a>
					</div>
				</div>
				<div className="row">
					<div className="large-6 columns">
						<fieldset>
							<div className="row">
								<div className="large-2 columns">
									<label className="inline">Customer</label>
								</div>
								<div className="large-8 columns">
									<CustomersSelect name={"order[customer]"} onChange={this.handleCustomerChange} />
								</div>
								<div className="large-2 columns">
									<input className="right fancy radius button tiny" type="button" value="New" />
								</div>
							</div>
						</fieldset>
					</div>
					<div className="large-6 columns">
						<fieldset>
							<div className="row">				
								<div className="large-2 columns">
									<label className="inline">Property</label>
								</div>
								<div className="large-8 columns">
									<PropertiesSelect name={"order[property]"} onChange={this.handlePropertyChange} />
								</div>
								<div className="large-2 columns">
									<input className="right fancy radius button tiny" type="button" value="New" />
								</div>
							</div>
						</fieldset>
					</div>
				</div>

				<div className="row">
					<div className="large-12 columns">
						<div className="table">
							<div className="table-head">
								<div className="table-row">
									<div className="table-cell large-1">
										Quantity
									</div>
									<div className="table-cell large-7">
										Product
									</div>
									<div className="table-cell large-4">
										Options
									</div>
								</div>
							</div>
							<div className="table-body">
								<div className="table-row">
									<div className="table-cell">
										<input type="number" />
									</div>
									<div className="table-cell">
										<ProductsSelect name={"order[products][]"} onChange={this.handleProductChange} />
									</div>
									<div className="table-cell">

									</div>
								</div>
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