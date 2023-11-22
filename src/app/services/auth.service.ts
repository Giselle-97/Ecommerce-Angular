import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Auth } from "../models/auth.model";
import { User } from "../models/user.model";
import { switchMap } from "rxjs";
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

	//
	getProfile(token: string) {
		// const headers = new HttpHeaders();
		// headers.set('Authorization',  `Bearer ${token}`);
		return this.http.get<User>(`${this.apiUrl}/profile`, {
			headers: {
				Authorization: `Bearer ${token}`,
				// 'Content-type': 'application/json'
			},
		});
	}

	loginAndGet(email: string, password: string) {
		return this.login(email, password).pipe(
			switchMap((rta) => this.getProfile(rta.access_token)),
		);
	}

	//
}
