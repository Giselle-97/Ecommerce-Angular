import { Component, OnInit } from "@angular/core";
//import { FormRegisterComponent } from "./components/form-register/form-register.component";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
	title = "";
	ngOnInit(): void {}
}
