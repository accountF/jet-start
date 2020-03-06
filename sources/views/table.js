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
						{view: "button", value: "Add", click: () => this.addItem()},
						{view: "button", value: "Delete", click: () => this.deletedItem()}
					]
				}
			]
		};
	}

	init(view) {
		view.queryView("datatable").parse(this._gridData);
	}

	addItem() {
		this.$$("table").add({Name: "name"});
	}

	deletedItem() {
		const table = this.$$("table");
		const id = table.getSelectedId();
		table.remove(id);
	}
}