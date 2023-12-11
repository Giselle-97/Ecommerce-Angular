import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs";
import { Product } from "src/app/models/product.model";
import { categories } from "src/app/models/category.model"; // Cambiado el path
//import { ProductsService } from "src/app/services/products.service";
import { CategoriesService } from "src/app/services/categories.service";

@Component({
	selector: "app-category",
	templateUrl: "./category.component.html",
	styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
	//categoryName: string | null = null; // Cambiado el nombre de la variable
	limit = 10;
	offset = 0;
	products: Product[] = [];

	constructor(
		private route: ActivatedRoute,
		private categoriesService: CategoriesService,
	) {}

	ngOnInit(): void {
		this.route.paramMap
			.pipe(
				switchMap((params) => {
					const categoryName = params.get("name");
					if (categoryName) {
						return this.categoriesService.getByCategoryName(
							categoryName,
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
