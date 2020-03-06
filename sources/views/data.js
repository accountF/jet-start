import {JetView} from "webix-jet";
import Table from "views/table.js";
import {countries} from "models/countries.js";
import {statuses} from "models/statuses.js";


export default class DataView extends JetView {
	config() {
		return {
			rows: [
				{
					view: "segmented", value: "Countries", multiview: true, options: [
						{value: "Countries", id: "Countries"},
						{value: "Statuses", id: "Statuses"}
					]
				},
				{
					cells: [
						{
							id: "Countries", rows: [
								new Table(this.app, "", countries),
							],
						},
						{
							id: "Statuses", rows: [
								new Table(this.app, "", statuses)
							]
						}
					]
				}
			]
		};
	}
}