import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { ChartsModule } from 'ng2-charts';


import { AppComponent }  from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { BankingComponent } from './banking/banking.component';
import { LoginFormComponent } from './login/login.component';
import { RegisterFormComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { AddIncomeComponent } from './profile/add-income.component';
import { ProfileDetailResolve } from './profile/profile.resolve';
import { LogoutComponent } from './logout/logout.component';
import { RedeemComponent } from './redeem/redeem.component';

import { AuthService } from './login/auth.service';
import { ProfileService } from './profile/profile.service';

@NgModule({
    imports: [ 
        BrowserModule,
        NgbModule.forRoot(),
        AppRoutingModule,
        ChartsModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpModule
    ],
    declarations: [ 
        AppComponent, 
        NavbarComponent,
        FooterComponent,
        HomeComponent,
        LoginFormComponent,
        RegisterFormComponent,
        ProfileComponent,
        LogoutComponent,
        RedeemComponent,
        BankingComponent
    ],
    providers: [
        AuthService,
        AuthGuard,
        ProfileService,
        ProfileDetailResolve
    ],
    bootstrap: [ 
        AppComponent
    ]
})
export class AppModule { }
