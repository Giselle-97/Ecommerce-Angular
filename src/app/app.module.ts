import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app.routing.module";
import { AppComponent } from "./app.component";
import { ProductsComponent } from "./components/products/products.component";
import { ProductComponent } from "./components/product/product.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FormRegisterComponent } from "./components/form-register/form-register.component";
import { FormLoginComponent } from "./components/form-login/form-login.component";
import { SearchComponent } from "./components/search/search.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { TimeInterceptor } from "./interceptors/time.interceptor";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { CategoryComponent } from "./pages/category/category.component";
import { MyCartComponent } from "./pages/my-cart/my-cart.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { RecoveryComponent } from "./pages/recovery/recovery.component";
import { ProfileComponent } from "./pages/profile/profile.component";

@NgModule({
	declarations: [
		AppComponent,
		ProductsComponent,
		ProductComponent,
		FormRegisterComponent,
		FormLoginComponent,
		HeaderComponent,
		SearchComponent,
		FooterComponent,
		HomeComponent,
		NotFoundComponent,
		CategoryComponent,
		MyCartComponent,
		LoginComponent,
		RegisterComponent,
		RecoveryComponent,
		ProfileComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TimeInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
