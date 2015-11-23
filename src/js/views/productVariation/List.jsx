var React = require("react");
var ReactDOM = require("react-dom");
var Layout = require("sycamore-platform-components").Layout;
var ActionsBar = require("sycamore-platform-components").ActionsBar;
var List = require("sycamore-platform-components").List;
var ListStore = require("sycamore-platform-components").ListStore;
var SettingsButton = require("sycamore-platform-components").SettingsButton;

var View = React.createClass({
	selectRow: function(id) {
		window.location.href = this.props.locals.applicationUrl + "supplier/" + id;
	},
	render: function() {
		return (
			<Layout pageTitle={this.props.locals.list.title} locals={this.props.locals}>
				<ActionsBar pageTitle={this.props.locals.list.title}>
					<SettingsButton />
					<a href={this.props.locals.applicationUrl + "supplier"} className="right fancy radius button tiny">
						<i className="in-button-icon fa fa-fw fa-plus"></i> Create
					</a>
				</ActionsBar>
				<List apiUrl={this.props.locals.applicationUrl + "suppliers.json"} list={this.props.locals.list} selectRow={this.selectRow} updateListener={this._onUpdate} />
			</Layout>
		);
	}
});

if(process.browser) {
	ReactDOM.render(<View locals={locals} />, document);
}

exports = module.exports = View;