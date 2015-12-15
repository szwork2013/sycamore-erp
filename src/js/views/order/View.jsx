var React = require("react");

var View = React.createClass({
	render: function() {
		var order = this.props.locals.order;

		return (
			<html>
				<head>
				</head>
				<body>
					<h1>Order</h1>
					<pre>
						Name: {order.customer.name}
						Billing Address:
						{order.customer.billingAddress.line1}
						{order.customer.billingAddress.line2}
						{order.customer.billingAddress.line3}
						{order.customer.billingAddress.line4}
						{order.customer.billingAddress.postCode}
						{order.customer.billingAddress.telephone}
						{order.customer.billingAddress.email}
					</pre>
					<pre>
						Delivery Address:
						{order.property.address.line1}
						{order.property.address.line2}
						{order.property.address.line3}
						{order.property.address.line4}
						{order.property.address.postCode}
						{order.property.telephone}
						{order.property.accessArrangements}
					</pre>
					{order.products.map(function(product) {
						<pre>{product.name}</pre>
					})}
					<pre>
					SubTotal: {order.subTotal}
					VAT: {order.VAT}
					Total: {order.total}
					</pre>
				</body>
			</html>
		);
	}
});

if(process.browser) {
	ReactDOM.render(<View locals={locals} />, document);
}

exports = module.exports = View;