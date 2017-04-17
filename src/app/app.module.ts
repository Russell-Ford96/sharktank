import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }  from './app.component';
import { NavbarComponent } from './navbar.component';

@NgModule({
    imports: [ 
        BrowserModule,
        NgbModule.forRoot()
    ],
    declarations: [ 
        AppComponent, 
        NavbarComponent 
    ],
    bootstrap: [ 
        AppComponent
    ]
})
export class AppModule { }
