"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var app_routing_module_1 = require("./app-routing.module");
var ng2_charts_1 = require("ng2-charts");
var app_component_1 = require("./app.component");
var navbar_component_1 = require("./navbar/navbar.component");
var footer_component_1 = require("./footer/footer.component");
var home_component_1 = require("./home/home.component");
var affordability_component_1 = require("./affordability/affordability.component");
var interest_component_1 = require("./interest/interest.component");
var invest101_component_1 = require("./invest101/invest101.component");
var resources_component_1 = require("./resources/resources.component");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            ng_bootstrap_1.NgbModule.forRoot(),
            app_routing_module_1.AppRoutingModule,
            ng2_charts_1.ChartsModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule
        ],
        declarations: [
            app_component_1.AppComponent,
            navbar_component_1.NavbarComponent,
            footer_component_1.FooterComponent,
            home_component_1.HomeComponent,
            affordability_component_1.AffordabilityComponent,
            interest_component_1.InterestComponent,
            invest101_component_1.Invest101Component,
            resources_component_1.ResourcesComponent,
            login_component_1.LoginFormComponent,
            register_component_1.RegisterFormComponent
        ],
        bootstrap: [
            app_component_1.AppComponent
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map