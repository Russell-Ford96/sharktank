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
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var profile_component_1 = require("./profile/profile.component");
var profile_resolve_1 = require("./profile/profile.resolve");
var logout_component_1 = require("./logout/logout.component");
var redeem_component_1 = require("./redeem/redeem.component");
var auth_guard_1 = require("./auth.guard");
var routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'affordability', component: affordability_component_1.AffordabilityComponent, resolve: { profile: profile_resolve_1.ProfileDetailResolve } },
    { path: 'login', component: login_component_1.LoginFormComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'register', component: register_component_1.RegisterFormComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'profile', component: profile_component_1.ProfileComponent, canActivate: [auth_guard_1.AuthGuard], resolve: { profile: profile_resolve_1.ProfileDetailResolve } },
    { path: 'logout', component: logout_component_1.LogoutComponent },
    { path: 'redeem', component: redeem_component_1.RedeemComponent, canActivate: [auth_guard_1.AuthGuard] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule],
        providers: [
            profile_resolve_1.ProfileDetailResolve
        ]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map