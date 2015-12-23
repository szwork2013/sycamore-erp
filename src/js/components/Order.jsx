var React = require("react");
var CreateEditCustomer = require("./CreateEditCustomer");
var CreateEditProperty = require("./CreateEditProperty");
var ProductsTable = require("./ProductsTable");

var OrderActions = require("../actions/OrderActions");
var OrderStore = require("../stores/OrderStore");

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
						<div class="row">
							<div class="large-4 columns">
								Order Status
							</div>
							<div class="large-8 columns">
								<select>
									<option>Draft</option>
									<option>Unaccepted</option>
									<option>Accepted</option>
								</select>
							</div>
						</div>
					</div>
					<div className="large-6 columns">
						<div class="row">
							<div class="large-4 columns">
								Delivery Date
							</div>
							<div class="large-8 columns">
								<input type="text" />
							</div>
						</div>
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