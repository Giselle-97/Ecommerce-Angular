import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs";
import { Product } from "src/app/models/product.model";
import { categories } from "src/app/models/category.model"; // Cambiado el path
import { ProductsService } from "src/app/services/products.service";

@Component({
	selector: "app-category",
	templateUrl: "./category.component.html",
	styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
	categoryName: string | null = null; // Cambiado el nombre de la variable
	limit = 10;
	offset = 0;
	products: Product[] = [];

	constructor(
		private route: ActivatedRoute,
		private productsService: ProductsService,
	) {}

	ngOnInit(): void {
		this.route.paramMap
			.pipe(
				switchMap((params) => {
					this.categoryName = params.get("id");
					if (this.categoryName) {
						return this.productsService.getByCategory(
							this.categoryName,
							this.limit,
							this.offset,
						);
					}
					return [];
				}),
			)
			.subscribe((data) => {
				this.products = data;
			});
	}

	//
}
