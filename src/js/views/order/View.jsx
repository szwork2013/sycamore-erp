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
				</head>
				<body>
					<div className="row" style={{"background": "#0a1724" }}>
						<div className="large-1 columns">
							<img className="img-responsive" src="http://www.fusionfurnituresolutions.co.uk/images/logo.png" />
						</div>
					</div>
					<ActionsBar pageTitle={"Order"}>
						<a href={this.props.locals.applicationUrl + "order"} className="right fancy radius button tiny" style={{ "background": "lightgreen", "color": "green" }}>
							<i className="in-button-icon fa fa-fw fa-plus"></i> Save &amp; Agree
						</a>
					</ActionsBar>
					<div className="row">
						<div className="large-6 columns">
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
						</div>
						<div className="large-6 columns">
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
										<div className="table-cell"><label className="right">Total</label></div>
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