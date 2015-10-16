"use strict";

var React = require("react");
var Layout = require("../Layout");
var Header = require("../../components/Header");

var CustomersSelect = require("../../components/CustomersSelect");

var View = React.createClass({
	displayName: "View",

	getInitialState: function getInitialState() {
		var locals = this.props.locals;

		var state = {
			applicationName: "",
			menus: [],
			title: "Sycamore ERP - New property"
		};

		if (typeof locals != "undefined") {
			if (typeof locals.applicationName != "undefined") {
				state.applicationName = locals.applicationName;
			}
			if (typeof locals.menus != "undefined") {
				state.menus = locals.menus;
			}
		}

		return state;
	},
	handleCustomerChange: function handleCustomerChange(value) {
		console.log(value);
	},
	render: function render() {
		return React.createElement(
			Layout,
			{ title: this.state.title, locals: this.props.locals },
			React.createElement(Header, { applicationName: this.state.applicationName, applicationUrl: this.state.applicationUrl, menus: this.state.menus }),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"ul",
					{ className: "breadcrumbs" },
					React.createElement(
						"li",
						null,
						"Properties"
					)
				)
			),
			React.createElement(
				"form",
				{ action: "/sycamore-erp/property", encType: "application/x-www-form-urlencoded", method: "POST" },
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "large-10 columns" },
						React.createElement(
							"h1",
							null,
							"New property"
						)
					),
					React.createElement(
						"div",
						{ className: "large-2 columns" },
						React.createElement("input", { type: "submit", className: "right fancy radius button tiny", value: "Create" })
					)
				),
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"ul",
						{ "data-tab": "data-tab", role: "tablist", className: "tabs" },
						React.createElement(
							"li",
							{ role: "presentation", className: "tab-title active" },
							React.createElement(
								"a",
								{ href: "#general", role: "tab", tabIndex: "0", "aria-selected": "true", "aria-controls": "general" },
								"General"
							)
						)
					)
				),
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "large-4 columns" },
						React.createElement(
							"div",
							{ className: "tabs-content" },
							React.createElement(
								"section",
								{ role: "tabpanel", "aria-hidden": "false", id: "general", className: "content active" },
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-4 columns" },
										React.createElement(
											"label",
											{ "for": "name", className: "right inline" },
											"Name"
										)
									),
									React.createElement(
										"div",
										{ className: "large-8 columns" },
										React.createElement("input", { type: "text", name: "property[name]" })
									)
								),
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-4 columns" },
										React.createElement(
											"label",
											{ className: "right inline" },
											"Customer"
										)
									),
									React.createElement(
										"div",
										{ className: "large-8 columns" },
										React.createElement(CustomersSelect, { name: "property[customer]", onChange: this.handleCustomerChange })
									)
								)
							)
						)
					)
				)
			)
		);
	}
});

if (process.browser) {
	React.render(React.createElement(View, { locals: locals }), document);
}

exports = module.exports = View;