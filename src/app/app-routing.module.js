"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var affordability_component_1 = require("./affordability/affordability.component");
var interest_component_1 = require("./interest/interest.component");
var invest101_component_1 = require("./invest101/invest101.component");
var resources_component_1 = require("./resources/resources.component");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var success_component_1 = require("./register/success.component");
var profile_component_1 = require("./profile/profile.component");
var logout_component_1 = require("./profile/logout.component");
var auth_guard_1 = require("./auth.guard");
var routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'affordability', component: affordability_component_1.AffordabilityComponent },
    { path: 'interest', component: interest_component_1.InterestComponent },
    { path: 'investment-101', component: invest101_component_1.Invest101Component },
    { path: 'resources', component: resources_component_1.ResourcesComponent },
    { path: 'login', component: login_component_1.LoginFormComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'register', component: register_component_1.RegisterFormComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'profile', component: profile_component_1.ProfileComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'success', component: success_component_1.SuccessComponent },
    { path: 'logout', component: logout_component_1.LogoutComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map