var React = require("react");

var View = React.createClass({
	render: function() {
		return (
			<html>
				<head>
				</head>
				<body>
					<h1>TEST</h1>
				</body>
			</html>
		);
	}
});

if(process.browser) {
	ReactDOM.render(<View locals={locals} />, document);
}

exports = module.exports = View;