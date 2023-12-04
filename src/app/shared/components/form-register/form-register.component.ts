import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MyValidators } from "src/app/validators/validators";
import { UsersService } from "src/app/services/users.service";

@Component({
	selector: "app-form-register",
	templateUrl: "./form-register.component.html",
	styleUrls: ["./form-register.component.scss"],
})
export class FormRegisterComponent implements OnInit {
	form!: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private usersService: UsersService,
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
		this.form = this.formBuilder.group(
			{
				name: [
					"",
					[
						Validators.required,
						Validators.maxLength(20),
						Validators.pattern(/^[a-zA-Z ]+$/),
					],
				],
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
				confirmPassword: ["", [Validators.required]],
			},
			{
				validators: MyValidators.matchPasswords,
			},
		);
	}

	get nameField() {
		return this.form.get("name");
	}

	ngOnInit(): void {
		this.form.valueChanges.subscribe((value: any) => {
			console.log(value);
		});
	}

	getNameValue() {
		console.log(this.nameField?.value);
	}
	getEmailValue() {
		console.log(this.emailField?.value);
	}
	getPasswordValue() {
		console.log(this.passwordField?.value);
	}

	get isNameFieldValid() {
		return this.nameField?.touched && this.nameField.valid;
	}
	get isNameFieldInValid() {
		return this.nameField?.touched && this.nameField.invalid;
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

	get confirmPasswordField() {
		return this.form.get("confirmPassword");
	}

	get isConfirmPasswordFieldValid() {
		return (
			this.confirmPasswordField?.touched &&
			this.confirmPasswordField.valid
		);
	}
	get isConfirmPasswordFieldInValid() {
		return (
			this.confirmPasswordField?.touched &&
			this.confirmPasswordField.invalid
		);
	}
	//
	createUser() {
		this.usersService
			.create({
				name: "Gis", //mor_2314
				email: "gis@gmail.com",
				password: "123456Gis", //83r5^_
				role: "customer",
			})
			.subscribe((rta) => {
				console.log(rta);
			});
	}
}
