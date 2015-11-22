var React = require("react");

var PropertyActions = require("../actions/PropertyActions");
var PropertyStore = require("../stores/PropertyStore");

var CustomerStore = require("../stores/CustomerStore");

var Property = React.createClass({
	"propTypes": {
		"property": React.PropTypes.object,
		"editable": React.PropTypes.bool.isRequired,
		"isNew": React.PropTypes.bool.isRequired
	},
	_onChange: function() {
		this.setState({
			property: {
				_id: PropertyStore.getId(),
				customer: CustomerStore.getCustomer(),
				accessArrangements: PropertyStore.getAccessArrangements(),
				address: {
					line1: PropertyStore.getAddressLine1(),
					line2: PropertyStore.getAddressLine2(),
					line3: PropertyStore.getAddressLine3(),
					line4: PropertyStore.getAddressLine4(),
					postCode: PropertyStore.getAddressPostCode()
				},
				telephone: PropertyStore.getTelephone()
			}
		});
	},
	componentDidMount: function() {
		PropertyStore.addChangeListener(this._onChange);
		PropertyStore.loadData(this.props.property);
	},
	getInitialState: function() {
		return {
			property: {
				_id: PropertyStore.getId(),
				customer: CustomerStore.getCustomer(),
				accessArrangements: PropertyStore.getAccessArrangements(),
				address: {
					line1: PropertyStore.getAddressLine1(),
					line2: PropertyStore.getAddressLine2(),
					line3: PropertyStore.getAddressLine3(),
					line4: PropertyStore.getAddressLine4(),
					postCode: PropertyStore.getAddressPostCode()
				},
				telephone: PropertyStore.getTelephone()
			}
		};
	},
	render: function () {
		return (
			<div>
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Customer</label>
					</div>
					<div className="large-8 columns">
						<CustomersSelect onChange={PropertyActions.setCustomerOnProperty} value={this.state.property.customer._id} />
					</div>
				</div>
				<fieldset>
					<label>Property Address</label>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline"></label>
						</div>
						<div className="large-8 columns">
							<input disabled={!(this.props.editable)}
								   onChange={PropertyActions.updatePropertyAddressLine1}
								   type="text"
								   value={this.state.property.address.line1} />
						</div>
					</div>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline"></label>
						</div>
						<div className="large-8 columns">
							<input disabled={!(this.props.editable)}
								   onChange={PropertyActions.updatePropertyAddressLine2}
								   type="text"
								   value={this.state.property.address.line2} />
						</div>
					</div>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline"></label>
						</div>
						<div className="large-8 columns">
							<input disabled={!(this.props.editable)}
								   onChange={PropertyActions.updatePropertyAddressLine3}
								   type="text"
								   value={this.state.property.address.line3} />
						</div>
					</div>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline"></label>
						</div>
						<div className="large-8 columns">
							<input disabled={!(this.props.editable)}
								   onChange={PropertyActions.updatePropertyAddressLine4}
								   type="text"
								   value={this.state.property.address.line4} />
						</div>
					</div>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline"></label>
						</div>
						<div className="large-8 columns">
							<input disabled={!(this.props.editable)}
								   onChange={PropertyActions.updatePropertyAddressPostCode}
								   type="text"
								   value={this.state.property.address.postCode} />
						</div>
					</div>
				</fieldset>
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Access Arrangements</label>
					</div>
					<div className="large-8 columns">
						<textarea disabled={!(this.props.editable)}
								  onChange={PropertyActions.updatePropertyAccessArrangements}
								  value={this.state.property.accessArrangements}>
						</textarea>
					</div>
				</div>
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Access Telephone</label>
					</div>
					<div className="large-8 columns">
						<input disabled={!(this.props.editable)}
							   onChange={PropertyActions.updatePropertyTelephone}
							   type="text"
							   value={this.state.property.telephone} />
					</div>
				</div>
			</div>
		);
	}
});

exports = module.exports = Property;