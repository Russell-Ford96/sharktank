import { NgModule }                     from '@angular/core';
import { Routes, RouterModule }         from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AffordabilityComponent } from './affordability/affordability.component';
import { InterestComponent } from './interest/interest.component';
import { FinanceComponent } from './finance/finance.component';
import { LoginFormComponent } from './login/login.component';
import { RegisterFormComponent } from './register/register.component';
import { SuccessComponent } from './register/success.component';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './profile/logout.component';
import { ProfileDetailResolve } from './profile/profile.resolve';
import { InvestingComponent } from './investing/investing.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'affordability', component: AffordabilityComponent },
    { path: 'interest', component: InterestComponent },
    { path: 'investing', component: InvestingComponent},
    { path: 'finance', component: FinanceComponent },
    { path: 'login', component: LoginFormComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterFormComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], resolve: { profile: ProfileDetailResolve } },
    { path: 'success', component: SuccessComponent },
    { path: 'logout', component: LogoutComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: [
        ProfileDetailResolve
    ]
})
export class AppRoutingModule {}
