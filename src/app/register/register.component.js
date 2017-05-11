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
var equal_validator_directive_1 = require("./equal-validator.directive");
var auth_service_1 = require("../login/auth.service");
var RegisterFormComponent = (function () {
    function RegisterFormComponent(fb, authService, router) {
        this.fb = fb;
        this.authService = authService;
        this.router = router;
        this.submitted = false;
        this.formErrors = {
            'firstName': '',
            'lastName': '',
            'email': '',
            'password': '',
            'confirmPassword': ''
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
                'minlength': 'Minimum characters is 8.',
                'mismatchedPasswords': 'Passwords must match.',
                'validateEqual': 'Validate equal'
            },
            'confirmPassword': {
                'required': 'Password is required.',
                'minlength': 'Minimum characters is 8.',
                'mismatchedPasswords': 'Passwords must match.'
            }
        };
    }
    RegisterFormComponent.prototype.onSubmit = function () {
        this.submitted = true;
        this.credentials = this.registerForm.value;
        this.save();
    };
    RegisterFormComponent.prototype.ngOnInit = function () {
        this.buildForm();
    };
    RegisterFormComponent.prototype.buildForm = function () {
        var _this = this;
        this.registerForm = this.fb.group({
            'firstName': ['', [
                    forms_1.Validators.required
                ]
            ],
            'lastName': ['', [
                    forms_1.Validators.required
                ]
            ],
            'email': ['', [
                    forms_1.Validators.required
                ]
            ],
            'password': ['', forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(8)
                ])
            ],
            'confirmPassword': ['', [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(8)
                ]
            ]
        }, { validator: equal_validator_directive_1.matchingPasswords('password', 'confirmPassword') });
        this.registerForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(); // (re)set validation messages now
    };
    RegisterFormComponent.prototype.onValueChanged = function (data) {
        if (!this.registerForm) {
            return;
        }
        var form = this.registerForm;
        console.log(form);
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    console.log(control.errors);
                    console.log(key, messages[key]);
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    RegisterFormComponent.prototype.save = function () {
        var _this = this;
        this.authService.register(this.credentials).then(function (res) { return _this.displayServerMessage(res); });
    };
    RegisterFormComponent.prototype.reset = function () {
        this.registerForm.setValue({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
        for (var error in this.formErrors) {
            this.formErrors[error] = '';
        }
    };
    RegisterFormComponent.prototype.displayServerMessage = function (response) {
        if (response == "success") {
            this.router.navigate(['/success']);
        }
        else {
            this.formErrors['email'] += response + ' ';
        }
    };
    RegisterFormComponent.prototype.isSamePassword = function (passwordKey, confirmPasswordKey) {
        return function (group) {
            var password = group.controls[passwordKey];
            var confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value) {
                return {
                    notSamePassword: true
                };
            }
        };
    };
    return RegisterFormComponent;
}());
RegisterFormComponent = __decorate([
    core_1.Component({
        selector: 'register',
        templateUrl: './register.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        auth_service_1.AuthService,
        router_1.Router])
], RegisterFormComponent);
exports.RegisterFormComponent = RegisterFormComponent;
//# sourceMappingURL=register.component.js.map