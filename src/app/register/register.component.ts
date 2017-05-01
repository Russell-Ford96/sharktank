import { Component, OnInit }                    from '@angular/core';
import { FormGroup, FormBuilder, Validators }   from '@angular/forms';


@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})
export class RegisterFormComponent implements OnInit {
    
    submitted = false;
    onSubmit() {
        this.submitted = true;
        
        this.save();
    }
    registerForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        
    ) { }
    ngOnInit(): void {
        
        this.buildForm();
    }
    buildForm(): void {
        this.registerForm = this.fb.group({
            'firstName': ['', [
                Validators.required
                ]
            ],
            'lastName': ['', [
                Validators.required
                ]
            ],
            'email': ['', [
                Validators.required
                ]
            ],
            'password': ['', [
                Validators.required
                Validators.minLength(8)
                ]
            ],
            'confirmPassword': ['', [
                Validators.required
                Validators.minLength(8)
                ]
            ]
        });
        this.registerForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (re)set validation messages now
    }
    onValueChanged(data?: any) {
        if (!this.registerForm) { return; }
        const form = this.registerForm;
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
    save(): void {
      
    }
    goBack(): void {
        
    }
    formErrors = {
        'firstName': '',
        'lastName': '',
        'email': '',
        'password': '',
        'confirmPassword': ''
    };
    validationMessages = {
        'firstName': {
            'required':      'First name is required.'
        },
        'lastName': {
            'required': 'Last name is required.'
        },
        'email': {
            'required': 'Email is required.'
        },
        'password': {
            'required': 'Password is required.'
            'minlength': 'Minimum characters is 7.'
        },
        'confirmPassword': {
            'required': 'Password is required.'
            'minlength': 'Minimum characters is 7.'
        }
    };
}
