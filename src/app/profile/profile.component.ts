import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators }   from '@angular/forms';

@Component({
  selector: 'profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent { 

    showAddForm = false;
    showIncomeForm = false;
    
    displayForm(){
        this.showAddForm = true;
    }
    
    displayIncomeForm(){
        this.showIncomeForm = true;
    }
    hideForm(){
        this.showAddForm = false;
        }
        
    
    
}
