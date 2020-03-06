import {JetView} from "webix-jet";

export default class TopView extends JetView {
	config() {
		return {
			rows: [
				{
					type: "space", cols: [
						{
							view: "menu", layout: "y", width: 200, select: true,
							data: [
								{id: "contacts", value: "Contacts", href: "#!/top/contacts"},
								{id: "data", value: "Data", href: "#!/top/data"},
								{id: "settings", value: "Settings", href: "#!/top/settings"}
							]
						},
						{$subview: true}
					]
				},
			]
		};
	}
}