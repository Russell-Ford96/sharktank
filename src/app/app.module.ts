import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }  from './app.component';
import { NavbarComponent } from './navbar.component';
import { HomeComponent } from './home.component';
import { AffordabilityComponent } from './affordability.component';
import { InterestComponent } from './interest.component';
import { Invest101Component } from './invest101.component';
import { ResourcesComponent } from './resources.component';

@NgModule({
    imports: [ 
        BrowserModule,
        NgbModule.forRoot(),
        AppRoutingModule
    ],
    declarations: [ 
        AppComponent, 
        NavbarComponent,
        HomeComponent,
        AffordabilityComponent,
        InterestComponent,
        Invest101Component,
        ResourcesComponent
    ],
    bootstrap: [ 
        AppComponent
    ]
})
export class AppModule { }
