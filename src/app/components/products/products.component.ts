import { Component, OnInit } from "@angular/core";
import {
	Product,
	CreateProductDTO,
	UpdateProductDTO,
} from "src/app/models/product.model";
import { ProductsService } from "src/app/services/products.service";
import { StoreService } from "src/app/services/store.service";
import Swal from "sweetalert2";

@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
	myShoppingCart: Product[] = [];
	total = 0;
	products: Product[] = [];
	showProductDetail = false;

	productChosen: Product = {
		id: "",
		title: "",
		price: 0,
		image: "",
		description: "",
		category: "",
	};

	limit = 20;
	offset = 0;
	statusDetail: "loading" | "success" | "error" | "init" = "init"; //tiene todo los estados posibles que va a tener la peticion de detalle onShowDetail

	//inyección de dependencias
	constructor(
		private storeService: StoreService,
		private productsService: ProductsService,
	) {
		this.myShoppingCart = this.storeService.getShoppingCart();
	}

	/*ngOnInit(): void {
		this.productsService.getAllProducts.subscribe((data) => {
			this.products = data;
		});
	} */
	ngOnInit(): void {
		this.loadMore();
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
		this.productsService.getProduct(id).subscribe({
			next: (data) => {
				this.toggleProductDetail();
				this.productChosen = data;
				this.statusDetail = "success";
			},
			error: (errorMsg) => {
				this.statusDetail = "error";
				Swal.fire({
					title: "Error!",
					text: errorMsg,
					icon: "error",
					confirmButtonText: "Ok",
				});
			},
		});
	}
	/*
	//como recibe un atributo hay que agregar en html el $event
	onShowDetail(id: string) {
		this.statusDetail = "loading";
		this.productsService.getProduct(id).subscribe(
			(data) => {
				console.log("product", data);
				this.toggleProductDetail(); //para activar el layout
				this.productChosen = data;
				this.statusDetail = "success";
			},
			(error) => {
				console.error(error);
				this.statusDetail = "error";
			},
		);
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

	/*updateProduct() {
		const changes: UpdateProductDTO = {
			title: "nuevo title",
		};
		const id = this.productChosen.id;
		this.productsService.update(id, changes).subscribe((data) => {
			const productIndex = this.products.findIndex(
				(item) => item.id === this.productChosen.id,
			); //para mostrar la actualización
			this.products[productIndex] = data;
		});
	}*/
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
	loadMore() {
		this.productsService
			.getProductsByPage(this.limit, this.offset)
			.subscribe((data) => {
				this.products = this.products.concat(data); //concatenar el array que llegue
				this.offset += this.limit;
			});
	}

	//
}
