import {JetView} from "webix-jet";
import {contacts} from "../../models/contacts.js";

export default class ListInContactsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			rows: [
				{
					view: "list",
					localId: "contactsList",
					select: true,
					template: "#FirstName#, e-mail: #Email# <span class='webix_icon wxi-close'></span>",
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


		contacts.waitData.then(()=>{
			this.list.sync(contacts);
			this.list.attachEvent("onAfterSelect", (id) => this.setIdIntoUrl(id));

			const idFromUrl = url[0].params.id;

			if (contacts.exists(idFromUrl)) {
				this.list.select(idFromUrl);
			} else if(!idFromUrl && contacts.count()) {
				this.list.select(this.list.getFirstId());
			} else {
				this.show("./contacts");
				webix.message("Please check the data");
			}
		});

	}

	addItemIntoList() {
		contacts.waitSave(() => {
			contacts.add({FirstName: "Name"}, 0);
		}).then((res) => {
			this.list.select(res.id);
			this.setIdIntoUrl(res.id);
		});
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
