import { Component, OnInit } from "@angular/core";
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
export class ProductsComponent implements OnInit {
	myShoppingCart: Product[] = [];
	total = 0;
	products: Product[] = [];
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

	limit = 10;
	offset = 0;

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

	/*
	//como recibe un atributo hay que agregar en html el $event
onShowProductDetail(id: string) {
    this.statusDetail = 'loading';
    this.productsService.getProduct(id)
      .pipe(
        tap(() => this.toggleProductDetail()), // realiza una acción cuando se emite un valor
        catchError((error) => { // maneja los errores que puedan ocurrir
          console.error(error);
          this.statusDetail = 'error';
          return of(null); // retorna un observable con un valor nulo para que el flujo continúe
        })
      )
      .subscribe((data) => {
        if (data) { // verifica que la respuesta sea válida antes de asignarla
          this.productChosen = data;
          this.statusDetail = 'success';
        }
      });
  }
	}*/

	//Evitando el callback hell
	//switchMap manejar dependencias
	readAndUpdate(id: string) {
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
	}

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
