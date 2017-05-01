import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { ChartsModule } from 'ng2-charts';


import { AppComponent }  from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AffordabilityComponent } from './affordability/affordability.component';
import { InterestComponent } from './interest/interest.component';
import { Invest101Component } from './invest101/invest101.component';
import { ResourcesComponent } from './resources/resources.component';
import { LoginFormComponent } from './login/login.component';
import { RegisterFormComponent } from './register/register.component';

@NgModule({
    imports: [ 
        BrowserModule,
        NgbModule.forRoot(),
        AppRoutingModule,
        ChartsModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [ 
        AppComponent, 
        NavbarComponent,
        FooterComponent,
        HomeComponent,
        AffordabilityComponent,
        InterestComponent,
        Invest101Component,
        ResourcesComponent,
        LoginFormComponent,
        RegisterFormComponent
    ],
    bootstrap: [ 
        AppComponent
    ]
})
export class AppModule { }
