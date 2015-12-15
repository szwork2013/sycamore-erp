var React = require("react");

var View = React.createClass({
	render: function() {
		var order = this.props.locals.order,
			customer = {},
			billingAddress = {},
			delivery = {},
			deliveryAddress = {};

		if(typeof order.customer != "undefined") {
			customer = order.customer;
			if(typeof customer.billingAddress != "undefined") {
				billingAddress = customer.billingAddress;
			}
		}

		if(typeof order.property != "undefined") {
			delivery = order.property;
			if(typeof delivery.address != "undefined") {
				deliveryAddress = delivery.address;
			}
		}

		return (
			<html>
				<head>
				</head>
				<body>
					<h1>Order</h1>
					<pre>
						Name: {customer.name}
						Billing Address:
						{billingAddress.line1}
						{billingAddress.line2}
						{billingAddress.line3}
						{billingAddress.line4}
						{billingAddress.postCode}
						{customer.telephone}
						{customer.email}
					</pre>
					<pre>
						Delivery Address:
						{deliveryAddress.line1}
						{deliveryAddress.line2}
						{deliveryAddress.line3}
						{deliveryAddress.line4}
						{deliveryAddress.postCode}
						{delivery.telephone}
						{delivery.accessArrangements}
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