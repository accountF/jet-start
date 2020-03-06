import {JetView} from "webix-jet";
import Form from "views/formInContacts.js";
import List from "views/listInContacts.js";

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
