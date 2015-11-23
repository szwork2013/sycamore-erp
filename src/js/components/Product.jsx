var React = require("react");
var Select = require("react-select");

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
				price: ProductStore.getPrice(),
				productCode: ProductStore.getProductCode(),
				productType: ProductStore.getProductType(),
				productVariationGroup: null,
				supplier: ProductStore.getSupplier()
			}
		});
	},
	componentDidMount: function() {
		ProductStore.addChangeListener(this._onChange);
		ProductStore.loadData(this.props.product);
	},
	getInitialState: function() {
		return {
			product: {
				_id: ProductStore.getId(),
				name: ProductStore.getName(),
				price: ProductStore.getPrice(),
				productCode: ProductStore.getProductCode(),
				productType: ProductStore.getProductType(),
				productVariationGroup: getProductVariationGroup(),
				supplier: ProductStore.getSupplier()
			}
		};
	},
	render: function () {
		return (
			<div>
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Type</label>
					</div>
					<div className="large-8 columns">
						<Select onChange={ProductActions.updateProductType}
								options={[ "Simple", "Configurable", "Package" ]}
								value={this.state.product.productType} />
					</div>
				</div>
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Variation Group</label>
					</div>
					<div className="large-8 columns">
						<ProductVariationGroupsSelect onChange={ProductActions.selectProductVariationGroup}
													  type="text"
													  value={this.state.product.productVariationGroup._id} />
					</div>
				</div>
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
										 value={this.state.product.supplier._id} />
					</div>
				</div>
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Product Code</label>
					</div>
					<div className="large-8 columns">
						<input onChange={ProductActions.updateProductCode}
							   type="text"
							   value={this.state.product.productCode} />
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