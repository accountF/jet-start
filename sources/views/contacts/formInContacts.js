import {JetView} from "webix-jet";

export default class FormInContactsView extends JetView {
	config() {
		return {
			view: "form",
			autoheight: false,
			elements: [
				{view: "text", label: "Name"},
				{view: "text", label: "E-mail"},
				{
					cols: [
						{view: "button", value: "Add"},
						{view: "button", value: "Clear"}
					]
				}

			]
		};
	}
}