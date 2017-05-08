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
import { AffordabilityComponent } from './affordability/affordability.component';
import { InterestComponent } from './interest/interest.component';
import { LoginFormComponent } from './login/login.component';
import { RegisterFormComponent } from './register/register.component';
import { SuccessComponent } from './register/success.component';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './profile/logout.component';
import { AuthGuard } from './auth.guard';
import { AddIncomeComponent } from './profile/add-income.component';
import { ProfileDetailResolve } from './profile/profile.resolve';
import { InvestingComponent } from './investing/investing.component'
import { FinanceComponent } from './finance/finance.component';

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
        AffordabilityComponent,
        InterestComponent,
        LoginFormComponent,
        RegisterFormComponent,
        ProfileComponent,
        LogoutComponent,
        SuccessComponent,
        AddIncomeComponent,
        InvestingComponent,
        FinanceComponent
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
