sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel",
	"../formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
	
], function (Controller, MessageToast, JSONModel, ResourceModel, formatter, Filter, FilterOperator) {
	"use strict";
	return Controller.extend("udemy.openui5.passoapasso.controller.App", {
		formatter: formatter,
		
		onFilterInvoices : function (oEvent) {
		
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			
			if (sQuery) {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}
			
			
			// filter binding
			var oList = this.byId("invoiceList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		onInit: function () {
			// set data model on view
			var oData = {
				recipient: {
					name: "World"
				}
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel);

			var oInvoice = new JSONModel("Invoices.json");
			this.getView().setModel(oInvoice, "invoice");

			// set i18n model on view
			var i18nModel = new ResourceModel({
				bundleName: "udemy.openui5.passoapasso.i18n.i18n"
			});
			this.getView().setModel(i18nModel, "i18n");
		},
	
	

		onShowHello: function () {

			/*
			internacionalização em português
			internationalization em inglês
			i123456789012345678n
			i18n
			*/

			// read msg from i18n model
			var oBundle = this.getView().getModel("i18n").getResourceBundle();
			var sRecipient = this.getView().getModel().getProperty("/recipient/name");
			var sMsg = oBundle.getText("helloMsg", [sRecipient]);

			// show message
			MessageToast.show(sMsg);
		}
	});
});