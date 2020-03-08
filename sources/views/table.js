import {JetView} from "webix-jet";

export default class Table extends JetView {
	constructor(app, name, data) {
		super(app, name);
		this._gridData = data;
	}

	config() {
		const _ = this.app.getService("locale")._;
		return {
			rows: [
				{
					view: "datatable",
					autoConfig: true,
					localId: "table"
				},
				{
					cols: [
						{view: "button", value: _("Add"), click: () => this.addItem()},
						{view: "button", value: _("Delete"), click: () => this.deletedItem()}
					]
				}
			]
		};
	}

	init() {
		this.tableComponent = this.$$("table");
		this.tableComponent.parse(this._gridData);
	}

	addItem() {
		this.tableComponent.add({Name: "name"});
	}

	deletedItem() {
		const id = this.tableComponent.getSelectedId();
		this.tableComponent.remove(id);
	}
}