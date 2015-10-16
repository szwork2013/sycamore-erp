var React = require("react");
var Layout = require("../Layout");
var Header = require("../../components/Header");

var SuppliersSelect = require("../../components/SuppliersSelect");

var View = React.createClass({
	getInitialState: function() {
		var locals = this.props.locals;

		var state = {
			applicationName: "",
			menus: [],
			product: {
				supplier: null
			},
			title: "Sycamore ERP - New product"
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
	handleSupplierChange: function(value) {
		console.log(value);
	},
	render: function() {
		return (
			<Layout title={this.state.title} locals={this.props.locals}>
				<Header applicationName={this.state.applicationName} applicationUrl={this.state.applicationUrl} menus={this.state.menus} />
				<div className="row">
					<ul className="breadcrumbs">
						<li>Products</li>
					</ul>
				</div>
				<form action="/sycamore-erp/product" encType="application/x-www-form-urlencoded" method="POST">
					<div className="row">
						<div className="large-10 columns">
							<h1>New product</h1>
						</div>
						<div className="large-2 columns">
							<input type="submit" className="right fancy radius button tiny" value="Create" />
						</div>
					</div>
					<div className="row">
						<ul data-tab="data-tab" role="tablist" className="tabs">
							<li role="presentation" className="tab-title active"><a href="#general" role="tab" tabIndex="0" aria-selected="true" aria-controls="general">General</a></li>
						</ul>
					</div>
					<div className="row">
						<div className="large-4 columns">
							<div className="tabs-content">
								<section role="tabpanel" aria-hidden="false" id="general" className="content active">
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline">Name</label>
										</div>
										<div className="large-8 columns">
											<input type="text" name="product[name]"/>
										</div>
									</div>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline">Supplier</label>
										</div>
										<div className="large-8 columns">
											<SuppliersSelect name={"product[supplier]"} onChange={this.handleSupplierChange} />
										</div>
									</div>
								</section>
							</div>
						</div>
					</div>
				</form>
			</Layout>
		);
	}
});

if(process.browser) {
	React.render(<View locals={locals} />, document);
}

exports = module.exports = View;