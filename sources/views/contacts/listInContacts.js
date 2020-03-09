import {JetView} from "webix-jet";
import {contacts} from "models/contacts.js";

export default class ListInContactsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			rows: [
				{
					view: "list",
					localId: "contactsList",
					select: true,
					template: "#Name#, e-mail: #Email# <span class='webix_icon wxi-close'></span>",
					onClick: {
						"wxi-close": (e, id) => this.deleteItem(id)
					}
				},
				{
					view: "button",
					value: _("Add"),
					click: () => this.addItemIntoList()
				}
			]
		};
	}

	init(view, url) {
		this.list = this.$$("contactsList");
		this.list.sync(contacts);
		this.list.attachEvent("onAfterSelect", (id) => this.setIdIntoUrl(id));

		const idFromUrl = url[0].params.id;
		const lengthOfContacts = contacts.config.data.length;

		if (contacts.exists(idFromUrl)) {
			this.list.select(idFromUrl);
		} else if(!idFromUrl && lengthOfContacts > 0) {
			this.list.select(this.list.getFirstId());
		} else {
			this.show("./contacts");
			webix.message("Please check the data");
		}
	}

	addItemIntoList() {
		const id = contacts.add({Name: "Name"}, 0);
		webix.message("Contact was added");
		this.list.select(id);
		this.setIdIntoUrl(id);
	}

	deleteItem(id) {
		contacts.remove(id);
		webix.message("Contact was deleted");
		this.show("./contacts");
	}

	setIdIntoUrl(id) {
		this.show(`./contacts?id=${id}`);
	}

}
