var React = require("react");
var Layout = require("../Layout");
var Header = require("../../components/Header");

var View = React.createClass({
	getInitialState: function() {
		var locals = this.props.locals;

		var state = {
			applicationName: "",
			menus: [],
			title: "Sycamore ERP - New order"
		};

		if(typeof(locals) != "undefined") {
			if(typeof(locals.applicationName) != "undefined") {
				state.applicationName = locals.applicationName;
			}
			if(typeof(locals.menus) != "undefined") {
				state.menus = locals.menus;
			}
		}

		return state;
	},
	render: function() {
		return (
			<Layout title={this.state.title} locals={this.props.locals}>
				<Header applicationName={this.state.applicationName} applicationUrl={this.state.applicationUrl} menus={this.state.menus} />
				<div className="row">
					<ul className="breadcrumbs">
						<li>Orders</li>
					</ul>
				</div>
				<div className="row">
					<div className="large-10 columns">
						<h1>New order</h1>
					</div>
					<div className="large-2 columns">
						<a href="/order/create" className="right fancy radius button tiny">
							<i className="in-button-icon fa fa-fw fa-plus"></i> Save
						</a>
					</div>
				</div>
				<div className="row">
					<div className="large-6 columns">
						<fieldset>
							<div className="row">
								<div className="large-2 columns">
									<label className="inline">Customer</label>
								</div>
								<div className="large-8 columns">
									<select></select>
								</div>
								<div className="large-2 columns">
									<input className="button tiny" type="button" value="New" />
								</div>
							</div>
						</fieldset>
					</div>
					<div className="large-6 columns">
						<fieldset>
							<div className="row">				
								<div className="large-2 columns">
									<label className="inline">Property</label>
								</div>
								<div className="large-8 columns">
									<select></select>
								</div>
								<div className="large-2 columns">
									<input className="button tiny" type="button" value="New" />
								</div>
							</div>
						</fieldset>
					</div>
				</div>

				<div className="row">
					<div className="large-12 columns">
						<div className="table">
							<div className="table-header">
								<div className="table-row">
									<div className="table-cell">
										Quantity
									</div>
									<div className="table-cell">
										Product
									</div>
									<div className="table-cell">
										Options
									</div>
								</div>
							</div>
							<div className="table-body">
								<div className="table-row">
									<div className="table-cell">
										<input type="number" />
									</div>
									<div className="table-cell">
										<select>
											<option>Harrisons 3 Door Wardrobe</option>
											<option>Harrisons 2 Door Wardrobe</option>
											<option>Harrisons 3 Door Wardrobe (With Drawers)</option>
											<option>Harrisons 2 Door Wardrobe (With Drawers)</option>
											<option>Harrisons 2 Drawer Bedside Cabinet</option>
											<option>Harrisons 3 Drawer Bedside Cabinet</option>
											<option>Harrisons 3 Drawer Chest</option>
											<option>Harrisons 4 Drawer Chest</option>
										</select>
									</div>
									<div className="table-cell">

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
});

if(process.browser) {
	React.render(<View locals={locals} />, document);
}

exports = module.exports = View;