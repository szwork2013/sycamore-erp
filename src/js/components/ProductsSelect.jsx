var React = require("react");
var Select = require("react-select");

var ProductActions = require("../actions/ProductActions");
var ProductsStore = require("../stores/ProductsStore");

var ProductsSelect = React.createClass({
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
			products: ProductsStore.getProducts()
		});
	},
	componentDidMount: function() {
		ProductsStore.addChangeListener(this._onChange);
		ProductActions.getProducts({});
	},
	componentWillUnmount: function() {
		ProductsStore.removeChangeListener(this._onChange);
	},
	getInitialState: function() {
		return {
			products: ProductsStore.getProducts()
		};
	},
	handleOnInputChange: function(inputValue) {
		ProductActions.getProducts({ searchQuery: inputValue });
	},
	render: function () {
		return (
			<Select labelKey={"name"}
					name={this.props.name}
					onInputChange={this.handleOnInputChange}
					onChange={this.props.onChange}
					options={this.state.products}
					valueKey={"_id"}
					value={this.props.value} />
		);
	}
});

exports = module.exports = ProductsSelect;