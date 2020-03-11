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
		this._gridData.waitData.then(()=>{
			this.tableComponent.parse(this._gridData);
		});
	}

	addItem() {
		this._gridData.waitSave(() => {
			this._gridData.add({Name: "name"}, 0);
		}).then((res) => {
			this.tableComponent.select(res.id);
		});

	}

	deletedItem() {
		const id = this.tableComponent.getSelectedId();
		if(id){
			this._gridData.remove(id);
		} else {
			webix.message("Element is not chosen");
		}
	}
}