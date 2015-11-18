var React = require("react");
var Modal = require("react-modal");
var Customer = require("./Customer");
var CustomersSelect = require("./CustomersSelect");

var CreditEditCustomer = React.createClass({
	getInitialState: function() {
		return {
			customerModalIsOpen: false
		}
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
					<div className="large-8 columns">
						<CustomersSelect name={"order[customer]"} onChange={OrderActions.setCustomerOnOrder} />
					</div>
					<div className="large-2 columns">
						<input className="right fancy radius button tiny" type="button" value="New" onClick={this.openCustomerModal} />
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
							<Customer customer={order.customer} editable={true} isNew={true} />
						</div>
					</div>
				</Modal>
				<Customer customer={order.customer} editable={false} isNew={false} />
			</fieldset>
		);
	}
});

exports = module.exports = CreditEditCustomer;