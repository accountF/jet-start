import {JetView} from "webix-jet";

export default class SettingsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			rows: [
				{
					view: "segmented", localId: "language", inputWidth: 250, align: "center", options: [
						{ id: "en", value: _("English") },
						{ id: "ru", value: _("Russian") }
					],
					click: () => {
						this.toggleLanguage();
					},
				},
				{}
			]
		};
	}
	toggleLanguage() {
		const langs = this.app.getService("locale");
		const value = this.$$("language").getValue();
		langs.setLang(value);
	}
}