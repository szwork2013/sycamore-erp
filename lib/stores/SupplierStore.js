"use strict";

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
	addChangeListener: function addChangeListener(callback) {
		this.on(SupplierConstants.CHANGE_EVENT, callback);
	},

	emitChange: function emitChange() {
		this.emit(SupplierConstants.CHANGE_EVENT);
	},

	getBillingAddressLine1: function getBillingAddressLine1() {
		return _supplier.billingAddress.line1;
	},

	getBillingAddressLine2: function getBillingAddressLine2() {
		return _supplier.billingAddress.line2;
	},

	getBillingAddressLine3: function getBillingAddressLine3() {
		return _supplier.billingAddress.line3;
	},

	getBillingAddressLine4: function getBillingAddressLine4() {
		return _supplier.billingAddress.line4;
	},

	getBillingAddressPostCode: function getBillingAddressPostCode() {
		return _supplier.billingAddress.postCode;
	},

	getEmail: function getEmail() {
		return _supplier.email;
	},

	getId: function getId() {
		return _supplier._id;
	},

	getName: function getName() {
		return _supplier.name;
	},

	getTelephone: function getTelephone() {
		return _supplier.telephone;
	},

	loadData: function loadData(supplier) {
		if (supplier != null) {
			if (typeof supplier._id != "undefined") {
				_supplier._id = supplier._id;
			}
			if (typeof supplier.name != "undefined") {
				this.setName(supplier.name);
			}
			if (typeof supplier.billingAddress != "undefined") {
				if (typeof supplier.billingAddress.line1 != "undefined") {
					this.setBillingAddressLine1(supplier.billingAddress.line1);
				}
				if (typeof supplier.billingAddress.line2 != "undefined") {
					this.setBillingAddressLine1(supplier.billingAddress.line2);
				}
				if (typeof supplier.billingAddress.line3 != "undefined") {
					this.setBillingAddressLine1(supplier.billingAddress.line3);
				}
				if (typeof supplier.billingAddress.line4 != "undefined") {
					this.setBillingAddressLine1(supplier.billingAddress.line4);
				}
				if (typeof supplier.billingAddress.postCode != "undefined") {
					this.setBillingAddressLine1(supplier.billingAddress.postCode);
				}
			}
			if (typeof supplier.telephone != "undefined") {
				this.setTelephone(supplier.telephone);
			}
			if (typeof supplier.email != "undefined") {
				this.setEmail(supplier.email);
			}
		}
		this.emitChange();
	},

	removeChangeListener: function removeChangeListener(callback) {
		this.removeListener(SupplierConstants.CHANGE_EVENT, callback);
	},

	setBillingAddressLine1: function setBillingAddressLine1(line1) {
		_supplier.billingAddress.line1 = line1;
	},

	setBillingAddressLine2: function setBillingAddressLine2(line2) {
		_supplier.billingAddress.line2 = line2;
	},

	setBillingAddressLine3: function setBillingAddressLine3(line3) {
		_supplier.billingAddress.line3 = line3;
	},

	setBillingAddressLine4: function setBillingAddressLine4(line4) {
		_supplier.billingAddress.line4 = line4;
	},

	setBillingAddressPostCode: function setBillingAddressPostCode(postCode) {
		_supplier.billingAddress.postCode = postCode;
	},

	setEmail: function setEmail(email) {
		_supplier.email = email;
	},

	setName: function setName(name) {
		_supplier.name = name;
	},

	setTelephone: function setTelephone(telephone) {
		_supplier.telephone = telephone;
	}
});

SupplierStore.dispatchToken = AppDispatcher.register(function (payload) {
	var action = payload.action;
	switch (action.actionType) {
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