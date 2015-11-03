var React = require("react");
var ReactDOM = require("react-dom");
var Layout = require("sycamore-platform-components").Layout;
var ActionsBar = require("sycamore-platform-components").ActionsBar;
var SuppliersSelect = require("../../components/SuppliersSelect");

var View = React.createClass({
	getInitialState: function() {
		return {};
	},
	handleSupplierChange: function(value) {
		console.log(value);
	},
	render: function() {
		var pageTitle = "New product";

		return (
			<Layout pageTitle={pageTitle} locals={this.props.locals}>
				<form action="/sycamore-erp/product" encType="application/x-www-form-urlencoded" method="POST">
					<ActionsBar pageTitle={pageTitle}>
						<input type="submit" className="right fancy radius button tiny" value="Create" />
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
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline">Product Code</label>
										</div>
										<div className="large-8 columns">
											<input type="text" name="product[productCode]"/>
										</div>
									</div>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline">Price</label>
										</div>
										<div className="large-8 columns">
											<input type="text" name="product[price]"/>
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
	ReactDOM.render(<View locals={locals} />, document);
}

exports = module.exports = View;