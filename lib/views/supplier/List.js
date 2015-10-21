"use strict";

var React = require("react");
var Layout = require("../Layout");
var ActionsBar = require("../../components/ActionsBar");

var View = React.createClass({
	displayName: "View",

	getInitialState: function getInitialState() {
		return {};
	},
	render: function render() {
		var suppliers = this.props.locals.suppliers;
		var pageTitle = "Suppliers";

		return React.createElement(
			Layout,
			{ pageTitle: pageTitle, locals: this.props.locals },
			React.createElement(
				ActionsBar,
				{ pageTitle: pageTitle },
				React.createElement(
					"a",
					{ href: "/sycamore-erp/supplier", className: "right fancy radius button tiny" },
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
							suppliers.map(function (supplier) {
								return React.createElement(
									"div",
									{ className: "table-row" },
									React.createElement(
										"div",
										{ className: "table-cell" },
										supplier.name
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										React.createElement(
											"a",
											{ href: "/sycamore-erp/supplier/" + supplier._id },
											React.createElement("i", { className: "icon-button fa fa-fw fa-pencil" })
										),
										React.createElement(
											"a",
											{ href: "/sycamore-erp/supplier/" + supplier._id + "/edit.html" },
											React.createElement("i", { className: "icon-button fa fa-fw fa-pencil" })
										),
										React.createElement(
											"a",
											{ href: "/sycamore-erp/supplier/" + supplier._id + "/delete" },
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