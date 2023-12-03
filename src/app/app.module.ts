import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app.routing.module";
import { AppComponent } from "./app.component";
import { ProductsComponent } from "./website/components/products/products.component";
import { ProductComponent } from "./website/components/product/product.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FormRegisterComponent } from "./website/components/form-register/form-register.component";
import { FormLoginComponent } from "./website/components/form-login/form-login.component";
import { SearchComponent } from "./website/components/search/search.component";
import { HeaderComponent } from "./website/components/header/header.component";
import { FooterComponent } from "./website/components/footer/footer.component";
import { TimeInterceptor } from "./interceptors/time.interceptor";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { HomeComponent } from "./website/pages/home/home.component";
import { NotFoundComponent } from "./website/pages/not-found/not-found.component";
import { CategoryComponent } from "./website/pages/category/category.component";
import { MyCartComponent } from "./website/pages/my-cart/my-cart.component";
import { LoginComponent } from "./website/pages/login/login.component";
import { RegisterComponent } from "./website/pages/register/register.component";
import { RecoveryComponent } from "./website/pages/recovery/recovery.component";
import { ProfileComponent } from "./website/pages/profile/profile.component";
import { ProductDetailComponent } from "./website/pages/product-detail/product-detail.component";
import { LayoutComponent } from "./website/components/layout/layout.component";

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
		ProductDetailComponent,
		LayoutComponent,
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
