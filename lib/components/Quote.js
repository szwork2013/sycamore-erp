"use strict";

var React = require("react");
var CreateEditCustomer = require("./CreateEditCustomer");
var CreateEditProperty = require("./CreateEditProperty");
var ProductsTable = require("./ProductsTable");

var QuoteActions = require("../actions/QuoteActions");
var QuoteStore = require("../stores/QuoteStore");

var Quote = React.createClass({
	displayName: "Quote",

	"propTypes": {
		"quote": React.PropTypes.object,
		"editable": React.PropTypes.bool.isRequired,
		"isNew": React.PropTypes.bool.isRequired
	},
	_onChange: function _onChange() {
		this.setState({
			quote: {
				_id: QuoteStore.getId(),
				customer: QuoteStore.getCustomer(),
				property: QuoteStore.getProperty(),
				products: QuoteStore.getProducts(),
				subTotal: QuoteStore.getSubTotal(),
				VAT: QuoteStore.getVAT(),
				total: QuoteStore.getTotal()
			}
		});
	},
	componentDidMount: function componentDidMount() {
		QuoteStore.addChangeListener(this._onChange);
		QuoteStore.loadData(this.props.quote);
	},
	componentWillUnount: function componentWillUnount() {
		QuoteStore.removeChangeListener(this._onChange);
	},
	getInitialState: function getInitialState() {
		return {
			quote: {
				_id: QuoteStore.getId(),
				customer: QuoteStore.getCustomer(),
				property: QuoteStore.getProperty(),
				products: QuoteStore.getProducts(),
				subTotal: QuoteStore.getSubTotal(),
				VAT: QuoteStore.getVAT(),
				total: QuoteStore.getTotal()
			}
		};
	},
	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "large-6 columns" },
					React.createElement(CreateEditCustomer, null)
				),
				React.createElement(
					"div",
					{ className: "large-6 columns" },
					React.createElement(CreateEditProperty, { displayCustomerDropdown: false })
				)
			),
			React.createElement(ProductsTable, { quote: this.state.quote, products: this.state.quote.products })
		);
	}
});

exports = module.exports = Quote;