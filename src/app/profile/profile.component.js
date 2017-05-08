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
var profile_service_1 = require("./profile.service");
var router_1 = require("@angular/router");
var ProfileComponent = (function () {
    function ProfileComponent(fb, profileService, route) {
        this.fb = fb;
        this.profileService = profileService;
        this.route = route;
        this.showExpenseForm = false;
        this.showIncomeForm = false;
        this.formErrors = {
            'incomeCategory': '',
            'incomeAmount': '',
            'expenseCategory': '',
            'expenseAmount': ''
        };
        this.validationMessages = {
            'incomeCategory': {
                'required': 'Income category is required.'
            },
            'incomeAmount': {
                'required': 'Income amount is required.'
            },
            'expenseCategory': {
                'required': 'Expense category is required.'
            },
            'expenseAmount': {
                'required': 'Expense amount is required.'
            },
            'firstName': {
                'required': 'Name cannot be blank.'
            },
            'lastName': {
                'required': 'Name cannot be blank.'
            },
            'savings': {
                'required': 'Savings field cannot be empty.'
            }
        };
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.buildForms();
        this.route.data
            .subscribe(function (data) {
            _this.profile = data.profile;
        });
        console.log(this.profile);
    };
    ProfileComponent.prototype.displayEditProfileForm = function () {
        this.showEditProfileForm = true;
    };
    ProfileComponent.prototype.displayIncomeForm = function () {
        this.showIncomeForm = true;
    };
    ProfileComponent.prototype.displayExpenseForm = function () {
        this.showExpenseForm = true;
    };
    ProfileComponent.prototype.cancelIncome = function () {
        this.showIncomeForm = false;
    };
    ProfileComponent.prototype.cancelExpense = function () {
        this.showExpenseForm = false;
    };
    ProfileComponent.prototype.cancelEditProfile = function () {
        this.showEditProfileForm = false;
    };
    ProfileComponent.prototype.onExpenseSubmit = function () {
        this.expenseData = this.expenseForm.value;
        this.expenseData.token = localStorage.getItem('token');
        this.expenseData.expenseAmount = Number(this.expenseData.expenseAmount);
        this.saveExpense();
    };
    ProfileComponent.prototype.onIncomeSubmit = function () {
        this.incomeData = this.incomeForm.value;
        this.incomeData.token = localStorage.getItem('token');
        this.incomeData.incomeAmount = Number(this.incomeData.incomeAmount);
        this.saveIncome();
    };
    ProfileComponent.prototype.saveIncome = function () {
        var _this = this;
        this.profileService.saveIncome(this.incomeData)
            .then(function (res) {
            if (res == 'success') {
                _this.profile.income.push({ 'income_name': _this.incomeData.incomeCategory, 'income_amount': _this.incomeData.incomeAmount });
                _this.showIncomeForm = false;
            }
            else {
                alert("An error has occured.");
            }
        });
    };
    ProfileComponent.prototype.saveExpense = function () {
        var _this = this;
        this.profileService.saveExpense(this.expenseData)
            .then(function (res) {
            if (res == 'success') {
                _this.profile.expenses.push({ 'expense_name': _this.expenseData.expenseCategory, 'expense_amount': _this.expenseData.expenseAmount });
                _this.showExpenseForm = false;
            }
            else {
                alert("An error has occured.");
            }
        });
        this.showExpenseForm = false;
    };
    ProfileComponent.prototype.buildForms = function () {
        var _this = this;
        this.incomeForm = this.fb.group({
            'incomeCategory': ['', [
                    forms_1.Validators.required
                ]
            ],
            'incomeAmount': ['', [
                    forms_1.Validators.required
                ]
            ]
        });
        this.incomeForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(); // (re)set validation messages now
        this.expenseForm = this.fb.group({
            'expenseCategory': ['', [
                    forms_1.Validators.required
                ]
            ],
            'expenseAmount': ['', [
                    forms_1.Validators.required
                ]
            ]
        });
        this.expenseForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(); // (re)set validation messages now
    };
    ProfileComponent.prototype.onValueChanged = function (data) {
        //these should probably be in two seperate functions
        if (!this.incomeForm) {
            return;
        }
        if (!this.expenseForm) {
            return;
        }
        var form = this.incomeForm;
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
        var form = this.expenseForm;
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
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    core_1.Component({
        selector: 'profile',
        templateUrl: './profile.component.html',
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        profile_service_1.ProfileService,
        router_1.ActivatedRoute])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map