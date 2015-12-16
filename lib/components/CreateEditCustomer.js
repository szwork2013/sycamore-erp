"use strict";

var React = require("react");
var Modal = require("react-modal");
var Customer = require("./Customer");
var CustomersSelect = require("./CustomersSelect");

var OrderActions = require("../actions/OrderActions");
var CustomerStore = require("../stores/CustomerStore");

var Api = require("../services/Api");

var CreateEditCustomer = React.createClass({
	displayName: "CreateEditCustomer",

	_onChange: function _onChange() {
		this.setState({
			customer: CustomerStore.getCustomer()
		});
	},
	getInitialState: function getInitialState() {
		return {
			customer: CustomerStore.getCustomer(),
			customerModalIsOpen: false
		};
	},
	componentDidMount: function componentDidMount() {
		CustomerStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function componentWillUnmount() {
		CustomerStore.removeChangeListener(this._onChange);
	},
	openCustomerModal: function openCustomerModal() {
		this.setState({ customerModalIsOpen: true });
	},
	closeCustomerModal: function closeCustomerModal() {
		this.setState({ customerModalIsOpen: false });
	},
	saveCustomer: function saveCustomer() {
		var self = this;

		if (typeof this.state.customer._id != "undefined" && this.state.customer._id != null) {
			Api.postCustomer(CustomerStore.getCustomer(), function () {
				self.closeCustomerModal();
			});
		} else {
			Api.putCustomer(CustomerStore.getCustomer(), function () {
				self.closeCustomerModal();
			});
		}
	},
	render: function render() {
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
					{ className: "large-6 columns" },
					React.createElement(CustomersSelect, { onChange: OrderActions.setCustomerOnOrder, value: this.state.customer._id })
				),
				React.createElement(
					"div",
					{ className: "large-4 columns" },
					React.createElement("input", { className: "right fancy radius button tiny", type: "button", value: "New", onClick: this.openCustomerModal }),
					React.createElement("input", { style: { "marginRight": "10px" }, className: "right fancy radius button tiny", type: "button", value: "Edit", onClick: this.openCustomerModal })
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
							{ className: "fancy radius button tiny right", onClick: this.saveCustomer },
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
						React.createElement(Customer, { customer: this.state.customer, editable: true, isNew: true })
					)
				)
			),
			React.createElement(Customer, { customer: this.state.customer, editable: false, isNew: false })
		);
	}
});

exports = module.exports = CreateEditCustomer;