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
						<CreateEditCustomer customer={this.state.order.customer} />
					</div>
					<div className="large-6 columns">
						<CreateEditProperty property={this.state.order.property} />
					</div>
				</div>

				<ProductsTable order={this.state.order} products={this.state.order.products} />
			</div>
		);
	}
});

exports = module.exports = Order;