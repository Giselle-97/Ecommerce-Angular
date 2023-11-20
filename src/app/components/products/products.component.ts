import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/models/product.model";
import { ProductsService } from "src/app/services/products.service";
import { StoreService } from "src/app/services/store.service";

@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
	myShoppingCart: Product[] = [];
	total = 0;
	products: Product[] = [];

	//inyección de dependencias
	constructor(
		private storeService: StoreService,
		private productsService: ProductsService,
	) {
		this.myShoppingCart = this.storeService.getShoppingCart();
	}
	ngOnInit(): void {
		this.productsService.getAllProducts().subscribe((data) => {
			this.products = data;
		});
	}
	onAddToShoppingCart(product: Product) {
		//this.myShoppingCart.push(product);
		this.storeService.addProduct(product);
		this.total = this.storeService.getTotal();
	}
}
