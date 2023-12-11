import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Category } from "../models/category.model";
import { environment } from "./../../environments/environment";
import { Product } from "../models/product.model";

@Injectable({
	providedIn: "root",
})
export class CategoriesService {
	private apiUrl = `${environment.API_URL}/products`;

	constructor(private http: HttpClient) {}

	getAll(limit?: number, offset?: number) {
		let params = new HttpParams();
		if (limit && offset) {
			params = params.set("limit", limit.toString());
			params = params.set("offset", offset.toString());
		}
		const api = `${this.apiUrl}/categories`;
		return this.http.get<Category[]>(api, { params });
	}

	getByCategoryName(categoryName: string, limit?: number, offset?: number) {
		let params = new HttpParams();
		if (limit && offset) {
			params = params.set("limit", limit.toString());
			params = params.set("offset", offset.toString());
		}
		const api = `${this.apiUrl}/category/${categoryName}`;
		return this.http.get<Product[]>(api, { params });
	}
}
