import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators }   from '@angular/forms';
import { ProfileService } from './profile.service'
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Profile } from './profile';

@Component({
  selector: 'profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent { 
    profile: Profile;
    
    constructor(
        private profileService: ProfileService,
        private route: ActivatedRoute,
        private router: Router
    ) { }
    ngOnInit(): void {
        this.route.data
              .subscribe((data: { profile: Profile }) => {
                this.profile = data.profile;
              });
    }

    redirect() {
        this.router.navigate(['/redeem']);
    }
}
