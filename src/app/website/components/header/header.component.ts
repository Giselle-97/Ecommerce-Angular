import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StoreService } from "src/app/services/store.service";
import { AuthService } from "src/app/services/auth.service";
import { TokenService } from "src/app/services/token.service";
import { User } from "src/app/models/user.model";
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
		private router: Router,
		private tokenService: TokenService,
	) {}

	ngOnInit(): void {
		this.storeServices.myCart$.subscribe((products) => {
			this.counter = products.length;
		});
		this.getAllCategories();
		this.authService.user$.subscribe((data) => {
			this.profile = data;
		});
		const token = this.tokenService.getToken();
		if (token) {
			this.authService.getProfile().subscribe();
		}
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
		this.authService.loginAndGet("sebas@mail.com", "1212").subscribe(() => {
			this.router.navigate(["/profile"]);
		});
	}
	getAllCategories() {
		this.categoriesService.getAll().subscribe((data) => {
			this.categories = data;
		});
	}

	logout() {
		this.authService.logout();
		this.profile = null;
		this.router.navigate(["/home"]);
	}
}
