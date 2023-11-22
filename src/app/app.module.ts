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
