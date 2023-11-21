import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import {
	Product,
	CreateProductDTO,
	UpdateProductDTO,
} from "../models/product.model";
import { retry } from "rxjs/operators"; //para reitnentar cargar la página si falla

@Injectable({
	providedIn: "root",
})
export class ProductsService {
	private apiUrl = "https://fakestoreapi.com/products";

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
		return this.http.get<Product>(`${this.apiUrl}/${id}`);
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
