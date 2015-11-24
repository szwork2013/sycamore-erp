var React = require("react");

var ProductVariationActions = require("../actions/ProductVariationActions");
var ProductVariationStore = require("../stores/ProductVariationStore");

var ProductVariation = React.createClass({
	"propTypes": {
		"productVariation": React.PropTypes.object,
		"editable": React.PropTypes.bool.isRequired,
		"isNew": React.PropTypes.bool.isRequired
	},
	_onChange: function() {
		this.setState({
			productVariation: {
				_id: ProductVariationStore.getId(),
				label: ProductVariationStore.getLabel(),
				name: ProductVariationStore.getName()
			}
		});
	},
	componentDidMount: function() {
		ProductVariationStore.addChangeListener(this._onChange);
		ProductVariationStore.loadData(this.props.productVariation);
	},
	getInitialState: function() {
		return {
			productVariation: {
				_id: ProductVariationStore.getId(),
				label: ProductVariationStore.getLabel(),
				name: ProductVariationStore.getName()
			}
		};
	},
	render: function () {
		return (
			<div>
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Label</label>
					</div>
					<div className="large-8 columns">
						<input disabled={!(this.props.editable)}
							   onChange={ProductVariationActions.updateProductVariationLabel}
							   type="text"
							   value={this.state.productVariation.label} />
					</div>
				</div>
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Name</label>
					</div>
					<div className="large-8 columns">
						<input disabled={!(this.props.editable)}
							   onChange={ProductVariationActions.updateProductVariationName}
							   type="text"
							   value={this.state.productVariation.name} />
					</div>
				</div>
			</div>
		);
	}
});

exports = module.exports = ProductVariation;