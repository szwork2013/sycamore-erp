var React = require("react");
var util = require("util");

var Layout = React.createClass({
	getInitialState: function() {
		var state = {};

		state.locals = this.props.locals;
		state.locals.title = this.props.title;

		return state;
	},
	render: function() {
		var locals = this.state.locals;
		var js = "var locals = " + JSON.stringify(locals);

		return (
			<html>
				<head>
					<meta charSet="utf-8" />
					<link rel="stylesheet" type="text/css" href="/css/styles.css" />
					<title>{this.state.locals.title}</title>
				</head>
				<body>
					{this.props.children}
					<script type="text/javascript" dangerouslySetInnerHTML={{__html: js}}></script>
					<script type="text/javascript" src={"/node_modules/sycamore-erp/public/js/views/" + this.state.locals.template + ".js"}></script>
				</body>
			</html>
		);
	}
});

exports = module.exports = Layout;