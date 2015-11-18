var React = require("react");

var SuppliersSelect = require("./SuppliersSelect");

var ProductActions = require("../actions/ProductActions");
var ProductStore = require("../stores/ProductStore");

var Product = React.createClass({
	"propTypes": {
		"product": React.PropTypes.object,
		"editable": React.PropTypes.bool.isRequired,
		"isNew": React.PropTypes.bool.isRequired
	},
	_onChange: function() {
		this.setState({
			product: {
				_id: ProductStore.getId(),
				name: ProductStore.getName(),
				code: ProductStore.getCode(),
				supplier: ProductStore.getSupplier(),
				price: ProductStore.getPrice()
			}
		});
	},
	componentDidMount: function() {
		ProductStore.loadData(this.props.product);
		ProductStore.addChangeListener(this._onChange);
	},
	getInitialState: function() {
		return {
			product: {
				_id: ProductStore.getId(),
				name: ProductStore.getName(),
				code: ProductStore.getCode(),
				supplier: ProductStore.getSupplier(),
				price: ProductStore.getPrice()
			}
		};
	},
	render: function () {
		return (
			<div>
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Name</label>
					</div>
					<div className="large-8 columns">
						<input onChange={ProductActions.updateProductName}
							   type="text"
							   value={this.state.product.name} />
					</div>
				</div>
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Supplier</label>
					</div>
					<div className="large-8 columns">
						<SuppliersSelect onChange={ProductActions.selectProductSupplier}
										 type="text"
										 value={this.state.product.supplier} />
					</div>
				</div>
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Product Code</label>
					</div>
					<div className="large-8 columns">
						<input onChange={ProductActions.updateProductCode}
							   type="text"
							   value={this.state.product.code} />
					</div>
				</div>
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Price</label>
					</div>
					<div className="large-8 columns">
						<input onChange={ProductActions.updateProductPrice}
							   type="number"
							   value={this.state.product.price} />
					</div>
				</div>
			</div>
		);
	}
});

exports = module.exports = Product;