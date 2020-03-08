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

		if (url[0].params.id) {
			this.list.select(url[0].params.id);
		} else {
			this.list.select(this.list.getFirstId());
		}
	}

	addItemIntoList(){
		const id = contacts.add({Name:"Name", Email:"lalala@mail.ru"});
		webix.message("Contact was added");
		this.list.select(id);
		this.setIdIntoUrl(id);
	}

	deleteItem(id){
		contacts.remove(id);
		webix.message("Contact was deleted");
	}

	setIdIntoUrl(id) {
		this.setParam("id", id, true);
	}

	urlChange() {
		const id = this.getParam("id");
		const itemById = this.list.getItem(id);
		this.app.callEvent("onChangeUrlInList", [itemById]);
	}
}
