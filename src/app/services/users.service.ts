import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

//import { environment } from "./../../environments/environment";
import { User, CreateUserDTO } from "./../../app/models/user.model";

@Injectable({
	providedIn: "root",
})
export class UsersService {
	private apiUrl = "https://fakestoreapi.com/users";

	constructor(private http: HttpClient) {}

	//crea un usuario
	create(dto: CreateUserDTO) {
		return this.http.post<User>(this.apiUrl, dto);
	}

	//obtiene todos los usuarios
	getAll(dto: CreateUserDTO) {
		return this.http.get<User[]>(this.apiUrl);
	}
}
