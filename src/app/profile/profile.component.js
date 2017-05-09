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
        this.showProfileForm = false;
        this.formErrors = {
            'incomeCategory': '',
            'incomeAmount': '',
            'expenseCategory': '',
            'expenseAmount': '',
            'firstName': '',
            'lastName': '',
            'savings': ''
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
        this.doughnutChartLegend = true;
        this.doughnutChartType = 'doughnut';
        this.datasets = [
            {
                label: "Expenses",
                data: [20, 40, 60]
            }
        ];
        this.labels = ['2017'];
        this.options = {
            responsive: true,
            scales: {
                xAxes: [{
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            display: false,
                            fontColor: "#ffffff"
                        },
                    }],
                yAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            display: false,
                            fontColor: '#ffffff'
                        }
                    }]
            },
            legend: {
                labels: {
                    fontColor: '#ffffff'
                }
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
    ProfileComponent.prototype.confirmDeleteIncome = function (incomeRow, index) {
        var _this = this;
        if (confirm("Are you sure you want to delete this?")) {
            incomeRow.token = localStorage.getItem('token');
            this.profileService.deleteIncome(incomeRow)
                .then(function (res) {
                if (res == 'success')
                    _this.profile.income.splice(index, 1);
                else
                    alert("An error has occured");
            });
        }
    };
    ProfileComponent.prototype.confirmDeleteExpense = function (expenseRow, index) {
        var _this = this;
        if (confirm("Are you sure you want to delete this?")) {
            expenseRow.token = localStorage.getItem('token');
            this.profileService.deleteExpense(expenseRow)
                .then(function (res) {
                if (res == 'success')
                    _this.profile.expenses.splice(index, 1);
                else
                    alert("An error has occured");
            });
        }
    };
    ProfileComponent.prototype.showEditIncome = function (incomeRow) {
        this.selectedIncome = incomeRow;
        this.incomeForm.setValue({ incomeCategory: incomeRow.income_name, incomeAmount: incomeRow.income_amount });
        this.showIncomeForm = true;
        this.editingIncome = true;
    };
    ProfileComponent.prototype.showEditExpense = function (expenseRow) {
        this.selectedExpense = expenseRow;
        this.expenseForm.setValue({ expenseCategory: expenseRow.expense_name, expenseAmount: expenseRow.expense_amount });
        this.showExpenseForm = true;
        this.editingExpense = true;
    };
    ProfileComponent.prototype.displayProfileForm = function () {
        this.profileForm.setValue({
            firstName: this.profile.firstName,
            lastName: this.profile.lastName,
            savings: this.profile.savings
        });
        this.showProfileForm = true;
    };
    ProfileComponent.prototype.displayIncomeForm = function () {
        this.incomeForm.setValue({ incomeCategory: '', incomeAmount: '' });
        this.showIncomeForm = true;
        this.editingIncome = false;
    };
    ProfileComponent.prototype.displayExpenseForm = function () {
        this.expenseForm.setValue({ expenseCategory: '', expenseAmount: '' });
        this.showExpenseForm = true;
        this.editingExpense = false;
    };
    ProfileComponent.prototype.cancelIncome = function () {
        this.showIncomeForm = false;
    };
    ProfileComponent.prototype.cancelExpense = function () {
        this.showExpenseForm = false;
    };
    ProfileComponent.prototype.cancelEditProfile = function () {
        this.showProfileForm = false;
    };
    ProfileComponent.prototype.onProfileSubmit = function () {
        console.log("hit submit");
        var profileData = this.profileForm.value;
        profileData.token = localStorage.getItem('token');
        profileData.savings = Number(profileData.savings);
        this.saveProfile(profileData);
    };
    ProfileComponent.prototype.onExpenseSubmit = function () {
        var expenseData = this.expenseForm.value;
        expenseData.token = localStorage.getItem('token');
        expenseData.expenseAmount = Number(expenseData.expenseAmount);
        if (this.editingExpense) {
            expenseData.oldAmount = this.selectedExpense.expense_amount;
            expenseData.oldName = this.selectedExpense.expense_name;
            this.editExpense(expenseData);
        }
        else
            this.saveExpense(expenseData);
    };
    ProfileComponent.prototype.onIncomeSubmit = function () {
        var incomeData = this.incomeForm.value;
        incomeData.token = localStorage.getItem('token');
        incomeData.incomeAmount = Number(incomeData.incomeAmount);
        if (this.editingIncome) {
            incomeData.oldAmount = this.selectedIncome.income_amount;
            incomeData.oldName = this.selectedIncome.income_name;
            this.editIncome(incomeData);
        }
        else
            this.saveIncome(incomeData);
    };
    ProfileComponent.prototype.saveProfile = function (profileData) {
        var _this = this;
        console.log(profileData);
        this.profileService.editProfile(profileData)
            .then(function (res) {
            if (res == 'success') {
                _this.profile.firstName = profileData.firstName;
                _this.profile.lastName = profileData.lastName;
                _this.profile.savings = profileData.savings;
                _this.showProfileForm = false;
            }
            else
                alert("An error has occured");
        });
    };
    ProfileComponent.prototype.saveIncome = function (incomeData) {
        var _this = this;
        this.profileService.saveIncome(incomeData)
            .then(function (res) {
            if (res == 'success') {
                _this.profile.income.push({ 'income_name': incomeData.incomeCategory, 'income_amount': incomeData.incomeAmount });
                _this.showIncomeForm = false;
            }
            else {
                alert("An error has occured.");
            }
        });
    };
    ProfileComponent.prototype.editIncome = function (incomeData) {
        var _this = this;
        this.profileService.editIncome(incomeData)
            .then(function (res) {
            if (res == 'success') {
                _this.selectedIncome.income_name = incomeData.incomeCategory;
                _this.selectedIncome.income_amount = incomeData.incomeAmount;
                _this.showIncomeForm = false;
            }
            else {
                alert("An error has occured.");
            }
        });
    };
    ProfileComponent.prototype.saveExpense = function (expenseData) {
        var _this = this;
        this.profileService.saveExpense(expenseData)
            .then(function (res) {
            if (res == 'success') {
                _this.profile.expenses.push({ 'expense_name': expenseData.expenseCategory, 'expense_amount': expenseData.expenseAmount });
                _this.showExpenseForm = false;
            }
            else {
                alert("An error has occured.");
            }
        });
        this.showExpenseForm = false;
    };
    ProfileComponent.prototype.editExpense = function (expenseData) {
        var _this = this;
        this.profileService.editExpense(expenseData)
            .then(function (res) {
            if (res == 'success') {
                _this.selectedExpense.expense_name = expenseData.expenseCategory;
                _this.selectedExpense.expense_amount = expenseData.expenseAmount;
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
        this.profileForm = this.fb.group({
            'firstName': ['', [
                    forms_1.Validators.required
                ]
            ],
            'lastName': ['', [
                    forms_1.Validators.required
                ]
            ],
            'savings': ['', [
                    forms_1.Validators.required
                ]
            ]
        });
        this.profileForm.valueChanges
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
        if (!this.profileForm) {
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
        var form = this.profileForm;
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