var React = require("react");

var ProductsSelect = require("./ProductsSelect");
var OrderActions = require("../actions/OrderActions");

var ProductsTable = React.createClass({
	getInitialState: function() {
		return {
			product: null
		};
	},
	handleAddProduct: function() {
		OrderActions.addProductToOrder(this.state.product);
	},
	handleProductChange: function(value) {
		this.setState({ product: value });
	},
	render: function () {
		var order = this.props.order;
		var products = this.props.products;
		
		return (
			<div>
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
							<div className="table-header">
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
									products.map(function(product, productIndex) {
										return (
											<div className="table-row" key={productIndex}>
												<div className="table-cell">
													{product.product.name}
												</div>
												<div className="table-cell">
													{product.product.price}
												</div>
												<div className="table-cell">
													<input type="number" onChange={OrderActions.setProductQuantityOnOrder.bind(this, productIndex)} value={product.quantity} />
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
							<div className="table-footer">
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
			</div>
		);
	}
});

exports = module.exports = ProductsTable;