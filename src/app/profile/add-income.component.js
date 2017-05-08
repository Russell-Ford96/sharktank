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
var AddIncomeComponent = (function () {
    function AddIncomeComponent(fb, profileService) {
        this.fb = fb;
        this.profileService = profileService;
        this.showIncomeForm = false;
        this.formErrors = {
            'incomeCategory': '',
            'incomeAmount': ''
        };
        this.validationMessages = {
            'incomeCategory': {
                'required': 'Income category is required.'
            },
            'incomeAmount': {
                'required': 'Income amount is required.'
            }
        };
    }
    AddIncomeComponent.prototype.ngOnInit = function () {
        this.buildForm();
    };
    AddIncomeComponent.prototype.displayIncomeForm = function () {
        this.showIncomeForm = true;
    };
    AddIncomeComponent.prototype.cancelIncome = function () {
        this.showIncomeForm = false;
    };
    AddIncomeComponent.prototype.onSubmit = function () {
        this.test = this.incomeForm.value;
        this.save();
    };
    AddIncomeComponent.prototype.save = function () {
        console.log(this.test);
        //this.profileService.saveIncome(this.incomeForm);
    };
    AddIncomeComponent.prototype.buildForm = function () {
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
    };
    AddIncomeComponent.prototype.onValueChanged = function (data) {
        //these should probably be in two seperate functions
        if (!this.incomeForm) {
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
    };
    return AddIncomeComponent;
}());
AddIncomeComponent = __decorate([
    core_1.Component({
        selector: 'add-income',
        template: "\n                <form [formGroup]=\"incomeForm\" (ngSubmit)=\"onSubmit()\"> \n                    <div class=\"form-group\">\n                        <label for=\"incomeCategory\">Category</label>\n                        <input type=\"text\" class=\"form-control\" id=\"incomeCategory\" formControlName=\"incomeCategory\" required>\n                        <div *ngIf=\"formErrors.incomeCategory\" class=\"alert alert-danger\">\n                            {{ formErrors.incomeCategory }}\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"incomeAmount\">Amount</label>\n                        <input type=\"text\" class=\"form-control\" id=\"incomeAmount\" formControlName=\"incomeAmount\" required>\n                        <div *ngIf=\"formErrors.incomeAmount\" class=\"alert alert-danger\">\n                            {{ formErrors.incomeAmount }}\n                        </div>\n                    </div>\n\n                    <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!incomeForm.valid\">Add</button>\n                    <button type=\"button\" (click)=\"cancelIncome()\" class=\"btn btn-danger\">Cancel</button>\n                </form>\n    "
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        profile_service_1.ProfileService])
], AddIncomeComponent);
exports.AddIncomeComponent = AddIncomeComponent;
//# sourceMappingURL=add-income.component.js.map