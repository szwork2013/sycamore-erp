var domain = require("domain");
var React = require("react");
var ReactDOM = require("react-dom");
var Layout = require("sycamore-platform-components").Layout;
var ActionsBar = require("sycamore-platform-components").ActionsBar;
var ReactTabs = require("react-tabs");
var DatePicker = require("react-datepicker");
var Select = require("react-select");

var moment = require("moment");
var numbro = require("numbro");

//numbro.culture('en-GB');

var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

Tabs.setUseDefaultStyles(false);

var Order = require("../../components/Order");
var OrderStore = require("../../stores/OrderStore");
var OrderActions = require("../../actions/OrderActions");

var Api = require("../../services/Api");

var statusOptions = [
	{ value: "Draft", label: "Draft" },
	{ value: "Unaccepted", label: "Unaccepted" },
	{ value: "Accepted", label: "Accepted" }
];

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
			order: OrderStore.getState()
		};
	},
	handleSaveClick: function(e) {
		e.preventDefault();
		var order = OrderStore.getState();
		var applicationUrl = this.props.locals.applicationUrl;

		if(	(typeof(order._id) != "undefined") &&
			(order._id != null) ) {
// POST
			var orderId = order._id;
			Api.postOrder(
				orderId,
				order,
				function(response) {
					window.location.href = applicationUrl + "order/" + orderId;
				}
			);
		} else {
// PUT
			Api.putOrder(
				order,
				function(response) {
					var orderId = response.body._id;
					window.location.href = applicationUrl + "order/" + orderId;
				}
			);
		}
	},
	renderAddProductButton: function() {
		if(this.state.order.status != "Accepted") {
			return (<a className="button tiny radius fancy" onClick={OrderActions.addProductToOrder}>Add Product</a>);
		}
	},
	renderSaveButton: function() {
		var buttonAction;

		if((typeof this.props.locals != "undefined") && (typeof this.props.locals.order != "undefined") && (this.props.locals.order != null) && (typeof this.props.locals.order._id != "undefined")) {
			buttonAction = "Save";
		} else {
			buttonAction = "Create";
		}

		return (
			<input className="right fancy radius button tiny" type="submit" value={buttonAction} />
		);
	},
	renderDraftButton: function() {
		return (
			<a className="right fancy radius button tiny" href="#" onClick={OrderActions.setStatus.bind(this, "Draft")}>
				Make Draft
			</a>
		);	
	},
	renderEmailButton: function() {
		var orderId;

		if((typeof this.props.locals != "undefined") && (typeof this.props.locals.order != "undefined") && (this.props.locals.order != null) && (typeof this.props.locals.order._id != "undefined")) {
			return (
				<a className="right fancy radius button tiny" href={"/sycamore-erp/order/" + this.props.locals.order._id + "/email"}>
					Email Order
				</a>
			);
		}
	},
	renderButtons: function() {
		if(this.state.order.status != "Accepted") {
			return (
				<div>
					{this.renderSaveButton()}
					{this.renderEmailButton()}
				</div>
			);
		} else {
			return (
				<div>
					{this.renderDraftButton()}
				</div>
			);
		}
	},
	renderDateAccepted: function() {
		if(this.state.order.dateAccepted != null) {
			return (
				<div className="row">
					<div className="large-4 columns">
						<label className="right inline">Date Accepted</label>
					</div>
					<div className="large-8 columns">
						<label className="left inline">{moment(this.state.order.dateAccepted).format("DD/MM/YYYY")}</label>
					</div>
				</div>
			);
		}
	},
	render: function() {
		var buttonAction,
			pageTitle,
			order,
			editable;

		if(this.state.order.status == "Accepted") {
			editable = false;
		} else {
			editable = true;
		}

		if(typeof(this.props.locals.order) != "undefined") {
			order = this.props.locals.order;
		}

		if((order != null) && (typeof(order._id) != "undefined")) {
			pageTitle = "Edit order";
		} else {
			pageTitle = "New order";
		}

		return (
			<Layout pageTitle={pageTitle} locals={this.props.locals}>
				<form action="#" onSubmit={this.handleSaveClick}>
					<ActionsBar pageTitle={pageTitle}>
						{this.renderButtons()}
					</ActionsBar>
					<Tabs>
						<TabList>
							<Tab>Order</Tab>
						</TabList>
						<TabPanel>
							<div className="row">
								<div className="large-6 columns">
									<fieldset>
										<div className="row">
											<div className="large-4 columns">
												<label className="right inline">Order Status</label>
											</div>
											<div className="large-8 columns">
												<label className="left inline">{this.state.order.status}</label>
											</div>
										</div>
										{this.renderDateAccepted()}
									</fieldset>
								</div>
								<div className="large-6 columns">
									<fieldset>
										<div className="row">
											<div className="large-4 columns">
												<label className="right inline">Delivery Date</label>
											</div>
											<div className="large-3 columns end">
												<DatePicker disabled={!editable}
															dateFormat="DD/MM/YYYY"
															selected={moment(this.state.order.delivery.date)}
															onChange={OrderActions.setDeliveryDate} />
											</div>
										</div>
									</fieldset>
								</div>
							</div>
							<div className="row">
								<div className="large-6 columns">
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline">Customer Name</label>
										</div>
										<div className="large-8 columns">
											<input disabled={!editable}
												   onChange={OrderActions.updateBillingCustomerName}
												   type="text"
												   required={true}
												   value={this.state.order.billing.customerName} />
										</div>
									</div>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline">Company Name</label>
										</div>
										<div className="large-8 columns">
											<input disabled={!editable}
												   onChange={OrderActions.updateBillingCompanyName}
												   type="text"
												   value={this.state.order.billing.companyName} />
										</div>
									</div>
									<fieldset>
										<label>Billing Address</label>
										<div className="row">
											<div className="large-4 columns">
												<label className="right inline">Line 1</label>
											</div>
											<div className="large-8 columns">
												<input disabled={!editable}
												   	   onChange={OrderActions.updateBillingAddressLine1}
													   type="text"
													   value={this.state.order.billing.address.line1} />
											</div>
										</div>
										<div className="row">
											<div className="large-4 columns">
												<label className="right inline">Line 2</label>
											</div>
											<div className="large-8 columns">
												<input disabled={!editable}
												       onChange={OrderActions.updateBillingAddressLine2}
													   type="text"
													   value={this.state.order.billing.address.line2} />
											</div>
										</div>
										<div className="row">
											<div className="large-4 columns">
												<label className="right inline">Line 3</label>
											</div>
											<div className="large-8 columns">
												<input disabled={!editable}
													   onChange={OrderActions.updateBillingAddressLine3}
													   type="text"
													   value={this.state.order.billing.address.line3} />
											</div>
										</div>
										<div className="row">
											<div className="large-4 columns">
												<label className="right inline">Line 4</label>
											</div>
											<div className="large-8 columns">
												<input disabled={!editable}
													   onChange={OrderActions.updateBillingAddressLine4}
													   type="text"
													   value={this.state.order.billing.address.line4} />
											</div>
										</div>
										<div className="row">
											<div className="large-4 columns">
												<label className="right inline">PostCode</label>
											</div>
											<div className="large-8 columns">
												<input disabled={!editable}
													   onChange={OrderActions.updateBillingAddressPostCode}
													   type="text"
													   value={this.state.order.billing.address.postCode} />
											</div>
										</div>
									</fieldset>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline">Telephone</label>
										</div>
										<div className="large-8 columns">
											<input disabled={!editable}
												   onChange={OrderActions.updateBillingTelephone}
												   type="text"
												   value={this.state.order.billing.telephone} />
										</div>
									</div>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline">Email</label>
										</div>
										<div className="large-8 columns">
											<input disabled={!editable}
												   onChange={OrderActions.updateBillingEmail}
												   type="email"
												   required={true}
												   value={this.state.order.billing.email} />
										</div>
									</div>
								</div>
								<div className="large-6 columns">
									<fieldset>
										<label>Delivery Address</label>
										<div className="row">
											<div className="large-4 columns">
												<label className="right inline">Line 1</label>
											</div>
											<div className="large-8 columns">
												<input disabled={!editable}
													   onChange={OrderActions.updateDeliveryAddressLine1}
													   type="text"
													   value={this.state.order.delivery.address.line1} />
											</div>
										</div>
										<div className="row">
											<div className="large-4 columns">
												<label className="right inline">Line 2</label>
											</div>
											<div className="large-8 columns">
												<input disabled={!editable}
													   onChange={OrderActions.updateDeliveryAddressLine2}
													   type="text"
													   value={this.state.order.delivery.address.line2} />
											</div>
										</div>
										<div className="row">
											<div className="large-4 columns">
												<label className="right inline">Line 3</label>
											</div>
											<div className="large-8 columns">
												<input disabled={!editable}
													   onChange={OrderActions.updateDeliveryAddressLine3}
													   type="text"
													   value={this.state.order.delivery.address.line3} />
											</div>
										</div>
										<div className="row">
											<div className="large-4 columns">
												<label className="right inline">Line 4</label>
											</div>
											<div className="large-8 columns">
												<input disabled={!editable}
													   onChange={OrderActions.updateDeliveryAddressLine4}
													   type="text"
													   value={this.state.order.delivery.address.line4} />
											</div>
										</div>
										<div className="row">
											<div className="large-4 columns">
												<label className="right inline">Post Code</label>
											</div>
											<div className="large-8 columns">
												<input disabled={!editable}
													   onChange={OrderActions.updateDeliveryAddressPostCode}
													   type="text"
													   value={this.state.order.delivery.address.postCode} />
											</div>
										</div>
									</fieldset>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline">Access Arrangements</label>
										</div>
										<div className="large-8 columns">
											<textarea disabled={!editable}
													  onChange={OrderActions.updateDeliveryAccessArrangements}
													  value={this.state.order.delivery.accessArrangements}>
											</textarea>
										</div>
									</div>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline">Access Telephone</label>
										</div>
										<div className="large-8 columns">
											<input disabled={!editable}
												   onChange={OrderActions.updateDeliveryTelephone}
												   type="text"
												   value={this.state.order.delivery.telephone} />
										</div>
									</div>
								</div>
							</div>

							<div className="row">
								<div className="large-12 columns">
									<div className="row">
										<div className="large-12 columns">
											{this.renderAddProductButton()}
										</div>
									</div>
								</div>
							</div>

							<div className="row">
								<div className="large-12 columns">
									<div className="table">
										<div className="table-header">
											<div className="table-row">
												<div className="table-cell large-9">
													Product
												</div>
												<div className="table-cell large-1">&nbsp;</div>
												<div className="table-cell large-2">&nbsp;</div>
											</div>
										</div>
										<div className="table-body">
											{
												this.state.order.products.map(function(product, productIndex) {
													return (
														<div className="table-row" key={productIndex}>
															<div className="table-cell" style={{ "padding": 0 }}>
																<input disabled={!editable} onChange={OrderActions.setProductName.bind(this, productIndex)} type="text" value={product.name} style={{ "margin": 0 }} />
															</div>
															<div className="table-cell large-1">&nbsp;</div>
															<div className="table-cell large-1">&nbsp;</div>
														</div>
													);
												}, this)
											}
										</div>
										<div className="table-footer">
											<div className="table-row">
												<div className="table-cell">&#160;</div>
												<div className="table-cell left-box">Sub Total</div>
												<div className="table-cell text-right right-box" style={{ "padding": 0 }}>
													<div className="row collapse">
														<div className="large-3 columns">
															<span className="prefix">&pound;</span>
														</div>
														<div className="large-9 columns">
															<input disabled={!editable}
																   className="subTotal text-right"
																   type="number"
																   onChange={OrderActions.setSubTotal}
																   value={this.state.order.subTotal}
																   style={{ "margin": 0 }}
																   step="0.01" />
														</div>
													</div>
												</div>
											</div>
											<div className="table-row">
												<div className="table-cell">&#160;</div>
												<div className="table-cell left-box">VAT</div>
												<div className="table-cell text-right right-box" style={{ "padding": 0 }}>
													<div className="row collapse">
														<div className="large-3 columns">
															<span className="prefix">&pound;</span>
														</div>
														<div className="large-9 columns">
															<span  className="text-right"
																   style={{
																			"margin": 0,
																			"-webkit-appearance": "none",
																			"-webkit-border-radius": "0px",
																			"background-color": "#FFFFFF",
																			"font-family": "inherit",
																			"border-style": "solid",
																			"border-width": "1px",
																			"border-color": "#cccccc",
																			"box-shadow": "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
																			"color": "rgba(0, 0, 0, 0.75)",
																			"display": "block",
																			"font-size": "0.875rem",
																			"padding": "0.5rem",
																			"height": "2.3125rem",
																			"width": "100%",
																			"-webkit-box-sizing": "border-box",
																			"-moz-box-sizing": "border-box",
																			"box-sizing": "border-box",
																			"transition": "box-shadow 0.45s, border-color 0.45s ease-in-out"
																    }}>
																{numbro(this.state.order.VAT).format("0.00")}
															</span>
														</div>
													</div>
												</div>
											</div>
											<div className="table-row">
												<div className="table-cell">&#160;</div>
												<div className="table-cell left-box"><strong>Total</strong></div>
												<div className="table-cell text-right right-box" style={{ "padding": 0 }}>
													<div className="row collapse">
														<div className="large-3 columns">
															<span className="prefix">&pound;</span>
														</div>
														<div className="large-9 columns">
															<span  className="text-right"
																   style={{
																			"margin": 0,
																			"-webkit-appearance": "none",
																			"-webkit-border-radius": "0px",
																			"background-color": "#FFFFFF",
																			"font-family": "inherit",
																			"border-style": "solid",
																			"border-width": "1px",
																			"border-color": "#cccccc",
																			"box-shadow": "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
																			"color": "rgba(0, 0, 0, 0.75)",
																			"display": "block",
																			"font-size": "0.875rem",
																			"padding": "0.5rem",
																			"height": "2.3125rem",
																			"width": "100%",
																			"-webkit-box-sizing": "border-box",
																			"-moz-box-sizing": "border-box",
																			"box-sizing": "border-box",
																			"transition": "box-shadow 0.45s, border-color 0.45s ease-in-out"
																    }}>
																{numbro(this.state.order.total).format("0.00")}
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</TabPanel>
					</Tabs>
				</form>
			</Layout>
		);
	}
});

if(process.browser) {
	ReactDOM.render(<View locals={locals} />, document);
}

exports = module.exports = View;