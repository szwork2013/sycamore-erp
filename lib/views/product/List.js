"use strict";

var React = require("react");
var Layout = require("../Layout");
var Header = require("../../components/Header");

var View = React.createClass({
	displayName: "View",

	getInitialState: function getInitialState() {
		var locals = this.props.locals;

		var state = {
			applicationName: "",
			menus: [],
			locals: locals,
			title: "Sycamore ERP - Products"
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
						"Products"
					)
				)
			),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "large-10 columns" },
					React.createElement(
						"h1",
						null,
						"Products"
					)
				),
				React.createElement(
					"div",
					{ className: "large-2 columns" },
					React.createElement(
						"a",
						{ href: "/sycamore-erp/product", className: "right fancy radius button tiny" },
						React.createElement("i", { className: "in-button-icon fa fa-fw fa-plus" }),
						" Create"
					)
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
							this.state.locals.products.map(function (product) {
								return React.createElement(
									"div",
									{ className: "table-row" },
									React.createElement(
										"div",
										{ className: "table-cell" },
										product.name
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										React.createElement(
											"a",
											{ href: "/sycamore-erp/product/" + product._id },
											React.createElement("i", { className: "icon-button fa fa-fw fa-pencil" })
										),
										React.createElement(
											"a",
											{ href: "/sycamore-erp/product/" + product._id + "/edit.html" },
											React.createElement("i", { className: "icon-button fa fa-fw fa-pencil" })
										),
										React.createElement(
											"a",
											{ href: "/sycamore-erp/product/" + product._id + "/delete" },
											React.createElement("i", { className: "icon-button fa fa-fw fa-trash-o" })
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
	React.render(React.createElement(View, { locals: locals }), document);
}

exports = module.exports = View;