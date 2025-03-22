import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import { UsersService } from "../services/users/users";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule
    ],
    declarations: [
        HomeComponent
    ],
    providers: [
        UsersService
    ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule {
}
