var React = require("react");
var Modal = require("react-modal");
var Property = require("./Property");
var PropertiesSelect = require("./PropertiesSelect");

var OrderActions = require("../actions/OrderActions");
var PropertyStore = require("../stores/PropertyStore");

var Api = require("../services/Api");

var CreditEditProperty = React.createClass({
	_onChange: function() {
		this.setState({
			property: PropertyStore.getProperty()
		});
	},
	getInitialState: function() {
		return {
			property: PropertyStore.getProperty(),
			propertyModalIsOpen: false
		}
	},
	componentDidMount: function() {
		PropertyStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		PropertyStore.removeChangeListener(this._onChange);
	},
	openPropertyModal: function() {
		this.setState({propertyModalIsOpen: true});
	},
	closePropertyModal: function() {
		this.setState({propertyModalIsOpen: false});
	},
	saveProperty: function() {
		var self = this;

		if((typeof this.state.property._id != "undefined") && (this.state.property._id != null)) {
			Api.postProperty(PropertyStore.getProperty(), function(response) {
				self.closePropertyModal();
				PropertyStore.loadData(response.body);
			});
		} else {
			Api.putProperty(PropertyStore.getProperty(), function(response) {
				self.closePropertyModal();
				PropertyStore.loadData(response.body);
			});
		}
	},
	render: function () {
		var propertyOpts = {};

		return (
			<fieldset {...propertyOpts}>
				<div className="row">				
					<div className="large-2 columns">
						<label className="inline">Deliver To</label>
					</div>
					<div className="large-6 columns">
						<PropertiesSelect name={"order[property]"} onChange={OrderActions.setPropertyOnOrder} value={this.state.property._id} />
					</div>
					<div className="large-4 columns">
						<input className="right fancy radius button tiny" type="button" value="New" onClick={this.openPropertyModal} />
						<input style={{ "marginRight": "10px" }} className="right fancy radius button tiny" type="button" value="Edit" onClick={this.openPropertyModal} />
					</div>
				</div>
				<Modal isOpen={this.state.propertyModalIsOpen}
					   onRequestClose={this.closePropertyModal}>
					<div className="row">
						<div className="large-12 columns">
							<a className="fancy radius button tiny right" onClick={this.saveProperty}>
								Save
							</a>
						</div>
					</div>
					<div className="row">
						<div className="large-6 columns">
							<Property property={this.state.property} displayCustomerDropdown={this.props.displayCustomerDropdown} editable={true} isNew={true} />
						</div>
					</div>
				</Modal>
				<Property property={this.state.property} displayCustomerDropdown={this.props.displayCustomerDropdown} editable={false} isNew={false} />
			</fieldset>
		);
	}
});

exports = module.exports = CreditEditProperty;