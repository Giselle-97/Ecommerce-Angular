import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/models/product.model";
import { ProductsService } from "src/app/services/products.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
	products: Product[] = [];
	limit = 20;
	offset = 0;

	constructor(private productsService: ProductsService) {}

	ngOnInit(): void {
		this.productsService.getAllProducts(10, 0).subscribe((data) => {
			this.products = data;
			this.offset += this.limit;
		});
	}

	onLoadMore() {
		this.productsService
			.getProductsByPage(this.limit, this.offset)
			.subscribe((data) => {
				this.products = this.products.concat(data); //concatenar el array que llegue
				this.offset += this.limit;
			});
	}
}
