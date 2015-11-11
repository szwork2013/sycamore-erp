var React = require("react");

var CustomerStore = require("../stores/CustomerStore");

var Customer = React.createClass({
	"propTypes": {
		"editable": React.PropTypes.bool.isRequired,
		"isNew": React.PropTypes.bool.isRequired
	},
	_onChange: function() {
		this.setState({
			customer: {
				_id: CustomerStore.getId(),
				name: CustomerStore.getName(),
				billingAddress: {
					line1: CustomerStore.getBillingAddressLine1(),
					line2: CustomerStore.getBillingAddressLine2(),
					line3: CustomerStore.getBillingAddressLine3(),
					line4: CustomerStore.getBillingAddressLine4(),
					postCode: CustomerStore.getBillingAddressPostCode()
				},
				telephone: CustomerStore.getTelephone(),
				email: CustomerStore.getEmail()
			}
		});
	},
	componentDidMount: function() {
		CustomerStore.addChangeListener(this._onChange);
	},
	getInitialState: function() {
		return {
			customer: {
				_id: CustomerStore.getId(),
				name: CustomerStore.getName(),
				billingAddress: {
					line1: CustomerStore.getBillingAddressLine1(),
					line2: CustomerStore.getBillingAddressLine2(),
					line3: CustomerStore.getBillingAddressLine3(),
					line4: CustomerStore.getBillingAddressLine4(),
					postCode: CustomerStore.getBillingAddressPostCode()
				},
				telephone: CustomerStore.getTelephone(),
				email: CustomerStore.getEmail()
			}
		};
	},
	render: function () {
		return (
			<div>
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Name</label>
					</div>
					<div className="large-8 columns">
						<input type="text" disabled={!(this.props.editable)} value={this.state.customer.name} />
					</div>
				</div>
				<fieldset>
					<label>Billing Address</label>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline">Line 1</label>
						</div>
						<div className="large-8 columns">
							<input type="text" disabled={!(this.props.editable)} value={this.state.customer.billingAddress.line1} />
						</div>
					</div>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline">Line 2</label>
						</div>
						<div className="large-8 columns">
							<input type="text" disabled={!(this.props.editable)} value={this.state.customer.billingAddress.line2} />
						</div>
					</div>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline">Line 3</label>
						</div>
						<div className="large-8 columns">
							<input type="text" disabled={!(this.props.editable)} value={this.state.customer.billingAddress.line3} />
						</div>
					</div>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline">Line 4</label>
						</div>
						<div className="large-8 columns">
							<input type="text" disabled={!(this.props.editable)} value={this.state.customer.billingAddress.line4} />
						</div>
					</div>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline">PostCode</label>
						</div>
						<div className="large-8 columns">
							<input type="text" disabled={!(this.props.editable)} value={this.state.customer.billingAddress.postCode} />
						</div>
					</div>
				</fieldset>
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Telephone</label>
					</div>
					<div className="large-8 columns">
						<input type="text" disabled={!(this.props.editable)} value={this.state.customer.telephone} />
					</div>
				</div>
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Email</label>
					</div>
					<div className="large-8 columns">
						<input type="text" disabled={!(this.props.editable)} value={this.state.customer.email} />
					</div>
				</div>
			</div>
		);
	}
});

exports = module.exports = Customer;