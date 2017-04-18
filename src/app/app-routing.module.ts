import { NgModule }                     from '@angular/core';
import { Routes, RouterModule }         from '@angular/router';

import { NavbarComponent } from './navbar.component';
import { HomeComponent } from './home.component';
import { AffordabilityComponent } from './affordability.component';
import { InterestComponent } from './interest.component';
import { Invest101Component } from './invest101.component';
import { ResourcesComponent } from './resources.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'affordability', component: AffordabilityComponent },
    { path: 'interest', component: InterestComponent },
    { path: 'investment-101', component: Invest101Component },
    { path: 'resources', component: ResourcesComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
