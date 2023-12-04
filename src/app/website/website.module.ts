import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WebsiteRoutingModule } from "./website-routing.module";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./pages/home/home.component";
import { MyCartComponent } from "./pages/my-cart/my-cart.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { RecoveryComponent } from "./pages/recovery/recovery.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { SharedModule } from "../shared/shared.module";
import { LayoutComponent } from "./components/layout/layout.component";
import { QuicklinkModule } from "ngx-quicklink";

@NgModule({
	declarations: [
		HeaderComponent,
		HomeComponent,
		MyCartComponent,
		LoginComponent,
		RegisterComponent,
		RecoveryComponent,
		ProfileComponent,
		ProductDetailComponent,
		LayoutComponent,
	],
	imports: [
		CommonModule,
		WebsiteRoutingModule,
		SharedModule,
		QuicklinkModule,
	],
})
export class WebsiteModule {}
