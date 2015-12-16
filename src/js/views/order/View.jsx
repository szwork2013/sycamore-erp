var React = require("react");
var ReactDOM = require("react-dom");
var ActionsBar = require("sycamore-platform-components").ActionsBar;

var View = React.createClass({
	render: function() {
		var locals = this.props.locals;
		var applicationUrl = locals.applicationUrl;
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
					<title>Order Confirmation</title>
				</head>
				<body style={{ "background": "#f0f0f0" }}>
					<div className="row" style={{"background": "#0a1724" }}>
						<div className="large-1 columns">
							<img className="img-responsive" src="http://www.fusionfurnituresolutions.co.uk/images/logo.png" />
						</div>
					</div>
					<div style={{ "background": "#fff" }}>
						<ActionsBar pageTitle={"Order Confirmation"}>
							<a href={this.props.locals.applicationUrl + "customer/" + customer._id + "/order/" + order._id + "/confirm"} className="right fancy radius button tiny" style={{ "background": "lightgreen", "color": "green" }}>
								<i className="in-button-icon fa fa-fw fa-check"></i> Agree
							</a>
						</ActionsBar>
					</div>
					<div className="row">
						<div className="large-6 columns">
							<fieldset style={{ "background": "#fff" }}>
								<label>Billing Details</label>
								<hr />
								<div className="row">
									<div className="large-4 columns">
										<label className="right">Name</label>
									</div>
									<div className="large-8 columns">
										{customer.name}
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right">Billing Address</label>
									</div>
									<div className="large-8 columns">
										<div className="row">
											<div className="large-12 columns">
												{billingAddress.line1}
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												{billingAddress.line2}
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												{billingAddress.line3}
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												{billingAddress.line4}
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												{billingAddress.postCode}
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right">Telephone</label>
									</div>
									<div className="large-8 columns">
										{customer.telephone}
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right">Email</label>
									</div>
									<div className="large-8 columns">
										{customer.email}
									</div>
								</div>
							</fieldset>
						</div>
						<div className="large-6 columns">
							<fieldset style={{ "background": "#fff" }}>
								<label>Delivery Details</label>
								<hr />
								<div className="row">
									<div className="large-4 columns">
										<label className="right">Delivery Address</label>
									</div>
									<div className="large-8 columns">
										<div className="row">
											<div className="large-12 columns">
												{deliveryAddress.line1}
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												{deliveryAddress.line2}
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												{deliveryAddress.line3}
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												{deliveryAddress.line4}
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												{deliveryAddress.postCode}
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right">Telephone</label>
									</div>
									<div className="large-8 columns">
										{delivery.telephone}
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right">Access Arrangements</label>
									</div>
									<div className="large-8 columns">
										{delivery.accessArrangements}
									</div>
								</div>
							</fieldset>
						</div>
					</div>
					<div className="row" style={{ "background": "#f0f0f0" }}>
						<div className="large-12 columns">
							<div className="table">
								<div className="table-header">
									<div className="table-row">
										<div className="table-cell large-6">
											Product
										</div>
										<div className="table-cell large-1 text-right">
											Item Price
										</div>
										<div className="table-cell large-1 text-center">
											Quantity
										</div>
										<div className="table-cell large-1 text-right">
											Sub Total
										</div>
										<div className="table-cell large-1 text-right">
											VAT
										</div>
										<div className="table-cell large-1 text-right">
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
													<div className="table-cell text-right">
														&pound;&nbsp;{product.product.price}
													</div>
													<div className="table-cell text-center">
														{product.quantity}
													</div>
													<div className="table-cell text-right">
														&pound;&nbsp;{product.subTotal}
													</div>
													<div className="table-cell text-right">
														&pound;&nbsp;{product.VAT}
													</div>
													<div className="table-cell text-right">
														&pound;&nbsp;{product.total}
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
										<div className="table-cell left-box">Sub Total</div>
										<div className="table-cell right-box text-right">&pound;&nbsp;{order.subTotal}</div>
									</div>
									<div className="table-row">
										<div className="table-cell">&#160;</div>
										<div className="table-cell">&#160;</div>
										<div className="table-cell">&#160;</div>
										<div className="table-cell">&#160;</div>
										<div className="table-cell left-box">VAT</div>
										<div className="table-cell right-box text-right">&pound;&nbsp;{order.VAT}</div>
									</div>
									<div className="table-row">
										<div className="table-cell">&#160;</div>
										<div className="table-cell">&#160;</div>
										<div className="table-cell">&#160;</div>
										<div className="table-cell">&#160;</div>
										<div className="table-cell left-box" style={{ "background": "lightblue", "color": "#02f" }}><strong>Total</strong></div>
										<div className="table-cell right-box text-right">&pound;&nbsp;{order.total}</div>
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