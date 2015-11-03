var React = require("react");

var CustomerStore = require("../stores/CustomerStore");

function getCustomerFromStore(customer) {
	return {
		customer: CustomerStore.getCustomer(customer)
	}
}

var Customer = React.createClass({
	_onChange: function() {
		this.setState(getCustomerFromStore());
	},
	componentDidMount: function() {
		CustomerStore.addListener(this._onChange);
	},
	getInitialState: function() {
		var customer;
		
		if(typeof(this.props.customer) != "undefined") {
			customer = this.props.customer;
		}

		return getCustomerFromStore(customer);
	},
	render: function () {
		var customer = this.state.customer;

		var disabled = false;
		if(this.props.editable) {
			disabled = true;
		}

		return (
			<div>
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Name</label>
					</div>
					<div className="large-8 columns">
						<input type="text" disabled={disabled} value={customer.name} />
					</div>
				</div>
				<fieldset>
					<label>Billing Address</label>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline">Line 1</label>
						</div>
						<div className="large-8 columns">
							<input type="text" disabled={disabled} value={customer.billingAddress.line1} />
						</div>
					</div>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline">Line 2</label>
						</div>
						<div className="large-8 columns">
							<input type="text" disabled={disabled} value={customer.billingAddress.line2} />
						</div>
					</div>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline">Line 3</label>
						</div>
						<div className="large-8 columns">
							<input type="text" disabled={disabled} value={customer.billingAddress.line3} />
						</div>
					</div>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline">Line 4</label>
						</div>
						<div className="large-8 columns">
							<input type="text" disabled={disabled} value={customer.billingAddress.line4} />
						</div>
					</div>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline">PostCode</label>
						</div>
						<div className="large-8 columns">
							<input type="text" disabled={disabled} value={customer.billingAddress.postCode} />
						</div>
					</div>
				</fieldset>
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Telephone</label>
					</div>
					<div className="large-8 columns">
						<input type="text" disabled={disabled} value={customer.telephone} />
					</div>
				</div>
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Email</label>
					</div>
					<div className="large-8 columns">
						<input type="text" disabled={disabled} value={customer.email} />
					</div>
				</div>
			</div>
		);
	}
});

exports = module.exports = Customer;