import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Profile } from './profile';
import { ProfileService } from './profile.service';

@Injectable()
export class ProfileDetailResolve implements Resolve<Profile> {
    constructor(private profileService: ProfileService, private router: Router) { }
    
    resolve(route: ActivatedRouteSnapshot): Promise<Profile> {
        let token = localStorage.getItem('token');
        return this.profileService.getProfileData(token);
    }
}
