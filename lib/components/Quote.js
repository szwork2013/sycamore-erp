"use strict";

var React = require("react");
var CreateEditCustomer = require("./CreateEditCustomer");
var CreateEditProperty = require("./CreateEditProperty");
var ProductsTable = require("./ProductsTableQuote");

var DatePicker = require("react-datepicker");
var Select = require("react-select");

var QuoteActions = require("../actions/QuoteActions");
var QuoteStore = require("../stores/QuoteStore");

statusOptions = [{ value: "Draft", label: "Draft" }, { value: "Unaccepted", label: "Unaccepted" }, { value: "Accepted", label: "Accepted" }];

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
				status: QuoteStore.getStatus(),
				deliveryDate: QuoteStore.getDeliveryDate(),
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
				status: QuoteStore.getStatus(),
				deliveryDate: QuoteStore.getDeliveryDate(),
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
					React.createElement(
						"fieldset",
						null,
						React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"div",
								{ className: "large-4 columns" },
								React.createElement(
									"label",
									{ className: "right" },
									"Quote Status"
								)
							),
							React.createElement(
								"div",
								{ className: "large-8 columns" },
								React.createElement(Select, {
									options: statusOptions,
									onChange: QuoteActions.setStatus,
									value: this.state.quote.status })
							)
						)
					)
				),
				React.createElement(
					"div",
					{ className: "large-6 columns" },
					React.createElement(
						"fieldset",
						null,
						React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"div",
								{ className: "large-4 columns" },
								React.createElement(
									"label",
									null,
									"Delivery Date"
								)
							),
							React.createElement(
								"div",
								{ className: "large-8 columns" },
								React.createElement(DatePicker, {
									dateFormat: "DD/MM/YYYY",
									selected: this.state.quote.deliveryDate,
									onChange: QuoteActions.setDeliveryDate })
							)
						)
					)
				)
			),
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