var React = require("react");
var ReactDOM = require("react-dom");
var ActionsBar = require("sycamore-platform-components").ActionsBar;

var moment = require("moment");

var View = React.createClass({
	renderAgreeButton: function() {
		var locals = this.props.locals;
		var applicationUrl = locals.applicationUrl,
			order = locals.order;
/*
		var	customer = order.customer,
			orderStatus = order.status;
			
		if ((typeof order.customer != "undefined") && (order.customer != null)) {
			customer = order.customer;
		}
*/
		if(order.status != "Accepted") {
			return (
				<a href={this.props.locals.applicationUrl + "customer/a/order/" + order._id + "/confirm"} className="right fancy radius button tiny" style={{ "background": "lightgreen", "color": "green" }}>
					<i className="in-button-icon fa fa-fw fa-check"></i> Agree
				</a>
			);
		}
	},
	render: function() {
		var locals = this.props.locals;
		var applicationUrl = locals.applicationUrl;
		var order = locals.order; /*,
			customer = {},
			billingAddress = {},
			delivery = {},
			deliveryAddress = {}; */
		var	orderStatus = order.status;
		var pageTitle;

		if(orderStatus == "Accepted") {
			pageTitle = "Order";
		} else {
			pageTitle = "Order Confirmation";
		}
/*
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
*/
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
					<title>{pageTitle}</title>
				</head>
				<body style={{ "background": "#f0f0f0" }}>
					<div className="row" style={{"background": "#0a1724" }}>
						<div className="large-1 columns">
							<img className="img-responsive" src="http://www.fusionfurnituresolutions.co.uk/images/logo.png" />
						</div>
					</div>
					<div style={{ "background": "#fff" }}>
						<ActionsBar pageTitle={pageTitle}>
							{this.renderAgreeButton()}
						</ActionsBar>
					</div>
					<div className="row">
						<div className="large-8 large-offset-2 columns end">
							<fieldset style={{ "background": "#fff" }}>
								<div className="row">
									<div className="large-12 columns">
										<label><input type="checkbox" /> I confirm that the quantities, colours, options and all items of furniture are correct on this order.</label>
									</div>
								</div>
								<div className="row">
									<div className="large-12 columns">
										<label><input type="checkbox" /> I confirm that my property will be in a condition where it is ready for the furniture to be installed on the delivery date.</label>
									</div>
								</div>
								<div className="row">
									<div className="large-12 columns">
										<label><input type="checkbox" /> I agree to give 48 hours notice in the event that I need to change the delivery date.</label>
									</div>
								</div>
								<div className="row">
									<div className="large-12 columns">
										<label><input type="checkbox" /> I acknowledge that agreeing to this order will result in me/my company being under obligation to pay for this order in full prior to installation.</label>
									</div>
								</div>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="large-6 columns">
							<fieldset style={{ "background": "#fff" }}>
								<div className="row">
									<div className="large-4 columns">
										<label className="right">Order Status</label>
									</div>
									<div className="large-8 columns">
										{order.status}
									</div>
								</div>
							</fieldset>
						</div>
						<div className="large-6 columns">
							<fieldset style={{ "background": "#fff" }}>
								<div className="row">
									<div className="large-4 columns">
										<label className="right">Delivery Date</label>
									</div>
									<div className="large-8 columns">
										{moment(order.delivery.date).format("DD/MM/YYYY")}
									</div>
								</div>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="large-6 columns">
							<fieldset style={{ "background": "#fff" }}>
								<label>Billing Details</label>
								<hr />
								<div className="row">
									<div className="large-4 columns">
										<label className="right">Customer Name</label>
									</div>
									<div className="large-8 columns">
										{order.billing.customerName}
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right">Company Name</label>
									</div>
									<div className="large-8 columns">
										{order.billing.companyName}
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right">Billing Address</label>
									</div>
									<div className="large-8 columns">
										<div className="row">
											<div className="large-12 columns">
												{order.billing.address.line1}
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												{order.billing.address.line2}
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												{order.billing.address.line3}
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												{order.billing.address.line4}
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												{order.billing.address.postCode}
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right">Telephone</label>
									</div>
									<div className="large-8 columns">
										{order.billing.telephone}
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right">Email</label>
									</div>
									<div className="large-8 columns">
										{order.billing.email}
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
												{order.delivery.address.line1}
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												{order.delivery.address.line2}
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												{order.delivery.address.line3}
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												{order.delivery.address.line4}
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												{order.delivery.address.postCode}
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right">Telephone</label>
									</div>
									<div className="large-8 columns">
										{order.delivery.telephone}
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right">Access Arrangements</label>
									</div>
									<div className="large-8 columns">
										{order.delivery.accessArrangements}
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
										<div className="table-cell large-10">
											Product
										</div>
										<div className="table-cell large-1">&nbsp;</div>
										<div className="table-cell large-1">&nbsp;</div>
									</div>
								</div>
								<div className="table-body">
									{
										order.products.map(function(product, productIndex) {
											return (
												<div className="table-row" key={productIndex}>
													<div className="table-cell">
														{product.name}
													</div>
													<div className="table-cell">&nbsp;</div>
													<div className="table-cell">&nbsp;</div>
												</div>
											);
										}, this)
									}
								</div>
								<div className="table-footer">
									<div className="table-row">
										<div className="table-cell">&#160;</div>
										<div className="table-cell left-box">Sub Total</div>
										<div className="table-cell right-box text-right">&pound;&nbsp;{order.subTotal}</div>
									</div>
									<div className="table-row">
										<div className="table-cell">&#160;</div>
										<div className="table-cell left-box">VAT</div>
										<div className="table-cell right-box text-right">&pound;&nbsp;{order.VAT}</div>
									</div>
									<div className="table-row">
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