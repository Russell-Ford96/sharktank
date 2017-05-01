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
var LoginFormComponent = (function () {
    function LoginFormComponent(fb) {
        this.fb = fb;
        this.submitted = false;
        this.formErrors = {
            'firstName': '',
            'lastName': '',
            'email': '',
            'password': ''
        };
        this.validationMessages = {
            'firstName': {
                'required': 'First name is required.'
            },
            'lastName': {
                'required': 'Last name is required.'
            },
            'email': {
                'required': 'Email is required.'
            },
            'password': {
                'required': 'Password is required.',
                'minlength': 'Minimum characters is 7.'
            }
        };
    }
    LoginFormComponent.prototype.onSubmit = function () {
        this.submitted = true;
        this.loginCredentials = this.loginForm.value;
        this.save();
    };
    LoginFormComponent.prototype.ngOnInit = function () {
        this.buildForm();
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
    LoginFormComponent.prototype.save = function () {
    };
    LoginFormComponent.prototype.goBack = function () {
    };
    return LoginFormComponent;
}());
LoginFormComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: './login.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], LoginFormComponent);
exports.LoginFormComponent = LoginFormComponent;
//# sourceMappingURL=login.component.js.map