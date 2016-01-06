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
												selected={this.state.order.deliveryDate}
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
										<label className="right inline">Company Name / Name</label>
									</div>
									<div className="large-8 columns">
										<input onChange={CustomerActions.updateCustomerName}
											   type="text"
											   value={this.state.customer.name} />
									</div>
								</div>
								<fieldset>
									<label>Billing Address</label>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline">Line 1</label>
										</div>
										<div className="large-8 columns">
											<input onChange={CustomerActions.updateCustomerBillingAddressLine1}
												   type="text"
												   value={this.state.customer.billingAddress.line1} />
										</div>
									</div>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline">Line 2</label>
										</div>
										<div className="large-8 columns">
											<input onChange={CustomerActions.updateCustomerBillingAddressLine2}
												   type="text"
												   value={this.state.customer.billingAddress.line2} />
										</div>
									</div>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline">Line 3</label>
										</div>
										<div className="large-8 columns">
											<input onChange={CustomerActions.updateCustomerBillingAddressLine3}
												   type="text"
												   value={this.state.customer.billingAddress.line3} />
										</div>
									</div>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline">Line 4</label>
										</div>
										<div className="large-8 columns">
											<input onChange={CustomerActions.updateCustomerBillingAddressLine4}
												   type="text"
												   value={this.state.customer.billingAddress.line4} />
										</div>
									</div>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline">PostCode</label>
										</div>
										<div className="large-8 columns">
											<input onChange={CustomerActions.updateCustomerBillingAddressPostCode}
												   type="text"
												   value={this.state.customer.billingAddress.postCode} />
										</div>
									</div>
								</fieldset>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline">Telephone</label>
									</div>
									<div className="large-8 columns">
										<input onChange={CustomerActions.updateCustomerTelephone}
											   type="text"
											   value={this.state.customer.telephone} />
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline">Email</label>
									</div>
									<div className="large-8 columns">
										<input onChange={CustomerActions.updateCustomerEmail}
											   type="text"
											   value={this.state.customer.email} />
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
											<input onChange={PropertyActions.updatePropertyAddressLine1}
												   type="text"
												   value={this.state.property.address.line1} />
										</div>
									</div>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline"></label>
										</div>
										<div className="large-8 columns">
											<input onChange={PropertyActions.updatePropertyAddressLine2}
												   type="text"
												   value={this.state.property.address.line2} />
										</div>
									</div>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline"></label>
										</div>
										<div className="large-8 columns">
											<input onChange={PropertyActions.updatePropertyAddressLine3}
												   type="text"
												   value={this.state.property.address.line3} />
										</div>
									</div>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline"></label>
										</div>
										<div className="large-8 columns">
											<input onChange={PropertyActions.updatePropertyAddressLine4}
												   type="text"
												   value={this.state.property.address.line4} />
										</div>
									</div>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline"></label>
										</div>
										<div className="large-8 columns">
											<input onChange={PropertyActions.updatePropertyAddressPostCode}
												   type="text"
												   value={this.state.property.address.postCode} />
										</div>
									</div>
								</fieldset>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline">Access Arrangements</label>
									</div>
									<div className="large-8 columns">
										<textarea onChange={PropertyActions.updatePropertyAccessArrangements}
												  value={this.state.property.accessArrangements}>
										</textarea>
									</div>
								</div>
								<div className="row">
									<div className="large-4 columns">
										<label className="right inline">Access Telephone</label>
									</div>
									<div className="large-8 columns">
										<input onChange={PropertyActions.updatePropertyTelephone}
											   type="text"
											   value={this.state.property.telephone} />
									</div>
								</div>
							</div>
						</div>
						<ProductsTable order={this.state.order} products={this.state.order.products} />
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