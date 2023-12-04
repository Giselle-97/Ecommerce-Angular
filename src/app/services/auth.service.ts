import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Auth } from "../models/auth.model";
import { User } from "../models/user.model";
import { BehaviorSubject, switchMap, tap } from "rxjs";
import { TokenService } from "./token.service";
//import { environment } from "./../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private apiUrl = "https://fakestoreapi.com/auth";
	private user = new BehaviorSubject<User | null>(null);
	user$ = this.user.asObservable();

	constructor(private http: HttpClient, private tokenService: TokenService) {}

	getCurrentUser() {
		const token = this.tokenService.getToken();
		if (token) {
			this.getProfile().subscribe();
		}
	}

	login(email: string, password: string) {
		return this.http
			.post<Auth>(`${this.apiUrl}/login`, { email, password })
			.pipe(
				tap((response) =>
					this.tokenService.saveToken(response.access_token),
				),
			);
	}

	getProfile() {
		// const headers = new HttpHeaders();
		// tap: para realizar una acción
		return this.http
			.get<User>(`${this.apiUrl}/profile`)
			.pipe(tap((user) => this.user.next(user)));
	}

	loginAndGet(email: string, password: string) {
		return this.login(email, password).pipe(
			switchMap(() => this.getProfile()),
		);
	}

	logout() {
		this.tokenService.removeToken();
		this.user.next(null);
	}
	//
}
