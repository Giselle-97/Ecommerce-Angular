import { Component, OnInit } from "@angular/core";
import { StoreService } from "src/app/services/store.service";
import { AuthService } from "src/app/services/auth.service";
import { User } from "../../models/user.model";
import { CategoriesService } from "src/app/services/categories.service";
import { Category } from "src/app/models/category.model";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
	title = "CreArte";
	imgMenu = "./assets/images/menu.png";
	imgLogo = "./assets/images/logo.png";
	imgShoppingCar = "./assets/images/car-menu.png";
	//token = "";
	profile: User | null = null;

	activeMenu = false;
	counter = 0;
	categories: Category[] = [];

	constructor(
		private storeServices: StoreService,
		private authService: AuthService,
		private categoriesService: CategoriesService,
	) {}
	ngOnInit(): void {
		this.storeServices.myCart$.subscribe((products) => {
			this.counter = products.length;
		});
		this.getAllCategories();
	}

	toggleMenu() {
		this.activeMenu = !this.activeMenu;
	}

	login() {
		// this.authService.login('sebas@mail.com', '1212')
		// .subscribe(rta => {
		//   this.token = rta.access_token;
		//   console.log(this.token);
		//   this.getProfile();
		// });
		this.authService
			.loginAndGet("sebas@mail.com", "1212")
			.subscribe((user: User | null) => {
				this.profile = user;
			});
	}
	getAllCategories() {
		this.categoriesService.getAll().subscribe((data) => {
			this.categories = data;
		});
	}
}
