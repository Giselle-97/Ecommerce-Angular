import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product, CreateProductDTO } from "../models/product.model";

@Injectable({
	providedIn: "root",
})
export class ProductsService {
	private apiUrl = "https://fakestoreapi.com/products";

	constructor(private http: HttpClient) {}

	getAllProducts() {
		return this.http.get<Product[]>(this.apiUrl);
	}
	//request para obtener el id
	getProduct(id: string) {
		return this.http.get<Product>(`${this.apiUrl}/${id}`);
	}
	//evento para el método post
	create(dto: CreateProductDTO) {
		return this.http.post<Product>(this.apiUrl, dto);
	}

	update(id: string, dto: any) {
		return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
	}
}
