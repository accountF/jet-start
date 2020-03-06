import {JetView} from "webix-jet";

export default class Table extends JetView {
	constructor(app, name, data) {
		super(app, name);
		this._gridData = data;
	}

	config() {
		return {
			rows: [
				{
					view: "datatable",
					autoConfig: true,
					localId: "table"
				},
				{
					cols: [
						{view: "button", value: "Add", click: () => this.doAddItem(this.$$("table"))},
						{view: "button", value: "Delete", click: () => this.deletedItem(this.$$("table"))}
					]
				}
			]
		};
	}

	init(view) {
		view.queryView("datatable").parse(this._gridData);
	}

	doAddItem(table) {
		table.add({Name: "name"});
	}

	deletedItem(table) {
		const id = table.getSelectedId();
		table.remove(id);
	}
}