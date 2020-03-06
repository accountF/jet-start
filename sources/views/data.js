import {JetView} from "webix-jet";
import Table from "views/table.js";
import {countries} from "models/countries.js";
import {statuses} from "models/statuses.js";


export default class DataView extends JetView {
	config() {
		return {
			rows: [
				{
					view: "segmented", id: "segment", value: "Countries", multiview: true, options: [
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
		const self = this;
		this.$$("segment").attachEvent("onChange", function (newValue) {
			self.$$(newValue).show();
		});
	}
}