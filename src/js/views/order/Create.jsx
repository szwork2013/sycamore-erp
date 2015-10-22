var React = require("react");
var ReactDOM = require("react-dom");
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
	handleCreateOrder: function() {
		var order = {};
		order.products = [];
		async.eachSeries(
			this.state.order.products,
			function(product, callback) {
				if(typeof(product._id) != "undefined") {
					var item = {};
					item.product = product._id;
					item.quantity = product.quantity;
					item.subTotal = product.subTotal;
					item.VAT = product.VAT;
					item.total = product.total;
					order.products.push(item);
				}
				callback();
			},
			function() {
				if(	(typeof(this.state.order.customer) != "undefined") &&
					(typeof(this.state.order.customer._id) != "undefined")) {
					order.customer = this.state.order.customer._id;
				}
				if(	(typeof(this.state.order.property) != "undefined") &&
					(typeof(this.state.order.property._id) != "undefined")) {
					order.property = this.state.order.property._id;
				}
				order.subTotal = this.state.order.subTotal;
				order.VAT = this.state.order.VAT;
				order.total = this.state.order.total;
				ApplicationActions.createOrder(order);
			}
		);
	},
	handleCustomerChange: function(value) {
		ApplicationActions.setCustomerOnOrder(value);
	},
	handlePropertyChange: function(value) {
		ApplicationActions.setPropertyOnOrder(value);
	},
	handleProductChange: function(value) {
		this.setState({ product: value });
	},
	handleProductQuantityChange: function(productIndex, event) {
		var value = event.target.value;
		ApplicationActions.setProductQuantityOnOrder(productIndex, value);
	},
	render: function() {
		var order = this.state.order;

		var pageTitle = "New order";
		var propertyOpts = {};

		if ((typeof(order.customer) == "undefined") ||
			(order.customer == "") ||
			(typeof(order.customer._id) == "undefined")) {
			propertyOpts["disabled"] = "disabled";
		}

		return (
			<Layout pageTitle={pageTitle} locals={this.props.locals}>
				<ActionsBar pageTitle={pageTitle}>
					<a onClick={this.handleCreateOrder} className="right fancy radius button tiny">
						Create
					</a>
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
									<input type="text" disabled="disabled" value={order.customer.Name} />
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
							<div className="large-1 columns">
								<label className="inline">Add Product</label>
							</div>
							<div className="large-6 columns">
								<ProductsSelect onChange={this.handleProductChange} />
							</div>
							<div className="large-2 columns end">
								<a className="button tiny radius fancy" onClick={this.handleAddProduct}>Add Product</a>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="large-12 columns">
						<div className="table">
							<div className="table-head">
								<div className="table-row">
									<div className="table-cell large-6">
										Product
									</div>
									<div className="table-cell large-1">
										Item Price
									</div>
									<div className="table-cell large-1">
										Quantity
									</div>
									<div className="table-cell large-1">
										Sub Total
									</div>
									<div className="table-cell large-1">
										VAT
									</div>
									<div className="table-cell large-1">
										Total
									</div>
								</div>
							</div>
							<div className="table-body">
								{
									order.products.map(function(product, productIndex) {
										return (
											<div className="table-row" key={productIndex}>
												<div className="table-cell">
													{product.name}
												</div>
												<div className="table-cell">
													{product.price}
												</div>
												<div className="table-cell">
													<input type="number" onChange={this.handleProductQuantityChange.bind(this, productIndex)} value={product.quantity} />
												</div>
												<div className="table-cell">
													{product.subTotal}
												</div>
												<div className="table-cell">
													{product.VAT}
												</div>
												<div className="table-cell">
													{product.total}
												</div>
											</div>
										);
									}, this)
								}
							</div>
							<div className="table-foot">
								<div className="table-row">
									<div className="table-cell">&#160;</div>
									<div className="table-cell">&#160;</div>
									<div className="table-cell">&#160;</div>
									<div className="table-cell">&#160;</div>
									<div className="table-cell">Sub Total</div>
									<div className="table-cell">{order.subTotal}</div>
								</div>
								<div className="table-row">
									<div className="table-cell">&#160;</div>
									<div className="table-cell">&#160;</div>
									<div className="table-cell">&#160;</div>
									<div className="table-cell">&#160;</div>
									<div className="table-cell">VAT</div>
									<div className="table-cell">{order.VAT}</div>
								</div>
								<div className="table-row">
									<div className="table-cell">&#160;</div>
									<div className="table-cell">&#160;</div>
									<div className="table-cell">&#160;</div>
									<div className="table-cell">&#160;</div>
									<div className="table-cell"><strong>Total</strong></div>
									<div className="table-cell">{order.total}</div>
								</div>
								<div className="table-row">
									<div className="table-cell">
										<a className="fancy button tiny radius">Add Discount</a>
										<a className="fancy button tiny radius">Add Delivery Charge</a>
									</div>
									<div className="table-cell">
									</div>
									<div className="table-cell">
									</div>
									<div className="table-cell">
									</div>
									<div className="table-cell">
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
	ReactDOM.render(<View locals={locals} />, document);
}

exports = module.exports = View;