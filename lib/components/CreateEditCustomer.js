"use strict";

var React = require("react");
var Modal = require("react-modal");
var Customer = require("./Customer");
var CustomersSelect = require("./CustomersSelect");

var OrderActions = require("../actions/OrderActions");

var CreditEditCustomer = React.createClass({
	displayName: "CreditEditCustomer",

	getInitialState: function getInitialState() {
		return {
			customerModalIsOpen: false
		};
	},
	openCustomerModal: function openCustomerModal() {
		this.setState({ customerModalIsOpen: true });
	},
	closeCustomerModal: function closeCustomerModal() {
		this.setState({ customerModalIsOpen: false });
	},
	render: function render() {
		var customer = this.props.customer;

		return React.createElement(
			"fieldset",
			null,
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "large-2 columns" },
					React.createElement(
						"label",
						{ className: "inline" },
						"Customer"
					)
				),
				React.createElement(
					"div",
					{ className: "large-8 columns" },
					React.createElement(CustomersSelect, { name: "order[customer]", onChange: OrderActions.setCustomerOnOrder })
				),
				React.createElement(
					"div",
					{ className: "large-2 columns" },
					React.createElement("input", { className: "right fancy radius button tiny", type: "button", value: "New", onClick: this.openCustomerModal })
				)
			),
			React.createElement(
				Modal,
				{ isOpen: this.state.customerModalIsOpen,
					onRequestClose: this.closeCustomerModal },
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
						React.createElement(Customer, { customer: customer, editable: true, isNew: true })
					)
				)
			),
			React.createElement(Customer, { customer: customer, editable: false, isNew: false })
		);
	}
});

exports = module.exports = CreditEditCustomer;