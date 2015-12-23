var React = require("react");
var CreateEditCustomer = require("./CreateEditCustomer");
var CreateEditProperty = require("./CreateEditProperty");
var ProductsTable = require("./ProductsTable");

var DatePicker = require("react-datepicker");
var Select = require("react-select");

var OrderActions = require("../actions/OrderActions");
var OrderStore = require("../stores/OrderStore");

statusOptions = [
	{ value: "Draft", label: "Draft" },
	{ value: "Unaccepted", label: "Unaccepted" },
	{ value: "Accepted", label: "Accepted" }
];

var Order = React.createClass({
	"propTypes": {
		"order": React.PropTypes.object,
		"editable": React.PropTypes.bool.isRequired,
		"isNew": React.PropTypes.bool.isRequired
	},
	_onChange: function() {
		this.setState({
			order: {
				_id: OrderStore.getId(),
				status: OrderStore.getStatus(),
				deliveryDate: OrderStore.getDeliveryDate(),
				customer: OrderStore.getCustomer(),
				property: OrderStore.getProperty(),
				products: OrderStore.getProducts(),
				subTotal: OrderStore.getSubTotal(),
				VAT: OrderStore.getVAT(),
				total: OrderStore.getTotal()
			}
		});
	},
	componentDidMount: function() {
		OrderStore.addChangeListener(this._onChange);
		OrderStore.loadData(this.props.order);
	},
	componentWillUnount: function() {
		OrderStore.removeChangeListener(this._onChange);
	},
	getInitialState: function() {
		return {
			order: {
				_id: OrderStore.getId(),
				status: OrderStore.getStatus(),
				deliveryDate: OrderStore.getDeliveryDate(),
				customer: OrderStore.getCustomer(),
				property: OrderStore.getProperty(),
				products: OrderStore.getProducts(),
				subTotal: OrderStore.getSubTotal(),
				VAT: OrderStore.getVAT(),
				total: OrderStore.getTotal()
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
									<label className="right">Order Status</label>
								</div>
								<div className="large-8 columns">
									<Select
										options={statusOptions}
										onChange={OrderActions.setStatus}
										value={this.state.order.status} />
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
										selected={this.state.order.deliveryDate}
										onChange={OrderActions.setDeliveryDate} />
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

				<ProductsTable order={this.state.order} products={this.state.order.products} />
			</div>
		);
	}
});

exports = module.exports = Order;