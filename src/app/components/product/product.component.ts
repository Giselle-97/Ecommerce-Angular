import { Component, Input, Output, EventEmitter } from "@angular/core";
import { StoreService } from "src/app/services/store.service";
import { Product } from "src/app/models/product.model";

@Component({
	selector: "app-product",
	templateUrl: "./product.component.html",
	styleUrls: ["./product.component.scss"],
})
export class ProductComponent {
	imgShoppingCart = "./assets/images/shopping.png";

	@Input() product: Product = {
		id: "",
		title: "",
		price: 0,
		image: "",
		description: "",
		category: "",
	};

	@Output() addedProduct = new EventEmitter<Product>();

	onAddToCart() {
		this.addedProduct.emit(this.product);
	}
}
