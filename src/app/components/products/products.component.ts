import { Component, EventEmitter, Input, Output } from "@angular/core";
import { switchMap } from "rxjs";
import { Product, CreateProductDTO } from "src/app/models/product.model";
import { ProductsService } from "src/app/services/products.service";
import { StoreService } from "src/app/services/store.service";
//import Swal from "sweetalert2";

@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
})
export class ProductsComponent {
	@Input() products: Product[] = [];
	@Output() loadMore = new EventEmitter();

	myShoppingCart: Product[] = [];
	total = 0;
	showProductDetail = false;
	statusDetail: "loading" | "success" | "error" | "init" = "init"; //tiene todo los estados posibles que va a tener la peticion de detalle onShowDetail

	productChosen: Product = {
		id: "",
		title: "",
		price: 0,
		image: "",
		description: "",
		category: "",
	};

	//inyección de dependencias
	constructor(
		private storeService: StoreService,
		private productsService: ProductsService,
	) {
		this.myShoppingCart = this.storeService.getShoppingCart();
	}

	onAddToShoppingCart(product: Product) {
		//this.myShoppingCart.push(product);
		this.storeService.addProduct(product);
		this.total = this.storeService.getTotal();
	}

	//cambia el estado del menu lateral
	toggleProductDetail() {
		this.showProductDetail = !this.showProductDetail;
	}

	onShowDetail(id: string) {
		this.statusDetail = "loading";
		this.toggleProductDetail();
		this.productsService.getProduct(id).subscribe(
			(data) => {
				this.productChosen = data;
				this.statusDetail = "success";
			},
			(errorMsg) => {
				window.alert(errorMsg);
				this.statusDetail = "error";
			},
		);
	}

	//Evitando el callback hell
	//switchMap manejar dependencias
	/*readAndUpdate(id: string) {
		this.productsService
			.getProduct(id)
			.pipe(
				switchMap((product) =>
					this.productsService.update(product.id, {
						title: "change",
					}),
				),
			)
			.subscribe((data) => {
				console.log(data);
			});
		this.productsService
			.fetchReadAndUpdate(id, { title: "change" })
			.subscribe((response) => {
				const read = response[0];
				const update = response[1];
			});
	}*/

	createNewProduct() {
		const product: CreateProductDTO = {
			title: "Nuevo producto",
			description: "lalala",
			image: "",
			price: 0,
			category: "",
			id: "",
		};
		this.productsService.create(product).subscribe((data) => {
			this.products.unshift(data);
		});
	}

	updateProduct() {
		const changes = {
			title: "Nuevo titulo klk",
		};
		const id = this.productChosen.id;
		this.productsService.update(id, changes).subscribe((data) => {
			console.log("Updated:", data);
			const productIndex = this.products.findIndex(
				(item) => item.id === this.productChosen.id,
			);
			this.products[productIndex] = data;
			this.productChosen = data;
		});
	}
	//método de eliminar elemento=splice
	deleteProduct() {
		const id = this.productChosen.id;
		this.productsService.delete(id).subscribe(() => {
			const productIndex = this.products.findIndex(
				(item) => item.id === this.productChosen.id,
			);
			this.products.splice(productIndex, 1);
			this.showProductDetail = false;
		});
	}

	//cargar la siguiente pagina
	onLoadMore() {
		this.loadMore.emit();
	}

	//
}
