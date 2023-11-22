import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Auth } from "../models/auth.model";
//import { environment } from "./../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private apiUrl = "https://fakestoreapi.com/auth";

	constructor(private http: HttpClient) {}

	login(email: string, password: string) {
		return this.http.post<Auth>(`${this.apiUrl}/login`, {
			email,
			password,
		});
	}
	profile(token: string) {
		return this.http.get(`${this.apiUrl}/profile`);
	}
}
