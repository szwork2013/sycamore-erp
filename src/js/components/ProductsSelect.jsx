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
		console.log("handleOnInputChange");
		console.log(inputValue);
		ApplicationActions.getProducts({ searchQuery: inputValue });
	},
	handleOnChange: function(value) {
		console.log("handleOnChange");
		console.log(value);
		this.props.onChange(value);
	},
	render: function () {
		return (
			<Select labelKey={"name"}
					name={this.props.name}
					onInputChange={this.handleOnInputChange}
					onChange={this.handleOnChange}
					options={this.state.products}
					valueKey={"_id"} />
		);
	}
});

exports = module.exports = ProductsSelect;