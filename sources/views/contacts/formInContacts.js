import {JetView} from "webix-jet";
import { contacts } from "models/contacts.js";

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
					options:[{value:1}, {value:2}, {value:3}]},
				{view: "combo", label: _("Statuses"), name: "Status", value:"",
					options:[{value:1}, {value:2}, {value:3}]},
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
		this.on(this.app, "onChangeUrlInList", (item) => {
			this.form.setValues(item);
		});
	}

	saveContact(){
		const dataFromForm = this.form.getValues();
		if(dataFromForm.id){
			contacts.updateItem(dataFromForm.id, dataFromForm);
			webix.message("Contact was updated");
		} else {
			contacts.add(dataFromForm);
			webix.message("Contact was added");
		}
		this.form.clear();
	}
}