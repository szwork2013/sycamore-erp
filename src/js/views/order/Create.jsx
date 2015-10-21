var React = require("react");
var Layout = require("../Layout");
var ActionsBar = require("../../components/ActionsBar");
var CustomersSelect = require("../../components/CustomersSelect");
var PropertiesSelect = require("../../components/PropertiesSelect");
var ProductsSelect = require("../../components/ProductsSelect");
var ApplicationActions = require("../../actions/ApplicationActions");
var OrderStore = require("../../stores/OrderStore");

function getOrderFromStore() {
	return {
		order: OrderStore.getOrder(),
		customer: null,
		property: null,
		product: null
	}
}

var View = React.createClass({
	_onChange: function() {
		this.setState(getOrderFromStore());
	},
	componentDidMount: function() {
		OrderStore.addChangeListener(this._onChange);
	},
	getInitialState: function() {
		return getOrderFromStore();
	},
	handleAddProduct: function() {
		if(this.state.product) {
			ApplicationActions.addProductToOrder(this.state.product);
		}
	},
	handleCustomerChange: function(value) {
		this.setState({ customer: value });
		ApplicationActions.setCustomer(this.state.customer);
	},
	handlePropertyChange: function(value) {
		this.setState({ property: value });
		ApplicationActions.setProperty(this.state.property);
	},
	handleProductChange: function(value) {
		this.setState({ product: value });
	},
	render: function() {
		var pageTitle = "New order";
		var propertyOpts = {};

		if (this.state.customer != null) {
			propertyOpts["disabled"] = "disabled";
		}

		return (
			<Layout pageTitle={pageTitle} locals={this.props.locals}>
				<ActionsBar pageTitle={pageTitle}>
					<input type="submit" className="right fancy radius button tiny" value="Save" />
				</ActionsBar>
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
							<div className="row">
								<div className="large-4 columns">
									<label className="right inline">Customer Name</label>
								</div>
								<div className="large-8 columns">
									<input type="text" disabled="disabled" value={""} />
								</div>
							</div>
							<div className="row">
								<div className="large-4 columns">
									<label className="right inline">Company Name</label>
								</div>
								<div className="large-8 columns">
									<input type="text" disabled="disabled" value={""} />
								</div>
							</div>
							<fieldset>
								<label>Billing Address</label>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline"></label>
									</div>
									<div className="large-8 columns">
										<input type="text" disabled="disabled" value={""} />
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline"></label>
									</div>
									<div className="large-8 columns">
										<input type="text" disabled="disabled" value={""} />
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline"></label>
									</div>
									<div className="large-8 columns">
										<input type="text" disabled="disabled" value={""} />
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline"></label>
									</div>
									<div className="large-8 columns">
										<input type="text" disabled="disabled" value={""} />
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline"></label>
									</div>
									<div className="large-8 columns">
										<input type="text" disabled="disabled" value={""} />
									</div>
								</div>
							</fieldset>
							<div className="row">
								<div className="large-4 columns">
									<label className="right inline">Telephone</label>
								</div>
								<div className="large-8 columns">
									<input type="text" disabled="disabled" value={""} />
								</div>
							</div>
							<div className="row">
								<div className="large-4 columns">
									<label className="right inline">Email</label>
								</div>
								<div className="large-8 columns">
									<input type="text" disabled="disabled" value={""} />
								</div>
							</div>
						</fieldset>
					</div>
					<div className="large-6 columns">
						<fieldset {...propertyOpts}>
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
							<fieldset>
								<label>Property Address</label>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline"></label>
									</div>
									<div className="large-8 columns">
										<input type="text" disabled="disabled" value={""} />
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline"></label>
									</div>
									<div className="large-8 columns">
										<input type="text" disabled="disabled" value={""} />
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline"></label>
									</div>
									<div className="large-8 columns">
										<input type="text" disabled="disabled" value={""} />
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline"></label>
									</div>
									<div className="large-8 columns">
										<input type="text" disabled="disabled" value={""} />
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline"></label>
									</div>
									<div className="large-8 columns">
										<input type="text" disabled="disabled" value={""} />
									</div>
								</div>
							</fieldset>
							<div className="row">
								<div className="large-4 columns">
									<label className="right inline">Access Arrangements</label>
								</div>
								<div className="large-8 columns">
									<textarea></textarea>
								</div>
							</div>
							<div className="row">
								<div className="large-4 columns">
									<label className="right inline">Access Telephone</label>
								</div>
								<div className="large-8 columns">
									<input type="text" disabled="disabled" value={""} />
								</div>
							</div>
						</fieldset>
					</div>
				</div>

				<div className="row">
					<div className="large-12 columns">
						<div className="row">
							<div className="large-4 columns">
								<label>Add Product</label>
							</div>
							<div className="large-6 columns">
								<ProductsSelect name={"order[products][]"} onChange={this.handleProductChange} />
							</div>
							<div className="large-2 columns">
								<a className="button tiny right radius fancy" onClick={this.handleAddProduct}>Add Product</a>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="large-12 columns">
						<div className="table">
							<div className="table-head">
								<div className="table-row">
									<div className="table-cell large-10">
										Product
									</div>
									<div className="table-cell large-1">
										Quantity
									</div>
									<div className="table-cell large-1">
										Price
									</div>
								</div>
							</div>
							<div className="table-body">
								{
									this.state.order.products.map(function(product) {
										return (
											<div className="table-row">
												<div className="table-cell">
													{product.name}
												</div>
												<div className="table-cell">
													<input type="number" value={product.quantity} />
												</div>
												<div className="table-cell">
													{product.subtotal}
												</div>
											</div>
										);
									})
								}
							</div>
							<div className="table-foot">
								<div className="table-row">
									<div className="table-cell">&#160;</div>
									<div className="table-cell">Sub Total</div>
									<div className="table-cell">{this.state.order.subTotal}</div>
								</div>
								<div className="table-row">
									<div className="table-cell">&#160;</div>
									<div className="table-cell">VAT</div>
									<div className="table-cell">{this.state.order.VAT}</div>
								</div>
								<div className="table-row">
									<div className="table-cell">&#160;</div>
									<div className="table-cell"><strong>Total</strong></div>
									<div className="table-cell">{this.state.order.total}</div>
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