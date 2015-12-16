var React = require("react");
var Modal = require("react-modal");
var Customer = require("./Customer");
var CustomersSelect = require("./CustomersSelect");

var OrderActions = require("../actions/OrderActions");
var CustomerStore = require("../stores/CustomerStore");

var CreditEditCustomer = React.createClass({
	_onChange: function() {
		this.setState({
			customer: CustomerStore.getCustomer()
		});
	},
	getInitialState: function() {
		return {
			customer: CustomerStore.getCustomer(),
			customerModalIsOpen: false
		}
	},
	componentDidMount: function() {
		CustomerStore.addChangeListener(this._onChange);
	},
	openCustomerModal: function() {
		this.setState({ customerModalIsOpen: true });
	},
	closeCustomerModal: function() {
		this.setState({ customerModalIsOpen: false });
	},
	render: function () {
		return (
			<fieldset>
				<div className="row">
					<div className="large-2 columns">
						<label className="inline">Customer</label>
					</div>
					<div className="large-6 columns">
						<CustomersSelect onChange={OrderActions.setCustomerOnOrder} value={this.state.customer._id} />
					</div>
					<div className="large-4 columns">
						<input className="right fancy radius button tiny" type="button" value="New" onClick={this.openCustomerModal} />
						<input style={{ "margin-right": "10px" }} className="right fancy radius button tiny" type="button" value="Edit" onClick={this.openCustomerModal} />
					</div>
				</div>
				<Modal isOpen={this.state.customerModalIsOpen}
					   onRequestClose={this.closeCustomerModal}>
					<div className="row">
						<div className="large-12 columns">
							<a className="fancy radius button tiny right">
								Save
							</a>
						</div>
					</div>
					<div className="row">
						<div className="large-6 columns">
							<Customer customer={this.state.customer} editable={true} isNew={true} />
						</div>
					</div>
				</Modal>
				<Customer customer={this.state.customer} editable={false} isNew={false} />
			</fieldset>
		);
	}
});

exports = module.exports = CreditEditCustomer;