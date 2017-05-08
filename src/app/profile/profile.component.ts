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
    showProfileForm = false;
    expenseForm: FormGroup;
    incomeForm: FormGroup;
    profileForm: FormGroup;
    //these determine if we should insert or put
    editingIncome: boolean;
    editingExpense: boolean;
    //we use these to update the values in the table after a successful put request
    selectedIncome: any;
    selectedExpense: any;
    
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
    confirmDeleteIncome(incomeRow: any, index: number) {
        if(confirm("Are you sure you want to delete this?")) {
            incomeRow.token = localStorage.getItem('token');
            this.profileService.deleteIncome(incomeRow)
                .then(res => {
                    if(res == 'success')
                        this.profile.income.splice(index, 1);
                    else
                        alert("An error has occured");
                });
        }
    }
    confirmDeleteExpense(expenseRow: any, index: number) {
        if(confirm("Are you sure you want to delete this?")) {
            expenseRow.token = localStorage.getItem('token');
            this.profileService.deleteExpense(expenseRow)
                .then(res => {
                    if(res == 'success')
                        this.profile.expenses.splice(index, 1);
                    else
                        alert("An error has occured");
                });
        }
    }
    showEditIncome(incomeRow: any) {
        this.selectedIncome = incomeRow;
        this.incomeForm.setValue({incomeCategory: incomeRow.income_name, incomeAmount: incomeRow.income_amount});
        this.showIncomeForm = true;
        this.editingIncome = true;
    }
    showEditExpense(expenseRow: any) {
        this.selectedExpense = expenseRow;
        this.expenseForm.setValue({expenseCategory: expenseRow.expense_name, expenseAmount: expenseRow.expense_amount});
        this.showExpenseForm = true;
        this.editingExpense = true;
    }
    displayProfileForm() {
        this.profileForm.setValue({
            firstName: this.profile.firstName,
            lastName: this.profile.lastName,
            savings: this.profile.savings
        });
        this.showProfileForm = true;
    }

    
    displayIncomeForm() {
        this.incomeForm.setValue({incomeCategory: '', incomeAmount: ''});
        this.showIncomeForm = true;
        this.editingIncome = false;
    }
    displayExpenseForm() {
        this.expenseForm.setValue({expenseCategory: '', expenseAmount: ''});
        this.showExpenseForm = true;
        this.editingExpense = false;
    }
    cancelIncome(): void {
        this.showIncomeForm = false;
    }
    cancelExpense(): void {
        this.showExpenseForm = false;
    }
    cancelEditProfile(): void{
        this.showProfileForm = false;
    }
    onProfileSubmit() {
        console.log("hit submit");
        var profileData = this.profileForm.value;
        profileData.token = localStorage.getItem('token');
        profileData.savings = Number(profileData.savings);
        this.saveProfile(profileData);
    }
    onExpenseSubmit() {
        var expenseData = this.expenseForm.value;
        expenseData.token = localStorage.getItem('token');
        expenseData.expenseAmount = Number(expenseData.expenseAmount);
        if(this.editingExpense) {
            expenseData.oldAmount = this.selectedExpense.expense_amount;
            expenseData.oldName = this.selectedExpense.expense_name;
            this.editExpense(expenseData);
        }
        else
            this.saveExpense(expenseData);
    }
    onIncomeSubmit() {
        var incomeData = this.incomeForm.value;
        incomeData.token = localStorage.getItem('token');
        incomeData.incomeAmount = Number(incomeData.incomeAmount);
        if(this.editingIncome) {
            incomeData.oldAmount = this.selectedIncome.income_amount;
            incomeData.oldName = this.selectedIncome.income_name;
            this.editIncome(incomeData);
        }
        else
            this.saveIncome(incomeData);
    }
    saveProfile(profileData: any) {
        console.log(profileData);
        this.profileService.editProfile(profileData)
            .then(res => {
                if(res == 'success') {
                    this.profile.firstName = profileData.firstName;
                    this.profile.lastName = profileData.lastName;
                    this.profile.savings = profileData.savings;
                    this.showProfileForm = false;
                }
                else
                    alert("An error has occured");
            });
    }
    saveIncome(incomeData: any) {
        this.profileService.saveIncome(incomeData)
            .then(res => { 
                if(res == 'success') {
                    this.profile.income.push({ 'income_name': incomeData.incomeCategory, 'income_amount': incomeData.incomeAmount });
                    this.showIncomeForm = false;
                } else {
                    alert("An error has occured.");
                }
            });
    }
    editIncome(incomeData: any) {
        this.profileService.editIncome(incomeData)
            .then(res => { 
                if(res == 'success') {
                    this.selectedIncome.income_name = incomeData.incomeCategory;
                    this.selectedIncome.income_amount = incomeData.incomeAmount;
                    this.showIncomeForm = false;
                } else {
                    alert("An error has occured.");
                }
            });
    }
    saveExpense(expenseData: any) {
        this.profileService.saveExpense(expenseData)
            .then(res => { 
                if(res == 'success') {
                    this.profile.expenses.push({ 'expense_name': expenseData.expenseCategory, 'expense_amount': expenseData.expenseAmount });
                    this.showExpenseForm = false;
                } else {
                    alert("An error has occured.");
                }
            });
        this.showExpenseForm = false;
    }
    editExpense(expenseData: any) {
        this.profileService.editExpense(expenseData)
            .then(res => { 
                if(res == 'success') {
                    this.selectedExpense.expense_name = expenseData.expenseCategory;
                    this.selectedExpense.expense_amount = expenseData.expenseAmount;
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

        this.profileForm = this.fb.group({
            'firstName': ['', [
                Validators.required
                ]
            ],
            'lastName': ['', [
                Validators.required
                ]
            ],
            'savings': ['', [
                Validators.required
                ]
            ]
        });
        this.profileForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (re)set validation messages now
    }
    onValueChanged(data?: any) {
        //these should probably be in two seperate functions
        if (!this.incomeForm) { return; }
        if (!this.expenseForm) { return; }
        if (!this.profileForm) { return; }
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
        var form = this.profileForm;
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


    public doughnutChartLegend:boolean = true;
    public doughnutChartType:string = 'doughnut';
    private datasets = [
        {
            label: "Expenses",
            data: [20, 40, 60]
        }
      ];

    private labels = ['2017'];

    private options = {
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
