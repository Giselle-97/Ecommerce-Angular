import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router"; // CLI imports router
import { ProductsComponent } from "./components/products/products.component";
import { FormRegisterComponent } from "./components/form-register/form-register.component";
import { FormLoginComponent } from "./components/form-login/form-login.component";
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { CategoryComponent } from "./pages/category/category.component";
import { MyCartComponent } from "./pages/my-cart/my-cart.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { RecoveryComponent } from "./pages/recovery/recovery.component";
import { ProfileComponent } from "./pages/profile/profile.component";

const routes: Routes = [
	{
		path: "",
		redirectTo: "/home",
		pathMatch: "full",
	},
	{
		path: "home",
		component: HomeComponent,
	},
	{
		path: "category",
		component: CategoryComponent,
	},
	{
		path: "mycart",
		component: MyCartComponent,
	},
	{
		path: "login",
		component: LoginComponent,
	},
	{
		path: "register",
		component: RegisterComponent,
	},
	{
		path: "recovery",
		component: RecoveryComponent,
	},
	{
		path: "**",
		component: NotFoundComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
