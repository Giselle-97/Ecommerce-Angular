import { Component, OnInit } from "@angular/core";
import { StoreService } from "src/app/services/store.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
	title = "CreArte";
	imgMenu = "./assets/images/menu.png";
	imgLogo = "./assets/images/store-logo1.png";
	imgShoppingCar = "./assets/images/car-menu.png";

	activeMenu = false;
	counter = 0;

	constructor(private storeServices: StoreService) {}
	ngOnInit(): void {
		this.storeServices.myCart$.subscribe((products) => {
			this.counter = products.length;
		});
	}

	toggleMenu() {
		this.activeMenu = !this.activeMenu;
	}
}
