import { Injectable } from "@angular/core";
import {
	HttpClient,
	HttpParams,
	HttpErrorResponse,
	HttpStatusCode,
} from "@angular/common/http";
import {
	Product,
	CreateProductDTO,
	UpdateProductDTO,
} from "../models/product.model";
import { retry, catchError, map } from "rxjs/operators"; //para reitnentar cargar la página si falla
import { throwError, zip } from "rxjs";
//import { environment } from "./../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class ProductsService {
	private apiUrl = "https://fakestoreapi.com/products";

	//CORS
	//private apiUrl = "/api/products";
	//package.json=> "start:proxy": "ng serve --proxy-config ./proxy.config.json",

	//MANEJO DE AMBIENTES
	//private apiUrl = `${environment.API_URL}api/products`;

	constructor(private http: HttpClient) {}

	getAllProducts(limit?: number, offset?: number) {
		let params = new HttpParams();
		if (limit && offset) {
			params = params.set("limit", limit);
			params = params.set("offset", offset);
		}
		return this.http.get<Product[]>(this.apiUrl, { params }).pipe(retry(3));
	}

	/*	getAllProducts() {
		return this.http.get<Product[]>(this.apiUrl);
	} */

	//request para obtener el id
	getProduct(id: string) {
		return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
			catchError((err: HttpErrorResponse) => {
				if (err.status === HttpStatusCode.NotFound) {
					return throwError(() => "Product not found");
				}
				if (err.status === HttpStatusCode.Forbidden) {
					return throwError(
						() =>
							"You do not have permission to access this product",
					);
				}
				if (err.status === HttpStatusCode.Unauthorized) {
					return throwError(
						() => "You must be logged in to access this product",
					);
				}

				return throwError(
					() => "An error has occurred, try again later",
				);
			}),
		);
	}

	//Paginación
	getProductsByPage(limit: number, offset: number) {
		return this.http
			.get<Product[]>(`${this.apiUrl}`, {
				params: { limit, offset },
			})
			.pipe(
				map((products) =>
					products.map((item) => {
						return {
							...item,
							taxes: 0.21 * item.price,
						};
					}),
				),
			);
	}

	//para hacer las dos cosas al mismo tiempo read an update
	//zip para manejar varias peticiones en paralelo
	fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
		return zip(this.getProduct(id), this.update(id, dto));
	}

	//evento para el método post
	create(dto: CreateProductDTO) {
		return this.http.post<Product>(this.apiUrl, dto);
	}
	//actualizar
	update(id: string, dto: UpdateProductDTO) {
		return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
	}
	//delete
	delete(id: string) {
		return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
	}
}
