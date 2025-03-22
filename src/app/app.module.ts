import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StoreModule } from "@ngrx/store";
import { HomeModule } from "./home/home.module";
import { HttpClientModule } from '@angular/common/http';
import { userReducer } from './store/reducers/user.reducer';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        HomeModule,
        StoreModule.forRoot({ users: userReducer }),
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
