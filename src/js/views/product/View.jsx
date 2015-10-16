var React = require("react");
var Layout = require("../Layout");
var Header = require("../../components/Header");

var View = React.createClass({
	getInitialState: function() {
		var locals = this.props.locals;

		var state = {
			applicationName: "",
			locals: locals,
			menus: [],
			title: "Sycamore ERP - Products"
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
		var supplierName = "";
		if(	(typeof(this.state.locals.product.supplier) != "undefined") &&
			(typeof(this.state.locals.product.supplier.name) != "undefined") ) {
			supplierName = this.state.locals.product.supplier.name;
		}
		return (
			<Layout title={this.state.title} locals={this.props.locals}>
				<Header applicationName={this.state.applicationName} applicationUrl={this.state.applicationUrl} menus={this.state.menus} />
				<div className="row">
					<ul className="breadcrumbs">
						<li>Products</li>
					</ul>
				</div>
				<div className="row">
					<div className="large-10 columns">
						<h1>View product</h1>
					</div>
					<div className="large-2 columns">
						<a className="right fancy radius button tiny" href={"/sycamore-erp/product/" + this.state.locals.product._id}>
							Edit
						</a>
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
										{this.state.locals.product.name}
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline">Supplier</label>
									</div>
									<div className="large-8 columns">
										{supplierName}
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline">Product Code</label>
									</div>
									<div className="large-8 columns">
										{this.state.locals.product.productCode}
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline">Price</label>
									</div>
									<div className="large-8 columns">
										{this.state.locals.product.price}
									</div>
								</div>
							</section>
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