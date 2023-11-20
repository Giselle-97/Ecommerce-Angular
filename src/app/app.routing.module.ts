import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router"; // CLI imports router
import { ProductsComponent } from "./components/products/products.component";
import { FormRegisterComponent } from "./components/form-register/form-register.component";
import { FormLoginComponent } from "./components/form-login/form-login.component";

const routes: Routes = [
	{ path: "", redirectTo: "/products", pathMatch: "full" },
	{ path: "products", component: ProductsComponent },
	{ path: "register", component: FormRegisterComponent },
	{ path: "login", component: FormLoginComponent },
	//{ path: "**", component: PageNotFoundComponent },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
