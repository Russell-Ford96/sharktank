
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators }   from '@angular/forms';
import { ProfileService } from './profile.service'

import { Profile } from './profile';

@Component({
  selector: 'profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent { 
    profile: Profile;
    showExpenseForm = false;
    showIncomeForm = false;
    expenseForm: FormGroup;
    incomeForm: FormGroup;
    
    constructor(
        private fb: FormBuilder,
        private profileService: ProfileService
    ) { }
    ngOnInit(): void {
        this.buildForms();
        this.getProfile();
    }
    getProfile() {
        var test = this.profileService.getProfileData(localStorage.getItem('token'));
        console.log(test);
    }

    displayIncomeForm() {
        this.showIncomeForm = true;
    }
    displayExpenseForm() {
        this.showExpenseForm = true;
    }
    cancelIncome(): void {
        this.showIncomeForm = false;
    }
    cancelExpense(): void {
        this.showExpenseForm = false;
    }
    onExpenseSubmit() {
        this.expenseForm = this.expenseForm.value;
        this.saveIncome();
    }
    onSubmit() {
        this.incomeForm = this.incomeForm.value;
        this.saveExpense();
    }
    saveIncome() {
        console.log(this.incomeForm);
        //this.profileService.saveIncome(this.incomeForm);
    }
    saveExpense() {
        this.profileService.saveExpense(this.expenseForm);
    }
    

    buildForms(): void {
        this.incomeForm = this.fb.group({
            'incomeCategory': ['', [
                Validators.required
                ]
            ],
            'incomeAmount': ['', [
                Validators.required
                ]
            ]
        });
        this.incomeForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (re)set validation messages now

        this.expenseForm = this.fb.group({
            'expenseCategory': ['', [
                Validators.required
                ]
            ],
            'expenseAmount': ['', [
                Validators.required
                ]
            ]
        });
        this.expenseForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (re)set validation messages now
    }
    onValueChanged(data?: any) {
        //these should probably be in two seperate functions
        if (!this.incomeForm) { return; }
        if (!this.expenseForm) { return; }
        var form = this.incomeForm;
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
        var form = this.expenseForm;
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }
    formErrors = {
        'incomeCategory': '',
        'incomeAmount': '',
        'expenseCategory': '',
        'expenseAmount': ''
    };
    validationMessages = {
        'incomeCategory': {
            'required':      'Income category is required.'
        },
        'incomeAmount': {
            'required': 'Income amount is required.'
        },
        'expenseCategory': {
            'required': 'Expense category is required.'
        },
        'expenseAmount': {
            'required': 'Expense amount is required.'
        }
    };
}
