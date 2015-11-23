var React = require("react");
var Select = require("react-select");

var ProductVariationGroupActions = require("../actions/ProductVariationGroupActions");
var ProductVariationGroupsStore = require("../stores/ProductVariationGroupsStore");

var ProductVariationGroupsSelect = React.createClass({
	"propTypes": {
		"onChange": React.PropTypes.func.isRequired,
		"value": React.PropTypes.any
	},
	getDefaultProps: function() {
		var onChange = function(value, selectedOptions) {};
		return {
			"onChange": onChange,
			"value": null
		};
	},
	_onChange: function() {
		this.setState({
			productVariationGroups: ProductVariationGroupsStore.getProductVariationGroups()
		});
	},
	componentDidMount: function() {
		ProductVariationGroupsStore.addChangeListener(this._onChange);
		ProductVariationGroupActions.getProductVariationGroups({});
	},
	getInitialState: function() {
		return {
			productVariationGroups: ProductVariationGroupsStore.getProductVariationGroups()
		};
	},
	handleOnInputChange: function(inputValue) {
		ProductVariationGroupActions.getProductVariationGroups({ searchQuery: inputValue });
	},
	render: function () {
		return (
			<Select labelKey={"name"}
					name={this.props.name}
					onInputChange={this.handleOnInputChange}
					onChange={this.props.onChange}
					options={this.state.productVariationGroups}
					valueKey={"_id"}
					value={this.props.value} />
		);
	}
});

exports = module.exports = ProductVariationGroupsSelect;