import {JetView} from "webix-jet";
import Table from "views/table.js";
import {countries} from "models/countries.js";
import {statuses} from "models/statuses.js";


export default class DataView extends JetView {
	config() {
		return {
			rows: [
				{
					view: "segmented", localId: "segment", value: "Countries",options: [
						{value: "Countries", id: "Countries"},
						{value: "Statuses", id: "Statuses"}
					]
				},
				{
					cells: [
						{
							localId: "Countries", rows: [
								new Table(this.app, "", countries),
							],
						},
						{
							localId: "Statuses", rows: [
								new Table(this.app, "", statuses)
							]
						}
					]
				}
			]
		};
	}

	init() {
		this.$$("segment").attachEvent("onChange", (newValue) => {
			this.$$(newValue).show();
		});
	}
}