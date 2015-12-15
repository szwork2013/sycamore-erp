"use strict";

var React = require("react");

var View = React.createClass({
	displayName: "View",

	render: function render() {
		return React.createElement(
			"html",
			null,
			React.createElement("head", null),
			React.createElement(
				"body",
				null,
				React.createElement(
					"h1",
					null,
					"TEST"
				)
			)
		);
	}
});

if (process.browser) {
	ReactDOM.render(React.createElement(View, { locals: locals }), document);
}

exports = module.exports = View;