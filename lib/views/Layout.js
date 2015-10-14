"use strict";

var React = require("react");
var util = require("util");

var Layout = React.createClass({
	displayName: "Layout",

	getInitialState: function getInitialState() {
		var state = {};

		state.locals = this.props.locals;
		state.locals.title = this.props.title;

		return state;
	},
	render: function render() {
		var locals = this.state.locals;
		var js = "var locals = " + JSON.stringify(locals);

		return React.createElement(
			"html",
			null,
			React.createElement(
				"head",
				null,
				React.createElement("meta", { charSet: "utf-8" }),
				React.createElement("link", { rel: "stylesheet", type: "text/css", href: "/css/styles.css" }),
				React.createElement(
					"title",
					null,
					this.state.locals.title
				)
			),
			React.createElement(
				"body",
				null,
				this.props.children,
				React.createElement("script", { type: "text/javascript", dangerouslySetInnerHTML: { __html: js } }),
				React.createElement("script", { type: "text/javascript", src: "/js/views/" + this.state.locals.template + ".js" })
			)
		);
	}
});

exports = module.exports = Layout;