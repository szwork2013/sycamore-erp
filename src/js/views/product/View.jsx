var React = require("react");
var ReactDOM = require("react-dom");
var Layout = require("../Layout");
var ActionsBar = require("../../components/ActionsBar");

var View = React.createClass({
	getInitialState: function() {
		return {};
	},
	render: function() {
		var supplierName = "";
		if(	(typeof(this.state.locals.product.supplier) != "undefined") &&
			(typeof(this.state.locals.product.supplier.name) != "undefined") ) {
			supplierName = this.state.locals.product.supplier.name;
		}
		var pageTitle = "View product";
		return (
			<Layout pageTitle={pageTitle} locals={this.props.locals}>
				<ActionsBar pageTitle={pageTitle}>
					<a className="right fancy radius button tiny" href={"/sycamore-erp/product/" + this.state.locals.product._id}>
						Edit
					</a>
				</ActionsBar>
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
	ReactDOM.render(<View locals={locals} />, document);
}

exports = module.exports = View;