var React = require("react");
var ActionsBar = require("sycamore-platform-components").ActionsBar;

var View = React.createClass({
	render: function() {
		var locals = this.props.locals;
		var order = locals.order,
			customer = {},
			billingAddress = {},
			delivery = {},
			deliveryAddress = {};

		if ((typeof order.customer != "undefined") && (order.customer != null)) {
			customer = order.customer;
			if ((typeof customer.billingAddress != "undefined") && (customer.billingAddress != null)) {
				billingAddress = customer.billingAddress;
			}
		}

		if ((typeof order.property != "undefined") && (order.property != null)) {
			delivery = order.property;
			if ((typeof delivery.address != "undefined") && (delivery.address != null)) {
				deliveryAddress = delivery.address;
			}
		}

		var js = "var locals = JSON.parse('" + JSON.stringify(locals) + "');";
		var jsTemplate = "";
		if(applicationUrl == "/") {
			jsTemplate = "/js/views/" + locals.template + ".js";
		} else {
			jsTemplate = "/node_modules" + applicationUrl + "public/js/views/" + locals.template + ".js";
		}

		return (
			<html>
				<head>
					<meta charSet="utf-8" />
					<link rel="stylesheet" type="text/css" href="/css/styles.css" />
				</head>
				<body>
					<ActionsBar pageTitle={"Order"}>
						<a href={this.props.locals.applicationUrl + "order"} className="right fancy radius button tiny">
							<i className="in-button-icon fa fa-fw fa-plus"></i> Save &amp; Agree
						</a>
					</ActionsBar>
					<div class="row">
						<div class="large-6 columns">
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
						</div>
						<div class="large-6 columns">
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
						</div>
					</div>
					<div className="row">
						<div className="large-12 columns">
							<div className="table">
								<div className="table-header">
									<div className="table-row">
										<div className="table-cell large-6">
											Product
										</div>
										<div className="table-cell large-1">
											Item Price
										</div>
										<div className="table-cell large-1">
											Quantity
										</div>
										<div className="table-cell large-1">
											Sub Total
										</div>
										<div className="table-cell large-1">
											VAT
										</div>
										<div className="table-cell large-1">
											Total
										</div>
									</div>
								</div>
								<div className="table-body">
									{
										order.products.map(function(product, productIndex) {
											return (
												<div className="table-row" key={productIndex}>
													<div className="table-cell">
														{product.product.name}
													</div>
													<div className="table-cell">
														{product.product.price}
													</div>
													<div className="table-cell">
														{product.quantity}
													</div>
													<div className="table-cell">
														{product.subTotal}
													</div>
													<div className="table-cell">
														{product.VAT}
													</div>
													<div className="table-cell">
														{product.total}
													</div>
												</div>
											);
										}, this)
									}
								</div>
								<div className="table-footer">
									<div className="table-row">
										<div className="table-cell">&#160;</div>
										<div className="table-cell">&#160;</div>
										<div className="table-cell">&#160;</div>
										<div className="table-cell">&#160;</div>
										<div className="table-cell">Sub Total</div>
										<div className="table-cell">{order.subTotal}</div>
									</div>
									<div className="table-row">
										<div className="table-cell">&#160;</div>
										<div className="table-cell">&#160;</div>
										<div className="table-cell">&#160;</div>
										<div className="table-cell">&#160;</div>
										<div className="table-cell">VAT</div>
										<div className="table-cell">{order.VAT}</div>
									</div>
									<div className="table-row">
										<div className="table-cell">&#160;</div>
										<div className="table-cell">&#160;</div>
										<div className="table-cell">&#160;</div>
										<div className="table-cell">&#160;</div>
										<div className="table-cell"><strong>Total</strong></div>
										<div className="table-cell">{order.total}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<script type="text/javascript" dangerouslySetInnerHTML={{__html: js}}></script>
					<script type="text/javascript" src={jsTemplate}></script>
				</body>
			</html>
		);
	}
});

if(process.browser) {
	ReactDOM.render(<View locals={locals} />, document);
}

exports = module.exports = View;