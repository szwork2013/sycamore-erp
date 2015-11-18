var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var SupplierConstants = require("../constants/SupplierConstants");
var assign = require("object-assign");
var async = require("async");

var _supplier = {
	_id: null,
	name: null,
	billingAddress: {
		line1: null,
		line2: null,
		line3: null,
		line4: null,
		postCode: null
	},
	telephone: null,
	email: null
};

var SupplierStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(SupplierConstants.CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(SupplierConstants.CHANGE_EVENT);
	},

	getBillingAddressLine1: function() {
		return _supplier.billingAddress.line1;
	},

	getBillingAddressLine2: function() {
		return _supplier.billingAddress.line2;
	},

	getBillingAddressLine3: function() {
		return _supplier.billingAddress.line3;
	},

	getBillingAddressLine4: function() {
		return _supplier.billingAddress.line4;
	},

	getBillingAddressPostCode: function() {
		return _supplier.billingAddress.postCode;
	},

	getEmail: function() {
		return _supplier.email;
	},

	getId: function() {
		return _supplier._id;
	},

	getName: function() {
		return _supplier.name;
	},

	getSupplier: function() {
		return _supplier;
	},

	getTelephone: function() {
		return _supplier.telephone;
	},

	loadData: function(supplier) {
		if(supplier != null) {
			if(typeof(supplier._id) != "undefined") {
				_supplier._id = supplier._id;
			}
			if(typeof(supplier.name) != "undefined") {
				this.setName(supplier.name);
			}
			if(typeof(supplier.billingAddress) != "undefined") {
				if(typeof(supplier.billingAddress.line1) != "undefined") {
					this.setBillingAddressLine1(supplier.billingAddress.line1);
				}
				if(typeof(supplier.billingAddress.line2) != "undefined") {
					this.setBillingAddressLine1(supplier.billingAddress.line2);
				}
				if(typeof(supplier.billingAddress.line3) != "undefined") {
					this.setBillingAddressLine1(supplier.billingAddress.line3);
				}
				if(typeof(supplier.billingAddress.line4) != "undefined") {
					this.setBillingAddressLine1(supplier.billingAddress.line4);
				}
				if(typeof(supplier.billingAddress.postCode) != "undefined") {
					this.setBillingAddressLine1(supplier.billingAddress.postCode);
				}
			}
			if(typeof(supplier.telephone) != "undefined") {
				this.setTelephone(supplier.telephone);
			}
			if(typeof(supplier.email) != "undefined") {
				this.setEmail(supplier.email);
			}
		}
		this.emitChange();
	},

	removeChangeListener: function(callback) {
		this.removeListener(SupplierConstants.CHANGE_EVENT, callback);
	},

	setBillingAddressLine1: function(line1) {
		_supplier.billingAddress.line1 = line1;
	},

	setBillingAddressLine2: function(line2) {
		_supplier.billingAddress.line2 = line2;
	},

	setBillingAddressLine3: function(line3) {
		_supplier.billingAddress.line3 = line3;
	},

	setBillingAddressLine4: function(line4) {
		_supplier.billingAddress.line4 = line4;
	},

	setBillingAddressPostCode: function(postCode) {
		_supplier.billingAddress.postCode = postCode;
	},

	setEmail: function(email) {
		_supplier.email = email;
	},

	setName: function(name) {
		_supplier.name = name;
	},

	setTelephone: function(telephone) {
		_supplier.telephone = telephone;
	}
});

SupplierStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case SupplierConstants.UPDATE_SUPPLIER:
			SupplierStore.loadData(action.supplier);
		break;
		case SupplierConstants.UPDATE_SUPPLIER_NAME:
			SupplierStore.setName(action.name);
			SupplierStore.emitChange();
		break;
		case SupplierConstants.UPDATE_SUPPLIER_BILLING_ADDRESS_LINE1:
			SupplierStore.setBillingAddressLine1(action.line1);
			SupplierStore.emitChange();
		break;
		case SupplierConstants.UPDATE_SUPPLIER_BILLING_ADDRESS_LINE2:
			SupplierStore.setBillingAddressLine2(action.line2);
			SupplierStore.emitChange();
		break;
		case SupplierConstants.UPDATE_SUPPLIER_BILLING_ADDRESS_LINE3:
			SupplierStore.setBillingAddressLine3(action.line3);
			SupplierStore.emitChange();
		break;
		case SupplierConstants.UPDATE_SUPPLIER_BILLING_ADDRESS_LINE4:
			SupplierStore.setBillingAddressLine4(action.line4);
			SupplierStore.emitChange();
		break;
		case SupplierConstants.UPDATE_SUPPLIER_BILLING_ADDRESS_POSTCODE:
			SupplierStore.setBillingAddressPostCode(action.postCode);
			SupplierStore.emitChange();
		break;
		case SupplierConstants.UPDATE_SUPPLIER_TELEPHONE:
			SupplierStore.setTelephone(action.telephone);
			SupplierStore.emitChange();
		break;
		case SupplierConstants.UPDATE_SUPPLIER_EMAIL:
			SupplierStore.setEmail(action.email);
			SupplierStore.emitChange();
		break;
		default:
			// do nothing
	}
});

module.exports = SupplierStore;