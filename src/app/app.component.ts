import { Component, OnInit } from "@angular/core";
import { FilesService } from "./services/files.service";
//import { FormRegisterComponent } from "./components/form-register/form-register.component";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
	title = "";
	imgRta = "";

	constructor(private filesService: FilesService) {}

	ngOnInit(): void {}

	downloadPdf() {
		this.filesService
			.getFile(
				"my.pdf",
				"https://young-sands-07814.herokuapp.com/api/files/dummy.pdf",
				"application/pdf",
			)
			.subscribe();
	}

	onUpload(event: Event) {
		const element = event.target as HTMLInputElement;
		const file = element.files?.item(0);
		if (file) {
			this.filesService.uploadFile(file).subscribe((rta) => {
				this.imgRta = rta.location;
			});
		}
	}
}
