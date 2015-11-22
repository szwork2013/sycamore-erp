"use strict";

var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var PropertyConstants = require("../constants/PropertyConstants");
var assign = require("object-assign");
var async = require("async");

var CustomerStore = require("./CustomerStore");

var _property = {
	_id: null,
	customer: CustomerStore.getCustomer(),
	accessArrangements: null,
	address: {
		line1: null,
		line2: null,
		line3: null,
		line4: null,
		postCode: null
	},
	telephone: null
};

var PropertyStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function addChangeListener(callback) {
		this.on(PropertyConstants.CHANGE_EVENT, callback);
	},

	emitChange: function emitChange() {
		this.emit(PropertyConstants.CHANGE_EVENT);
	},

	getAccessArrangements: function getAccessArrangements() {
		return _property.accessArrangements;
	},

	getAddressLine1: function getAddressLine1() {
		return _property.address.line1;
	},

	getAddressLine2: function getAddressLine2() {
		return _property.address.line2;
	},

	getAddressLine3: function getAddressLine3() {
		return _property.address.line3;
	},

	getAddressLine4: function getAddressLine4() {
		return _property.address.line4;
	},

	getAddressPostCode: function getAddressPostCode() {
		return _property.address.postCode;
	},

	getId: function getId() {
		return _property._id;
	},

	getProperty: function getProperty() {
		var property, id;

		property = {
			customer: CustomerStore.getCustomer(),
			accessArrangements: this.getAccessArrangements(),
			address: {
				line1: this.getAddressLine1(),
				line2: this.getAddressLine2(),
				line3: this.getAddressLine3(),
				line4: this.getAddressLine4(),
				postCode: this.getAddressPostCode()
			},
			telephone: this.getTelephone()
		};

		id = this.getId();
		if (id != null) {
			property._id = id;
		}

		return property;
	},

	getTelephone: function getTelephone() {
		return _property.telephone;
	},

	loadData: function loadData(property) {
		if (typeof property.customer !== "undefined" && typeof property.customer === "object") {
			CustomerStore.loadData(property.customer);
		}
		_property = {
			_id: null,
			customer: CustomerStore.getCustomer(),
			accessArrangements: null,
			address: {
				line1: null,
				line2: null,
				line3: null,
				line4: null,
				postCode: null
			},
			telephone: null
		};

		if (property != null) {
			if (typeof property._id != "undefined") {
				_property._id = property._id;
			}
			if (typeof property.accessArrangements != "undefined") {
				this.setAccessArrangements(property.accessArrangements);
			}
			if (typeof property.telephone != "undefined") {
				this.setTelephone(property.telephone);
			}
			if (typeof property.address != "undefined") {
				if (typeof property.address.line1 != "undefined") {
					this.setAddressLine1(property.address.line1);
				}
				if (typeof property.address.line2 != "undefined") {
					this.setAddressLine2(property.address.line2);
				}
				if (typeof property.address.line3 != "undefined") {
					this.setAddressLine3(property.address.line3);
				}
				if (typeof property.address.line4 != "undefined") {
					this.setAddressLine4(property.address.line4);
				}
				if (typeof property.address.postCode != "undefined") {
					this.setAddressPostCode(property.address.postCode);
				}
			}
		}
		this.emitChange();
	},

	removeChangeListener: function removeChangeListener(callback) {
		this.removeListener(PropertyConstants.CHANGE_EVENT, callback);
	},

	setAccessArrangements: function setAccessArrangements(accessArrangements) {
		_property.accessArrangements = accessArrangements;
	},

	setAddressLine1: function setAddressLine1(line1) {
		_property.address.line1 = line1;
	},

	setAddressLine2: function setAddressLine2(line2) {
		_property.address.line2 = line2;
	},

	setAddressLine3: function setAddressLine3(line3) {
		_property.address.line3 = line3;
	},

	setAddressLine4: function setAddressLine4(line4) {
		_property.address.line4 = line4;
	},

	setAddressPostCode: function setAddressPostCode(postCode) {
		_property.address.postCode = postCode;
	},

	setCustomer: function setCustomer(customer) {
		CustomerStore.loadData(customer);
	},

	setTelephone: function setTelephone(telephone) {
		_property.telephone = telephone;
	}
});

PropertyStore.dispatchToken = AppDispatcher.register(function (payload) {
	var action = payload.action;
	switch (action.actionType) {
		case PropertyConstants.UPDATE_PROPERTY:
			PropertyStore.loadData(action.property);
			break;
		case PropertyConstants.SET_CUSTOMER_ON_PROPERTY:
			PropertyStore.setCustomer(action.customer);
			PropertyStore.emitChange();
			break;
		case PropertyConstants.UPDATE_PROPERTY_ADDRESS_LINE1:
			PropertyStore.setAddressLine1(action.line1);
			PropertyStore.emitChange();
			break;
		case PropertyConstants.UPDATE_PROPERTY_ADDRESS_LINE2:
			PropertyStore.setAddressLine2(action.line2);
			PropertyStore.emitChange();
			break;
		case PropertyConstants.UPDATE_PROPERTY_ADDRESS_LINE3:
			PropertyStore.setAddressLine3(action.line3);
			PropertyStore.emitChange();
			break;
		case PropertyConstants.UPDATE_PROPERTY_ADDRESS_LINE4:
			PropertyStore.setAddressLine4(action.line4);
			PropertyStore.emitChange();
			break;
		case PropertyConstants.UPDATE_PROPERTY_ADDRESS_POSTCODE:
			PropertyStore.setAddressPostCode(action.postCode);
			PropertyStore.emitChange();
			break;
		case PropertyConstants.UPDATE_PROPERTY_ACCESS_ARRANGEMENTS:
			PropertyStore.setAccessArrangements(action.accessArrangements);
			PropertyStore.emitChange();
			break;
		case PropertyConstants.UPDATE_PROPERTY_TELEPHONE:
			PropertyStore.setTelephone(action.telephone);
			PropertyStore.emitChange();
			break;
		default:
		// do nothing
	}
});

module.exports = PropertyStore;