var React = require("react");
var Modal = require("react-modal");
var Property = require("./Property");
var PropertiesSelect = require("./PropertiesSelect");

var CreditEditProperty = React.createClass({
	getInitialState: function() {
		return {
			propertyModalIsOpen: false
		}
	},
	openPropertyModal: function() {
		this.setState({propertyModalIsOpen: true});
	},
	closePropertyModal: function() {
		this.setState({propertyModalIsOpen: false});
	},
	render: function () {
		var propertyOpts = {};

		return (
			<fieldset {...propertyOpts}>
				<div className="row">				
					<div className="large-2 columns">
						<label className="inline">Property</label>
					</div>
					<div className="large-8 columns">
						<PropertiesSelect name={"order[property]"} onChange={OrderActions.setPropertyOnOrder} />
					</div>
					<div className="large-2 columns">
						<input className="right fancy radius button tiny" type="button" value="New" onClick={this.openPropertyModal} />
					</div>
				</div>
				<Modal isOpen={this.state.propertyModalIsOpen}
					   onRequestClose={this.closePropertyModal}>
					<div className="row">
						<div className="large-12 columns">
							<a className="fancy radius button tiny right">
								Save
							</a>
						</div>
					</div>
					<div className="row">
						<div className="large-6 columns">
							<Property property={order.property} editable={true} isNew={true} />
						</div>
					</div>
				</Modal>
				<Property property={order.property} editable={false} isNew={false} />
			</fieldset>
		);
	}
});

exports = module.exports = CreditEditProperty;