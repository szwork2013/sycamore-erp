var React = require("react");
var Select = require("react-select");

var ApplicationActions = require("../actions/ApplicationActions");
var ProductsStore = require("../stores/ProductsStore");

function getProductsFromStore() {
	return {
		products: ProductsStore.getProducts(),
		product: null
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
	handleOnChange: function(value, selectedOptions) {
		if(value) {
			this.setState({ product: value });
		}
		if(selectedOptions.length == 1) {
			this.props.onChange(selectedOptions[0]);
		}
	},
	render: function () {
		return (
			<Select labelKey={"name"}
					name={this.props.name}
					onInputChange={this.handleOnInputChange}
					onChange={this.handleOnChange}
					options={this.state.products}
					valueKey={"_id"}
					value={this.state.product} />
		);
	}
});

exports = module.exports = ProductsSelect;