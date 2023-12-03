import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ProductsComponent } from "./components/products/products.component";
import { ProductComponent } from "./components/product/product.component";
import { FormRegisterComponent } from "./components/form-register/form-register.component";
import { FormLoginComponent } from "./components/form-login/form-login.component";
import { SearchComponent } from "./components/search/search.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [
		ProductsComponent,
		ProductComponent,
		FormRegisterComponent,
		FormLoginComponent,
		SearchComponent,
		FooterComponent,
	],
	imports: [CommonModule, RouterModule, ReactiveFormsModule],
	exports: [ProductComponent, ProductsComponent],
})
export class SharedModule {}
