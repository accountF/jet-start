import {JetView} from "webix-jet";
import { contacts } from "models/contacts.js";
import { countries } from "models/countries";
import { statuses } from "models/statuses";

export default class FormInContactsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			view: "form",
			localId: "myForm",
			autoheight: false,
			elements: [
				{view: "text", label: _("Name"), name: "Name"},
				{view: "text", label: _("E-mail"), name: "Email"},
				{view: "combo", label: _("Countries"), name: "Country", value:"",
					options:{body: {template:"#Name#"}, data: countries}},
				{view: "combo", label: _("Statuses"), name: "Status", value:"",
					options:{body: {template:"#Name#"}, data: statuses}},
				{
					cols: [
						{view: "button", value: _("Save"), click: () => this.saveContact()}
					]
				}
			]
		};
	}

	init(){
		this.form = this.$$("myForm");
	}
	urlChange(view, url) {
		const idFromUrl = url[0].params.id;
		if(contacts.config.data.length){
			const item = contacts.getItem(idFromUrl);
			this.form.setValues(item);
		}
	}

	saveContact(){
		const dataFromForm = this.form.getValues();
		if(dataFromForm.id) {
			contacts.updateItem(dataFromForm.id, dataFromForm);
			webix.message("Contact was updated");
		} else {
			webix.message("Choose contact");
		}
		this.form.clear();
	}
}