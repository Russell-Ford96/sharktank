import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators }   from '@angular/forms';
import { ProfileService } from './profile.service'

import { Profile } from './profile';

@Component({
  selector: 'add-income',
  template: `
                <form [formGroup]="incomeForm" (ngSubmit)="onSubmit()"> 
                    <div class="form-group">
                        <label for="incomeCategory">Category</label>
                        <input type="text" class="form-control" id="incomeCategory" formControlName="incomeCategory" required>
                        <div *ngIf="formErrors.incomeCategory" class="alert alert-danger">
                            {{ formErrors.incomeCategory }}
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="incomeAmount">Amount</label>
                        <input type="text" class="form-control" id="incomeAmount" formControlName="incomeAmount" required>
                        <div *ngIf="formErrors.incomeAmount" class="alert alert-danger">
                            {{ formErrors.incomeAmount }}
                        </div>
                    </div>

                    <button type="submit" class="btn btn-success" [disabled]="!incomeForm.valid">Add</button>
                    <button type="button" (click)="cancelIncome()" class="btn btn-danger">Cancel</button>
                </form>
    `
})
export class AddIncomeComponent { 
    showIncomeForm = false;
    incomeForm: FormGroup;
    test: any;
    
    constructor(
        private fb: FormBuilder,
        private profileService: ProfileService
    ) { }
    ngOnInit(): void {
        this.buildForm();
    }

    displayIncomeForm() {
        this.showIncomeForm = true;
    }
    cancelIncome(): void {
        this.showIncomeForm = false;
    }
    onSubmit() {
        this.test = this.incomeForm.value;
        this.save();
    }
    save() {
        console.log(this.test);
        //this.profileService.saveIncome(this.incomeForm);
    }
    

    buildForm(): void {
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
    }
    onValueChanged(data?: any) {
        //these should probably be in two seperate functions
        if (!this.incomeForm) { return; }
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
    }
    formErrors = {
        'incomeCategory': '',
        'incomeAmount': ''
    };
    validationMessages = {
        'incomeCategory': {
            'required':      'Income category is required.'
        },
        'incomeAmount': {
            'required': 'Income amount is required.'
        }
    };
}
