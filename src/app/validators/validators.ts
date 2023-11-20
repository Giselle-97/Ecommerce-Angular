import { FormGroup } from "@angular/forms";

export class MyValidators {
	static matchPasswords(form: FormGroup) {
		const password = form?.get("password")?.value;
		const confirmPassword = form?.get("confirmPassword")?.value;
		if (password && confirmPassword && password === confirmPassword) {
			return null;
		}
		return { match_password: true };
	}
}
