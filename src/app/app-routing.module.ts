import { NgModule }                     from '@angular/core';
import { Routes, RouterModule }         from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AffordabilityComponent } from './affordability/affordability.component';
import { InterestComponent } from './interest/interest.component';
import { FinanceComponent } from './finance/finance.component';
import { LoginFormComponent } from './login/login.component';
import { RegisterFormComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileDetailResolve } from './profile/profile.resolve';
import { InvestingComponent } from './investing/investing.component';
import { LogoutComponent } from './logout/logout.component';
import { RedeemComponent } from './redeem/redeem.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'affordability', component: AffordabilityComponent, resolve: { profile: ProfileDetailResolve } },
    { path: 'login', component: LoginFormComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterFormComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], resolve: { profile: ProfileDetailResolve } },
    { path: 'logout', component: LogoutComponent },
    { path: 'redeem', component: RedeemComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: [
        ProfileDetailResolve
    ]
})
export class AppRoutingModule {}
