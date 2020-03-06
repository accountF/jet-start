import {JetView} from "webix-jet";
import {contacts} from "models/contacts.js";

export default class ListInContactsView extends JetView {
	config() {
		return {
			view: "list",
			select: true,
			template: "#Name#, e-mail: #Email#"
		};
	}

	init(view) {
		view.parse(contacts);
	}
}
