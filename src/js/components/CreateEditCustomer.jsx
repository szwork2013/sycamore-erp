var React = require("react");
var Modal = require("react-modal");
var Customer = require("./Customer");
var CustomersSelect = require("./CustomersSelect");

var OrderActions = require("../actions/OrderActions");
var CustomerStore = require("../stores/CustomerStore");

var Api = require("../services/Api");

var CreateEditCustomer = React.createClass({
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
	componentWillUnmount: function() {
		CustomerStore.removeChangeListener(this._onChange);
	},
	openCustomerModal: function() {
		this.setState({ customerModalIsOpen: true });
	},
	closeCustomerModal: function() {
		this.setState({ customerModalIsOpen: false });
	},
	saveCustomer: function() {
		var self = this;

		if((typeof this.state.customer._id != "undefined") && (this.state.customer._id != null)) {
			Api.postCustomer(this.state.customer._id, CustomerStore.getCustomer(), function(response) {
				self.closeCustomerModal();
				CustomerStore.loadData(response.body);
			});
		} else {
			Api.putCustomer(CustomerStore.getCustomer(), function(response) {
				self.closeCustomerModal();
				CustomerStore.loadData(response.body);
			});
		}
	},
	render: function () {
		return (
			<fieldset>
				<div className="row">
					<div className="large-2 columns">
						<label className="inline right">Customer</label>
					</div>
					<div className="large-6 columns">
						<CustomersSelect onChange={OrderActions.setCustomerOnOrder} value={this.state.customer._id} />
					</div>
					<div className="large-4 columns">
						<input className="right fancy radius button tiny" type="button" value="New" onClick={this.openCustomerModal} />
						<input style={{ "marginRight": "10px" }} className="right fancy radius button tiny" type="button" value="Edit" onClick={this.openCustomerModal} />
					</div>
				</div>
				<Modal isOpen={this.state.customerModalIsOpen}
					   onRequestClose={this.closeCustomerModal}>
					<div className="row">
						<div className="large-12 columns">
							<a className="fancy radius button tiny right" onClick={this.saveCustomer}>
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

exports = module.exports = CreateEditCustomer;