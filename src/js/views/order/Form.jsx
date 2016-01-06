var domain = require("domain");
var React = require("react");
var ReactDOM = require("react-dom");
var Layout = require("sycamore-platform-components").Layout;
var ActionsBar = require("sycamore-platform-components").ActionsBar;
var ReactTabs = require("react-tabs");
var DatePicker = require("react-datepicker");
var Select = require("react-select");

var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

Tabs.setUseDefaultStyles(false);

var Order = require("../../components/Order");
var OrderStore = require("../../stores/OrderStore");
var OrderActions = require("../../actions/OrderActions");

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
		OrderStore.loadData(this.props.order);
	},
	componentWillUnount: function() {
		OrderStore.removeChangeListener(this._onChange);
	},
	getInitialState: function() {
		return {
			order: OrderStore.getState()
		};
	},
	handleSaveClick: function() {
		var d = domain.create();

		d.on("error", function(error) {
			console.log(error);
		});

		d.run(function() {
			OrderStore.getOrder(d.intercept(function(order) {
				OrderActions.saveOrder(order);
			}));
		});
	},
	renderSaveButton: function() {
		var buttonAction;

		if((typeof this.props.locals != "undefined") && (typeof this.props.locals.order != "undefined") && (this.props.locals.order != null) && (typeof this.props.locals.order._id != "undefined")) {
			buttonAction = "Save";
		} else {
			buttonAction = "Create";
		}

		return (
			<a className="right fancy radius button tiny" href="#" onClick={this.handleSaveClick}>
				{buttonAction}
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
		return (
			<div>
				{this.renderSaveButton()}
				{this.renderEmailButton()}
			</div>
		);
	},
	render: function() {
		var buttonAction,
			pageTitle,
			order;

		if(typeof(this.props.locals.order) != "undefined") {
			order = this.props.locals.order;
		}

		if((order != null) && (typeof(order._id) != "undefined")) {
			pageTitle = "Edit order";
			buttonAction = "Save";
		} else {
			pageTitle = "New order";
			buttonAction = "Create";
		}

		return (
			<Layout pageTitle={pageTitle} locals={this.props.locals}>
				<ActionsBar pageTitle={pageTitle}>
					{this.renderButtons()}
				</ActionsBar>
				<Tabs>
					<TabList>
						<Tab>Order</Tab>
						<Tab>Emails</Tab>
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
											<Select
												options={statusOptions}
												onChange={OrderActions.setStatus}
												value={this.state.order.status} />
										</div>
									</div>
								</fieldset>
							</div>
							<div className="large-6 columns">
								<fieldset>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline">Delivery Date</label>
										</div>
										<div className="large-3 columns end">
											<DatePicker
												dateFormat="DD/MM/YYYY"
												selected={this.state.order.delivery.date}
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
										<input onChange={OrderActions.updateBillingCustomerName}
											   type="text"
											   value={this.state.order.billing.customerName} />
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline">Company Name</label>
									</div>
									<div className="large-8 columns">
										<input onChange={OrderActions.updateBillingCompanyName}
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
											<input onChange={OrderActions.updateBillingAddressLine1}
												   type="text"
												   value={this.state.order.billing.address.line1} />
										</div>
									</div>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline">Line 2</label>
										</div>
										<div className="large-8 columns">
											<input onChange={OrderActions.updateBillingAddressLine2}
												   type="text"
												   value={this.state.order.billing.address.line2} />
										</div>
									</div>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline">Line 3</label>
										</div>
										<div className="large-8 columns">
											<input onChange={OrderActions.updateBillingAddressLine3}
												   type="text"
												   value={this.state.order.billing.address.line3} />
										</div>
									</div>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline">Line 4</label>
										</div>
										<div className="large-8 columns">
											<input onChange={OrderActions.updateBillingAddressLine4}
												   type="text"
												   value={this.state.order.billing.address.line4} />
										</div>
									</div>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline">PostCode</label>
										</div>
										<div className="large-8 columns">
											<input onChange={OrderActions.updateBillingAddressPostCode}
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
										<input onChange={OrderActions.updateBillingTelephone}
											   type="text"
											   value={this.state.order.billing.telephone} />
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline">Email</label>
									</div>
									<div className="large-8 columns">
										<input onChange={OrderActions.updateBillingEmail}
											   type="text"
											   value={this.state.order.billing.email} />
									</div>
								</div>
							</div>
							<div className="large-6 columns">
								<fieldset>
									<label>Delivery Address</label>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline"></label>
										</div>
										<div className="large-8 columns">
											<input onChange={OrderActions.updateDeliveryAddressLine1}
												   type="text"
												   value={this.state.order.delivery.address.line1} />
										</div>
									</div>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline"></label>
										</div>
										<div className="large-8 columns">
											<input onChange={OrderActions.updateDeliveryAddressLine2}
												   type="text"
												   value={this.state.order.delivery.address.line2} />
										</div>
									</div>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline"></label>
										</div>
										<div className="large-8 columns">
											<input onChange={OrderActions.updateDeliveryAddressLine3}
												   type="text"
												   value={this.state.order.delivery.address.line3} />
										</div>
									</div>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline"></label>
										</div>
										<div className="large-8 columns">
											<input onChange={OrderActions.updateDeliveryAddressLine4}
												   type="text"
												   value={this.state.order.delivery.address.line4} />
										</div>
									</div>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline"></label>
										</div>
										<div className="large-8 columns">
											<input onChange={OrderActions.updateDeliveryAddressPostCode}
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
										<textarea onChange={OrderActions.updateDeliveryAccessArrangements}
												  value={this.state.order.delivery.accessArrangements}>
										</textarea>
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline">Access Telephone</label>
									</div>
									<div className="large-8 columns">
										<input onChange={OrderActions.updateDeliveryTelephone}
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
										<a className="button tiny radius fancy" onClick={OrderActions.addProductToOrder}>Add Product</a>
										<a className="fancy button tiny radius right">Add Discount</a>
										<a className="fancy button tiny radius right">Add Delivery Charge</a>
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
											this.state.order.products.map(function(product, productIndex) {
												return (
													<div className="table-row" key={productIndex}>
														<div className="table-cell">
															<input type="text" value={product.name} />
														</div>
														<div className="table-cell">
															<input type="text" value={product.price} />
														</div>
														<div className="table-cell">
															<input type="number" onChange={OrderActions.setProductQuantityOnOrder.bind(this, productIndex)} value={product.quantity} />
														</div>
														<div className="table-cell">
															<input type="text" value={product.subTotal} />
														</div>
														<div className="table-cell">
															<input type="text" value={product.VAT} />
														</div>
														<div className="table-cell">
															<input type="text" value={product.total} />
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
											<div className="table-cell text-right right-box"><input type="text" value={this.state.order.subTotal} /></div>
										</div>
										<div className="table-row">
											<div className="table-cell">&#160;</div>
											<div className="table-cell">&#160;</div>
											<div className="table-cell">&#160;</div>
											<div className="table-cell">&#160;</div>
											<div className="table-cell left-box">VAT</div>
											<div className="table-cell text-right right-box"><input type="text" value={this.state.order.VAT} /></div>
										</div>
										<div className="table-row">
											<div className="table-cell">&#160;</div>
											<div className="table-cell">&#160;</div>
											<div className="table-cell">&#160;</div>
											<div className="table-cell">&#160;</div>
											<div className="table-cell left-box"><strong>Total</strong></div>
											<div className="table-cell text-right right-box"><input type="text" value={this.state.order.total} /></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</TabPanel>
					<TabPanel>
					</TabPanel>
				</Tabs>
			</Layout>
		);
	}
});

if(process.browser) {
	ReactDOM.render(<View locals={locals} />, document);
}

exports = module.exports = View;