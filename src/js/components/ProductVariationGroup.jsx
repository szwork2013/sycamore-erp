var React = require("react");

var ProductVariationGroupActions = require("../actions/ProductVariationGroupActions");
var ProductVariationGroupStore = require("../stores/ProductVariationGroupStore");

var ProductVariationGroup = React.createClass({
	"propTypes": {
		"productVariationGroup": React.PropTypes.object,
		"editable": React.PropTypes.bool.isRequired,
		"isNew": React.PropTypes.bool.isRequired
	},
	_onChange: function() {
		this.setState({
			productVariationGroup: {
				_id: ProductVariationGroupStore.getId(),
				name: ProductVariationGroupStore.getName()
			}
		});
	},
	componentDidMount: function() {
		ProductVariationGroupStore.addChangeListener(this._onChange);
		ProductVariationGroupStore.loadData(this.props.productVariationGroup);
	},
	componentWillUnmount: function() {
		ProductVariationGroupStore.removeChangeListener(this._onChange);
	},
	getInitialState: function() {
		return {
			productVariationGroup: {
				_id: ProductVariationGroupStore.getId(),
				name: ProductVariationGroupStore.getName()
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
						<input disabled={!(this.props.editable)}
							   onChange={ProductVariationGroupActions.updateProductVariationGroupName}
							   type="text"
							   value={this.state.productVariationGroup.name} />
					</div>
				</div>
			</div>
		);
	}
});

exports = module.exports = ProductVariationGroup;