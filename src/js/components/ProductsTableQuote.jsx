var React = require("react");

var ProductsSelect = require("./ProductsSelect");
var QuoteActions = require("../actions/QuoteActions");

var ProductsTable = React.createClass({
	getInitialState: function() {
		return {
			product: {
				_id: null
			}
		};
	},
	handleAddProduct: function() {
		QuoteActions.addProductToQuote(this.state.product);
	},
	handleProductChange: function(value, selectedOptions) {
		var product = selectedOptions[0];
		this.setState({ product: product });
	},
	render: function () {	
		return (
			<div>
				<div className="row">
					<div className="large-12 columns">
						<div className="row">
							<div className="large-1 columns">
								<label className="inline">Add Product</label>
							</div>
							<div className="large-6 columns">
								<ProductsSelect onChange={this.handleProductChange} value={this.state.product._id} />
							</div>
							<div className="large-5 columns">
								<a className="button tiny radius fancy" onClick={this.handleAddProduct}>Add Product</a>
								<a className="fancy button tiny radius right">Add Discount</a>
								<a className="fancy button tiny radius right">Add Delivery Charge</a>
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
									this.props.quote.products.map(function(product, productIndex) {
										return (
											<div className="table-row" key={productIndex}>
												<div className="table-cell">
													{product.product.name}
												</div>
												<div className="table-cell">
													{product.product.price}
												</div>
												<div className="table-cell">
													<input type="number" onChange={QuoteActions.setProductQuantityOnQuote.bind(this, productIndex)} value={product.quantity} />
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
									<div className="table-cell left-box">Sub Total</div>
									<div className="table-cell text-right right-box">{this.props.quote.subTotal}</div>
								</div>
								<div className="table-row">
									<div className="table-cell">&#160;</div>
									<div className="table-cell">&#160;</div>
									<div className="table-cell">&#160;</div>
									<div className="table-cell">&#160;</div>
									<div className="table-cell left-box">VAT</div>
									<div className="table-cell text-right right-box">{this.props.quote.VAT}</div>
								</div>
								<div className="table-row">
									<div className="table-cell">&#160;</div>
									<div className="table-cell">&#160;</div>
									<div className="table-cell">&#160;</div>
									<div className="table-cell">&#160;</div>
									<div className="table-cell left-box"><strong>Total</strong></div>
									<div className="table-cell text-right right-box">{this.props.quote.total}</div>
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