var React = require("react");
var ReactDOM = require("react-dom");
var ActionsBar = require("sycamore-platform-components").ActionsBar;

var OrderStore = require("../../stores/OrderStore");
var OrderActions = require("../../actions/OrderActions");

var Api = require("../../services/Api");

var moment = require("moment");

var View = React.createClass({
	_onChange: function() {
		this.setState({
			order: OrderStore.getState()
		});
	},
	componentDidMount: function() {
		OrderStore.addChangeListener(this._onChange);
		if((typeof this.props.locals != "undefined") && (typeof this.props.locals.order != "undefined")) {
			OrderStore.loadData(this.props.locals.order);
		}
	},
	componentWillUnmount: function() {
		OrderStore.removeChangeListener(this._onChange);
	},
	getInitialState: function() {
		return {
			order: OrderStore.getState(),
			editable: false
		};
	},
	handleEditClick: function() {
		this.setState({ editable: true });
	},
	renderEditButton: function() {
		if(this.state.editable == false && this.state.order.status != "Accepted") {
			return (
				<a className="right fancy radius button tiny" href="#" onClick={this.handleEditClick} style={{ "background": "lightgreen", "color": "green" }}>
					<i className="in-button-icon fa fa-fw fa-pencil-square-o"></i> Edit
				</a>
			);
		}
	},
	renderSaveButton: function() {
		if(this.state.editable == true && this.state.order.status != "Accepted") {
			return (
				<a className="right fancy radius button tiny" href="#" onClick={OrderActions.saveOrder.bind(this, this.state.order)} style={{ "background": "lightgreen", "color": "green" }}>
					<i className="in-button-icon fa fa-fw fa-floppy-o"></i> Save
				</a>
			);			
		}
	},
	handleAgreeClick: function() {
		var applicationUrl = this.props.locals.applicationUrl;
		var order = OrderStore.getState();
		var orderId = order._id;

		Api.postOrder(
			orderId,
			order,
			function(response) {
				window.location.href = applicationUrl + "customer/a/order/" + orderId + "/confirm";
			}
		);
	},
	renderAgreeButton: function() {
		var locals = this.props.locals;
		var applicationUrl = locals.applicationUrl,
			order = locals.order;

		if(order.status != "Accepted") {
			if(this.state.order.terms.orderCorrectAgreed && this.state.order.terms.propertyTidyAgreed && this.state.order.terms.noticeAgreed && this.state.order.terms.paymentAgreed) {
				return (
					<a href="#" className="right fancy radius button tiny" style={{ "background": "lightgreen", "color": "green" }} onClick={this.handleAgreeClick}>
						<i className="in-button-icon fa fa-fw fa-check"></i> Agree
					</a>
				);
			} else {
				return (
					<a href="#" className="right fancy radius button tiny" disabled={true} style={{ "background": "lightcoral", "color": "red" }}>
						<i className="in-button-icon fa fa-fw fa-check"></i> Agree
					</a>
				);
			}
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

		var agreeText = "";

		if(orderStatus == "Accepted") {
			pageTitle = "Order";
			agreeText = "This order has been agreed. Thank you.";
		} else {
			pageTitle = "Order Confirmation";
			agreeText = "Please click the Agree button to confirm and agree your order.";
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
							{this.renderEditButton()}
							{this.renderSaveButton()}
						</ActionsBar>
					</div>
					<div className="row">
						<div className="large-12 columns">
							<p><br /><strong>Instructions</strong></p>
							<p>Please check over this order and fill in any details that are missing by clicking the "Edit" button in the top right corner and then the "Save" button to save your changes.</p>
							<p>Please confirm that the details of the products are correct and then tick the boxes at the bottom of this page.</p>
							<p>Finally, to confirm and Agree to this order please click the "Agree" button at the bottom right of this page.</p>
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
										<label className="right inline">Customer Name</label>
									</div>
									<div className="large-8 columns">
										<input disabled={!this.state.editable} type="text" value={this.state.order.billing.customerName} onChange={OrderActions.updateBillingCustomerName} />
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline">Company Name</label>
									</div>
									<div className="large-8 columns">
										<input disabled={!this.state.editable} type="text" value={order.billing.companyName} onChange={OrderActions.updateBillingCompanyName} />
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline">Billing Address</label>
									</div>
									<div className="large-8 columns">
										<div className="row">
											<div className="large-12 columns">
												<input disabled={!this.state.editable} type="text" value={order.billing.address.line1} onChange={OrderActions.updateBillingAddressLine1} />
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												<input disabled={!this.state.editable} type="text" value={order.billing.address.line2} onChange={OrderActions.updateBillingAddressLine2} />
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												<input disabled={!this.state.editable} type="text" value={order.billing.address.line3} onChange={OrderActions.updateBillingAddressLine3} />
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												<input disabled={!this.state.editable} type="text" value={order.billing.address.line4} onChange={OrderActions.updateBillingAddressLine4} />
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												<input disabled={!this.state.editable} type="text" value={order.billing.address.postCode} onChange={OrderActions.updateBillingAddressPostCode} />
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline">Telephone</label>
									</div>
									<div className="large-8 columns">
										<input disabled={!this.state.editable} type="text" value={order.billing.telephone} onChange={OrderActions.updateBillingTelephone} />
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline">Email</label>
									</div>
									<div className="large-8 columns">
										<input disabled={!this.state.editable} type="text" value={order.billing.email} onChange={OrderActions.updateBillingEmail} />
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
										<label className="right inline">Delivery Address</label>
									</div>
									<div className="large-8 columns">
										<div className="row">
											<div className="large-12 columns">
												<input disabled={!this.state.editable} type="text" value={order.delivery.address.line1} onChange={OrderActions.updateDeliveryAddressLine1} />
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												<input disabled={!this.state.editable} type="text" value={order.delivery.address.line2} onChange={OrderActions.updateDeliveryAddressLine2} />
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												<input disabled={!this.state.editable} type="text" value={order.delivery.address.line3} onChange={OrderActions.updateDeliveryAddressLine3} />
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												<input disabled={!this.state.editable} type="text" value={order.delivery.address.line4} onChange={OrderActions.updateDeliveryAddressLine4} />
											</div>
										</div>
										<div className="row">
											<div className="large-12 columns">
												<input disabled={!this.state.editable} type="text" value={order.delivery.address.postCode} onChange={OrderActions.updateDeliveryAddressPostCode} />
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline">Telephone</label>
									</div>
									<div className="large-8 columns">
										<input disabled={!this.state.editable} type="text" value={order.delivery.telephone} onChange={OrderActions.updateDeliveryTelephone} />
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline">Access Arrangements</label>
									</div>
									<div className="large-8 columns">
										<textarea disabled={!this.state.editable} value={order.delivery.accessArrangements} onChange={OrderActions.updateDeliveryAccessArrangements}></textarea>
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
					<div className="row">
						<div className="large-8 large-offset-2 columns end">
							<fieldset style={{ "background": "#fff" }}>
								<div className="row">
									<div className="large-12 columns">
										<label><input disabled={this.state.order.terms.orderCorrectAgreed} type="checkbox" checked={this.state.order.terms.orderCorrectAgreed} onChange={OrderActions.setOrderCorrect} /> I confirm that the quantities, colours, options and all items of furniture are correct on this order.</label>
									</div>
								</div>
								<div className="row">
									<div className="large-12 columns">
										<label><input disabled={this.state.order.terms.propertyTidyAgreed} type="checkbox" checked={this.state.order.terms.propertyTidyAgreed} onChange={OrderActions.setPropertyTidy} /> I confirm that my property will be in a condition where it is ready for the furniture to be installed on the delivery date.</label>
									</div>
								</div>
								<div className="row">
									<div className="large-12 columns">
										<label><input disabled={this.state.order.terms.noticeAgreed} type="checkbox" checked={this.state.order.terms.noticeAgreed} onChange={OrderActions.setNoticeAgreed} /> I agree to give 48 hours notice in the event that I need to change the delivery date.</label>
									</div>
								</div>
								<div className="row">
									<div className="large-12 columns">
										<label><input disabled={this.state.order.terms.paymentAgreed} type="checkbox" checked={this.state.order.terms.paymentAgreed} onChange={OrderActions.setPaymentAgreed} /> I acknowledge that agreeing to this order will result in me/my company being under obligation to pay for this order in full prior to installation.</label>
									</div>
								</div>
							</fieldset>
						</div>
					</div>
					<div style={{ "background": "#fff" }}>
						<ActionsBar pageTitle={agreeText}>
							{this.renderAgreeButton()}
						</ActionsBar>
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