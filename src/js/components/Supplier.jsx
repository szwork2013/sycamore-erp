var React = require("react");

var SupplierActions = require("../actions/SupplierActions");
var SupplierStore = require("../stores/SupplierStore");

var Supplier = React.createClass({
	"propTypes": {
		"supplier": React.PropTypes.object,
		"editable": React.PropTypes.bool.isRequired,
		"isNew": React.PropTypes.bool.isRequired
	},
	_onChange: function() {
		this.setState({
			supplier: {
				_id: SupplierStore.getId(),
				name: SupplierStore.getName(),
				billingAddress: {
					line1: SupplierStore.getBillingAddressLine1(),
					line2: SupplierStore.getBillingAddressLine2(),
					line3: SupplierStore.getBillingAddressLine3(),
					line4: SupplierStore.getBillingAddressLine4(),
					postCode: SupplierStore.getBillingAddressPostCode()
				},
				telephone: SupplierStore.getTelephone(),
				email: SupplierStore.getEmail()
			}
		});
	},
	componentDidMount: function() {
		SupplierStore.addChangeListener(this._onChange);
		SupplierStore.loadData(this.props.supplier);
	},
	componentWillUnmount: function() {
		SupplierStore.removeChangeListener(this._onChange);
	},
	getInitialState: function() {
		return {
			supplier: {
				_id: SupplierStore.getId(),
				name: SupplierStore.getName(),
				billingAddress: {
					line1: SupplierStore.getBillingAddressLine1(),
					line2: SupplierStore.getBillingAddressLine2(),
					line3: SupplierStore.getBillingAddressLine3(),
					line4: SupplierStore.getBillingAddressLine4(),
					postCode: SupplierStore.getBillingAddressPostCode()
				},
				telephone: SupplierStore.getTelephone(),
				email: SupplierStore.getEmail()
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
						<input disabled={!(this.props.editable)}
							   onChange={SupplierActions.updateSupplierName}
							   type="text"
							   value={this.state.supplier.name} />
					</div>
				</div>
				<fieldset>
					<label>Billing Address</label>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline">Line 1</label>
						</div>
						<div className="large-8 columns">
							<input disabled={!(this.props.editable)}
								   onChange={SupplierActions.updateSupplierBillingAddressLine1}
								   type="text"
								   value={this.state.supplier.billingAddress.line1} />
						</div>
					</div>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline">Line 2</label>
						</div>
						<div className="large-8 columns">
							<input disabled={!(this.props.editable)}
								   onChange={SupplierActions.updateSupplierBillingAddressLine2}
								   type="text"
								   value={this.state.supplier.billingAddress.line2} />
						</div>
					</div>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline">Line 3</label>
						</div>
						<div className="large-8 columns">
							<input disabled={!(this.props.editable)}
								   onChange={SupplierActions.updateSupplierBillingAddressLine3}
								   type="text"
								   value={this.state.supplier.billingAddress.line3} />
						</div>
					</div>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline">Line 4</label>
						</div>
						<div className="large-8 columns">
							<input disabled={!(this.props.editable)}
								   onChange={SupplierActions.updateSupplierBillingAddressLine4}
								   type="text"
								   value={this.state.supplier.billingAddress.line4} />
						</div>
					</div>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline">PostCode</label>
						</div>
						<div className="large-8 columns">
							<input disabled={!(this.props.editable)}
								   onChange={SupplierActions.updateSupplierBillingAddressPostCode}
								   type="text"
								   value={this.state.supplier.billingAddress.postCode} />
						</div>
					</div>
				</fieldset>
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Telephone</label>
					</div>
					<div className="large-8 columns">
						<input disabled={!(this.props.editable)}
							   onChange={SupplierActions.updateSupplierTelephone}
							   type="text"
							   value={this.state.supplier.telephone} />
					</div>
				</div>
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Email</label>
					</div>
					<div className="large-8 columns">
						<input disabled={!(this.props.editable)}
							   onChange={SupplierActions.updateSupplierEmail}
							   type="text"
							   value={this.state.supplier.email} />
					</div>
				</div>
			</div>
		);
	}
});

exports = module.exports = Supplier;