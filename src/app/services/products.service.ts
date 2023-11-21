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
import { retry, catchError } from "rxjs/operators"; //para reitnentar cargar la página si falla
import { throwError } from "rxjs";
//import { environment } from "./../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class ProductsService {
	//private apiUrl = `${environment.API_URL}api/products`;
	//private apiUrl = "/api/products";
	private apiUrl = "https://fakestoreapi.com/products";
	//package.json=> "start:proxy": "ng serve --proxy-config ./proxy.config.json",

	constructor(private http: HttpClient) {}

	getAllProducts(limit?: number, offset?: number) {
		let params = new HttpParams();
		if (limit != undefined && offset != undefined) {
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
		return this.http
			.get<Product>(`${this.apiUrl}/${id}`)

			.pipe(
				catchError((error: HttpErrorResponse) => {
					switch (error.status) {
						case HttpStatusCode.Conflict:
							return throwError(
								() =>
									new Error(
										"Ups algo esta fallando en el server",
									),
							);

						case HttpStatusCode.NotFound:
							return throwError(
								() => new Error("El producto no existe"),
							);

						default:
							return throwError(
								() => new Error("Ups algo salio mal"),
							);
					}
				}),
			);
	}
	//Paginación
	getProductsByPage(limit: number, offset: number) {
		return this.http.get<Product[]>(`${this.apiUrl}/`, {
			params: { limit, offset },
		});
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
