import { Component } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
	selector: "app-form-login",
	templateUrl: "./form-login.component.html",
	styleUrls: ["./form-login.component.scss"],
})
export class FormLoginComponent {
	form!: FormGroup;
	token = "";

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
	) {
		this.buildForm(); //llamamos al método
	}

	save(event: any) {
		if (this.form.valid) {
			console.log(this.form.value);
		} else {
			this.form.markAllAsTouched();
		}
	}

	private buildForm() {
		this.form = this.formBuilder.group({
			email: [
				"",
				[
					Validators.required,
					Validators.email,
					Validators.pattern(
						/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
					),
				],
			],
			password: [
				"",
				[
					Validators.required,
					Validators.pattern(
						/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{6,15}$/,
					),
				],
			],
		});
	}

	ngOnInit(): void {
		this.form.valueChanges.subscribe((value: any) => {
			console.log(value);
		});
	}

	getEmailValue() {
		console.log(this.emailField?.value);
	}
	getPasswordValue() {
		console.log(this.passwordField?.value);
	}
	get emailField() {
		return this.form.get("email");
	}

	get isEmailFieldValid() {
		return this.emailField?.touched && this.emailField.valid;
	}
	get isEmailFieldInValid() {
		return this.emailField?.touched && this.emailField.invalid;
	}

	get passwordField() {
		return this.form.get("password");
	}

	get isPasswordFieldValid() {
		return this.passwordField?.touched && this.passwordField.valid;
	}
	get isPasswordFieldInValid() {
		return this.passwordField?.touched && this.passwordField.invalid;
	}

	login() {
		this.authService
			.login("gis@gmail.com", "123456Gis#")
			.subscribe((rta) => {
				console.log(rta.access_token);
				this.token = rta.access_token;
			});
	}
}
