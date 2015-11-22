var React = require("react");
var Modal = require("react-modal");
var Property = require("./Property");
var PropertiesSelect = require("./PropertiesSelect");

var OrderActions = require("../actions/OrderActions");
var OrderStore = require("../stores/OrderStore");

var CreditEditProperty = React.createClass({
	_onChange: function() {
		this.setState({
			property: OrderStore.getProperty()
		});
	},
	getInitialState: function() {
		return {
			property: OrderStore.getProperty(),
			propertyModalIsOpen: false
		}
	},
	componentDidMount: function() {
		OrderStore.addChangeListener(this._onChange);
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
						<PropertiesSelect name={"order[property]"} onChange={OrderActions.setPropertyOnOrder} value={this.state.property._id} />
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
							<Property property={this.state.property} editable={true} isNew={true} />
						</div>
					</div>
				</Modal>
				<Property property={this.state.property} editable={false} isNew={false} />
			</fieldset>
		);
	}
});

exports = module.exports = CreditEditProperty;