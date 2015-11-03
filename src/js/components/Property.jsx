var React = require("react");

var PropertyStore = require("../stores/PropertyStore");

function getPropertyFromStore(property) {
	return {
		property: PropertyStore.getProperty(property)
	}
}

var Property = React.createClass({
	_onChange: function() {
		this.setState(getPropertyFromStore());
	},
	componentDidMount: function() {
		PropertyStore.addListener(this._onChange);
	},
	getInitialState: function() {
		var property;
		
		if(typeof(this.props.property) != "undefined") {
			property = this.props.property;
		}

		return getPropertyFromStore(property);
	},
	render: function () {
		var property = this.state.property;

		var disabled = false;
		if(this.props.editable) {
			disabled = true;
		}

		return (
			<div>
				<fieldset>
					<label>Property Address</label>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline"></label>
						</div>
						<div className="large-8 columns">
							<input type="text" disabled="disabled" value={property.address.line1} />
						</div>
					</div>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline"></label>
						</div>
						<div className="large-8 columns">
							<input type="text" disabled="disabled" value={property.address.line2} />
						</div>
					</div>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline"></label>
						</div>
						<div className="large-8 columns">
							<input type="text" disabled="disabled" value={property.address.line3} />
						</div>
					</div>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline"></label>
						</div>
						<div className="large-8 columns">
							<input type="text" disabled="disabled" value={property.address.line4} />
						</div>
					</div>
					<div className="row">
						<div className="large-4 columns">
							<label className="right inline"></label>
						</div>
						<div className="large-8 columns">
							<input type="text" disabled="disabled" value={property.address.postCode} />
						</div>
					</div>
				</fieldset>
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Access Arrangements</label>
					</div>
					<div className="large-8 columns">
						<textarea></textarea>
					</div>
				</div>
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Access Telephone</label>
					</div>
					<div className="large-8 columns">
						<input type="text" disabled="disabled" value={property.telephone} />
					</div>
				</div>
			</div>
		);
	}
});

exports = module.exports = Property;