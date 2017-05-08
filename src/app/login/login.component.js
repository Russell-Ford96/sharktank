"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var auth_service_1 = require("./auth.service");
var LoginFormComponent = (function () {
    function LoginFormComponent(fb, authService, router) {
        this.fb = fb;
        this.authService = authService;
        this.router = router;
        this.submitted = false;
        this.formErrors = {
            'email': '',
            'password': ''
        };
        this.validationMessages = {
            'email': {
                'required': 'Email is required.'
            },
            'password': {
                'required': 'Password is required.',
                'minlength': 'Minimum characters is 8.'
            }
        };
    }
    LoginFormComponent.prototype.ngOnInit = function () {
        this.buildForm();
    };
    LoginFormComponent.prototype.onSubmit = function () {
        this.submitted = true;
        this.loginCredentials = this.loginForm.value;
        this.save();
    };
    LoginFormComponent.prototype.save = function () {
        var _this = this;
        var token = this.authService.login(this.loginCredentials)
            .then(function (token) { return _this.storeToken(token); });
    };
    LoginFormComponent.prototype.storeToken = function (token) {
        if (token == '') {
            alert("Invalid login!");
        }
        else {
            localStorage.setItem("token", token);
            this.router.navigate(['/profile']);
            this.authService.hasToken = true;
        }
    };
    LoginFormComponent.prototype.cancel = function () {
        console.log("hit cancel");
    };
    LoginFormComponent.prototype.buildForm = function () {
        var _this = this;
        this.loginForm = this.fb.group({
            'email': ['', [
                    forms_1.Validators.required
                ]
            ],
            'password': ['', [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(8)
                ]
            ]
        });
        this.loginForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(); // (re)set validation messages now
    };
    LoginFormComponent.prototype.onValueChanged = function (data) {
        if (!this.loginForm) {
            return;
        }
        var form = this.loginForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    return LoginFormComponent;
}());
LoginFormComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: './login.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        auth_service_1.AuthService,
        router_1.Router])
], LoginFormComponent);
exports.LoginFormComponent = LoginFormComponent;
//# sourceMappingURL=login.component.js.map