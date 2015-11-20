var React = require("react");
var Select = require("react-select");

var ProductActions = require("../actions/ProductActions");
var ProductsStore = require("../stores/ProductsStore");

var ProductsSelect = React.createClass({
	_onChange: function() {
		this.setState({
			products: ProductsStore.getProducts()
		});
	},
	componentDidMount: function() {
		ProductsStore.addChangeListener(this._onChange);
		ProductActions.getProducts({});
	},
	getInitialState: function() {
		return {
			products: ProductsStore.getProducts(),
			product: null
		};
	},
	handleOnInputChange: function(inputValue) {
		ProductActions.getProducts({ searchQuery: inputValue });
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