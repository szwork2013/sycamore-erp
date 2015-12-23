var React = require("react");
var CreateEditCustomer = require("./CreateEditCustomer");
var CreateEditProperty = require("./CreateEditProperty");
var ProductsTable = require("./ProductsTableQuote");

var DatePicker = require("react-datepicker");
var Select = require("react-select");

var QuoteActions = require("../actions/QuoteActions");
var QuoteStore = require("../stores/QuoteStore");

statusOptions = [
	{ value: "Draft", label: "Draft" },
	{ value: "Unaccepted", label: "Unaccepted" },
	{ value: "Accepted", label: "Accepted" }
];

var Quote = React.createClass({
	"propTypes": {
		"quote": React.PropTypes.object,
		"editable": React.PropTypes.bool.isRequired,
		"isNew": React.PropTypes.bool.isRequired
	},
	_onChange: function() {
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
	componentDidMount: function() {
		QuoteStore.addChangeListener(this._onChange);
		QuoteStore.loadData(this.props.quote);
	},
	componentWillUnount: function() {
		QuoteStore.removeChangeListener(this._onChange);
	},
	getInitialState: function() {
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
	render: function () {
		return (
			<div>
				<div className="row">
					<div className="large-6 columns">
						<fieldset>
							<div className="row">
								<div className="large-4 columns">
									<label className="right">Quote Status</label>
								</div>
								<div className="large-8 columns">
									<Select
										options={statusOptions}
										onChange={QuoteActions.setStatus}
										value={this.state.quote.status} />
								</div>
							</div>
						</fieldset>
					</div>
					<div className="large-6 columns">
						<fieldset>
							<div className="row">
								<div className="large-4 columns">
									<label>Delivery Date</label>
								</div>
								<div className="large-8 columns">
									<DatePicker
										dateFormat="DD/MM/YYYY"
										selected={this.state.quote.deliveryDate}
										onChange={QuoteActions.setDeliveryDate} />
								</div>
							</div>
						</fieldset>
					</div>
				</div>
				<div className="row">
					<div className="large-6 columns">
						<CreateEditCustomer />
					</div>
					<div className="large-6 columns">
						<CreateEditProperty displayCustomerDropdown={false} />
					</div>
				</div>

				<ProductsTable quote={this.state.quote} products={this.state.quote.products} />
			</div>
		);
	}
});

exports = module.exports = Quote;