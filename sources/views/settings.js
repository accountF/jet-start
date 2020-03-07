import {JetView} from "webix-jet";

export default class SettingsView extends JetView {
	config() {
		return {
			rows: [
				{
					view: "segmented", value: "RU", inputWidth: 250, options: [
						{value: "RU"},
						{value: "EN"}
					], align: "center"
				},
				{}
			]
		};
	}
}