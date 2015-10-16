var React = require("react");
var Layout = require("../Layout");
var Header = require("../../components/Header");

var View = React.createClass({
	getInitialState: function() {
		var locals = this.props.locals;

		var state = {
			applicationName: "",
			menus: [],
			locals: locals,
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
						<h1>Products</h1>
					</div>
					<div className="large-2 columns">
						<a href="/sycamore-erp/product" className="right fancy radius button tiny">
							<i className="in-button-icon fa fa-fw fa-plus"></i> Create
						</a>
					</div>
				</div>
				<div className="row">
					<div className="large-12 columns">
						<div className="table">
							<div className="table-head">
								<div className="table-row">
									<div className="table-cell">Name</div>
									<div className="table-cell">Supplier</div>
									<div className="table-cell large-1">Actions</div>
								</div>
							</div>
							<div className="table-body">
							{
								this.state.locals.products.map(function(product) {
									var supplierName = "";
									if(	(typeof(product.supplier) != "undefined") &&
										(typeof(product.supplier.name) != "undefined") ) {
										supplierName = product.supplier.name;
									}
									return (
										<div className="table-row">
											<div className="table-cell">{product.name}</div>
											<div className="table-cell">{supplierName}</div>
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
	React.render(<View locals={locals} />, document);
}

exports = module.exports = View;