import {JetView} from "webix-jet";
import Form from "views/contacts/formInContacts.js";
import List from "views/contacts/listInContacts.js";

export default class ContactsView extends JetView {
	config() {
		return {
			rows: [
				{
					cols: [
						List,
						Form
					]
				},
				{}
			]
		};
	}
}
