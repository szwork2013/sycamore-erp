var React = require("react");
var Select = require("react-select");

var ApplicationActions = require("../actions/ApplicationActions");
var ProductsStore = require("../stores/ProductsStore");

function getProductsFromStore() {
	return {
		products: ProductsStore.getProducts()
	};
}

var ProductsSelect = React.createClass({
	_onChange: function() {
		this.setState(getProductsFromStore());
	},
	componentDidMount: function() {
		ProductsStore.addChangeListener(this._onChange);
	},
	getInitialState: function() {
		return getProductsFromStore();
	},
	handleOnInputChange: function(inputValue) {
		ApplicationActions.getProducts({ searchQuery: inputValue });
	},
	handleOnOptionLabelClick: function(value, event) {
		this.props.onChange(value);
	},
	render: function () {
		return (
			<Select labelKey={"name"}
					name={this.props.name}
					onInputChange={this.handleOnInputChange}
					onOptionLabelClick={this.handleOnOptionLabelClick}
					options={this.state.products}
					valueKey={"_id"} />
		);
	}
});

exports = module.exports = ProductsSelect;