import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators }   from '@angular/forms';
import { ProfileService } from './profile.service'
import { ActivatedRoute, Params } from '@angular/router';

import { Profile } from './profile';

@Component({
  selector: 'profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent { 
    profile: Profile;
    showExpenseForm = false;
    showIncomeForm = false;
    showEditProfileForm;
    expenseForm: FormGroup;
    incomeForm: FormGroup;
    editProfileForm: FormGroup;
    expenseData: any;
    incomeData: any;
    
    constructor(
        private fb: FormBuilder,
        private profileService: ProfileService,
        private route: ActivatedRoute
    ) { }
    ngOnInit(): void {
        this.buildForms();
        this.route.data
              .subscribe((data: { profile: Profile }) => {
                this.profile = data.profile;
              });
        console.log(this.profile);
    }

    
    displayEditProfileForm() {
        this.showEditProfileForm = true;
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
    cancelEditProfile(): void{
        this.showEditProfileForm = false;
    }   
    onExpenseSubmit() {
        this.expenseData = this.expenseForm.value;
        this.expenseData.token = localStorage.getItem('token');
        this.expenseData.expenseAmount = Number(this.expenseData.expenseAmount);
        this.saveExpense();
    }
    onIncomeSubmit() {
        this.incomeData = this.incomeForm.value;
        this.incomeData.token = localStorage.getItem('token');
        this.incomeData.incomeAmount = Number(this.incomeData.incomeAmount);
        this.saveIncome();
    }
    saveIncome() {
        this.profileService.saveIncome(this.incomeData)
            .then(res => { 
                if(res == 'success') {
                    this.profile.income.push({ 'income_name': this.incomeData.incomeCategory, 'income_amount': this.incomeData.incomeAmount });
                    this.showIncomeForm = false;
                } else {
                    alert("An error has occured.");
                }
            });
    }
    saveExpense() {
        this.profileService.saveExpense(this.expenseData)
            .then(res => { 
                if(res == 'success') {
                    this.profile.expenses.push({ 'expense_name': this.expenseData.expenseCategory, 'expense_amount': this.expenseData.expenseAmount });
                    this.showExpenseForm = false;
                } else {
                    alert("An error has occured.");
                }
            });
        this.showExpenseForm = false;
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
        'expenseAmount': '',
        'firstName': '',
        'lastName': '',
        'savings': ''
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
