"use strict";

var React = require("react");
var Modal = require("react-modal");
var Property = require("./Property");
var PropertiesSelect = require("./PropertiesSelect");

var OrderActions = require("../actions/OrderActions");
var PropertyStore = require("../stores/PropertyStore");

var CreditEditProperty = React.createClass({
	displayName: "CreditEditProperty",

	_onChange: function _onChange() {
		this.setState({
			property: PropertyStore.getProperty()
		});
	},
	getInitialState: function getInitialState() {
		return {
			property: PropertyStore.getProperty(),
			propertyModalIsOpen: false
		};
	},
	componentDidMount: function componentDidMount() {
		PropertyStore.addChangeListener(this._onChange);
	},
	openPropertyModal: function openPropertyModal() {
		this.setState({ propertyModalIsOpen: true });
	},
	closePropertyModal: function closePropertyModal() {
		this.setState({ propertyModalIsOpen: false });
	},
	render: function render() {
		var propertyOpts = {};

		return React.createElement(
			"fieldset",
			propertyOpts,
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "large-2 columns" },
					React.createElement(
						"label",
						{ className: "inline" },
						"Deliver To"
					)
				),
				React.createElement(
					"div",
					{ className: "large-6 columns" },
					React.createElement(PropertiesSelect, { name: "order[property]", onChange: OrderActions.setPropertyOnOrder, value: this.state.property._id })
				),
				React.createElement(
					"div",
					{ className: "large-4 columns" },
					React.createElement("input", { className: "right fancy radius button tiny", type: "button", value: "New", onClick: this.openPropertyModal }),
					React.createElement("input", { style: { "margin-right": "10px" }, className: "right fancy radius button tiny", type: "button", value: "Edit", onClick: this.openPropertyModal })
				)
			),
			React.createElement(
				Modal,
				{ isOpen: this.state.propertyModalIsOpen,
					onRequestClose: this.closePropertyModal },
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "large-12 columns" },
						React.createElement(
							"a",
							{ className: "fancy radius button tiny right" },
							"Save"
						)
					)
				),
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "large-6 columns" },
						React.createElement(Property, { property: this.state.property, editable: true, isNew: true })
					)
				)
			),
			React.createElement(Property, { property: this.state.property, editable: false, isNew: false })
		);
	}
});

exports = module.exports = CreditEditProperty;