"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var Layout = require("../Layout");
var ActionsBar = require("../../components/ActionsBar");

var View = React.createClass({
	displayName: "View",

	getInitialState: function getInitialState() {
		return {};
	},
	render: function render() {
		var customers = this.props.locals.customers;
		var pageTitle = "Customers";

		return React.createElement(
			Layout,
			{ pageTitle: pageTitle, locals: this.props.locals },
			React.createElement(
				ActionsBar,
				{ pageTitle: pageTitle },
				React.createElement(
					"a",
					{ href: "/sycamore-erp/customer", className: "right fancy radius button tiny" },
					React.createElement("i", { className: "in-button-icon fa fa-fw fa-plus" }),
					" Create"
				)
			),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "large-12 columns" },
					React.createElement(
						"div",
						{ className: "table" },
						React.createElement(
							"div",
							{ className: "table-head" },
							React.createElement(
								"div",
								{ className: "table-row" },
								React.createElement(
									"div",
									{ className: "table-cell" },
									"Id"
								),
								React.createElement(
									"div",
									{ className: "table-cell" },
									"Display Name"
								),
								React.createElement(
									"div",
									{ className: "table-cell" },
									"Code"
								),
								React.createElement(
									"div",
									{ className: "table-cell" },
									"Name"
								),
								React.createElement(
									"div",
									{ className: "table-cell large-1" },
									"Actions"
								)
							)
						),
						React.createElement(
							"div",
							{ className: "table-body" },
							customers.map(function (customer) {
								return React.createElement(
									"div",
									{ className: "table-row" },
									React.createElement(
										"div",
										{ className: "table-cell" },
										customer.Id
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										customer.DisplayName
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										customer.Code
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										customer.Name
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										React.createElement(
											"a",
											{ href: "/customer/view/" + customer._id },
											React.createElement("i", { className: "fa fa-fw fa-user icon-button" })
										),
										React.createElement(
											"a",
											{ href: "/customer/edit/" + customer._id },
											React.createElement("i", { className: "fa fa-fw fa-pencil icon-button" })
										),
										React.createElement(
											"a",
											{ href: "/customer/delete/" + customer._id },
											React.createElement("i", { className: "fa fa-fw fa-trash-o icon-button" })
										)
									)
								);
							})
						)
					)
				)
			)
		);
	}
});

if (process.browser) {
	ReactDOM.render(React.createElement(View, { locals: locals }), document);
}

exports = module.exports = View;