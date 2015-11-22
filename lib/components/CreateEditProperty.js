"use strict";

var React = require("react");
var Modal = require("react-modal");
var Property = require("./Property");
var PropertiesSelect = require("./PropertiesSelect");

var OrderActions = require("../actions/OrderActions");

var CreditEditProperty = React.createClass({
	displayName: "CreditEditProperty",

	getInitialState: function getInitialState() {
		return {
			propertyModalIsOpen: false
		};
	},
	openPropertyModal: function openPropertyModal() {
		this.setState({ propertyModalIsOpen: true });
	},
	closePropertyModal: function closePropertyModal() {
		this.setState({ propertyModalIsOpen: false });
	},
	render: function render() {
		var property = this.props.property;
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
						"Property"
					)
				),
				React.createElement(
					"div",
					{ className: "large-8 columns" },
					React.createElement(PropertiesSelect, { name: "order[property]", onChange: OrderActions.setPropertyOnOrder, value: property._id })
				),
				React.createElement(
					"div",
					{ className: "large-2 columns" },
					React.createElement("input", { className: "right fancy radius button tiny", type: "button", value: "New", onClick: this.openPropertyModal })
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
						React.createElement(Property, { property: property, editable: true, isNew: true })
					)
				)
			),
			React.createElement(Property, { property: property, editable: false, isNew: false })
		);
	}
});

exports = module.exports = CreditEditProperty;