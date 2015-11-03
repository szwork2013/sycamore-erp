var React = require("react");
var ReactDOM = require("react-dom");
var Layout = require("sycamore-platform-components").Layout;
var ActionsBar = require("sycamore-platform-components").ActionsBar;

var View = React.createClass({
	getInitialState: function() {
		return {};
	},
	render: function() {
		var products = this.props.locals.products;
		var pageTitle = "Products";

		return (
			<Layout pageTitle={pageTitle} locals={this.props.locals}>
				<ActionsBar pageTitle={pageTitle}>
					<a href="/sycamore-erp/product" className="right fancy radius button tiny">
						<i className="in-button-icon fa fa-fw fa-plus"></i> Create
					</a>
				</ActionsBar>
				<div className="row">
					<div className="large-12 columns">
						<div className="table">
							<div className="table-header">
								<div className="table-row">
									<div className="table-cell">Supplier</div>
									<div className="table-cell">Name</div>
									<div className="table-cell">Product Code</div>
									<div className="table-cell">Price</div>
									<div className="table-cell large-1">Actions</div>
								</div>
							</div>
							<div className="table-body">
							{
								products.map(function(product) {
									var supplierName = "";
									if(	(typeof(product.supplier) != "undefined") &&
										(typeof(product.supplier.name) != "undefined") ) {
										supplierName = product.supplier.name;
									}
									return (
										<div className="table-row">
											<div className="table-cell">{supplierName}</div>
											<div className="table-cell">{product.name}</div>
											<div className="table-cell">{product.productCode}</div>
											<div className="table-cell">{product.price}</div>
											<div className="table-cell">
												<a href={"/sycamore-erp/product/" + product._id}>
													<i className="icon-button fa fa-fw fa-pencil"></i>
												</a>
												<a href={"/sycamore-erp/product/" + product._id + "/edit.html"}>
													<i className="icon-button fa fa-fw fa-pencil"></i>
												</a>
												<a href={"/sycamore-erp/product/" + product._id + "/delete"}>
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