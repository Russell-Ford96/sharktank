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
var router_1 = require("@angular/router");
var profile_service_1 = require("./profile.service");
var ProfileDetailResolve = (function () {
    function ProfileDetailResolve(profileService, router) {
        this.profileService = profileService;
        this.router = router;
    }
    ProfileDetailResolve.prototype.resolve = function (route) {
        var token = localStorage.getItem('token');
        return this.profileService.getProfileData(token);
    };
    return ProfileDetailResolve;
}());
ProfileDetailResolve = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [profile_service_1.ProfileService, router_1.Router])
], ProfileDetailResolve);
exports.ProfileDetailResolve = ProfileDetailResolve;
//# sourceMappingURL=profile.resolve.service.js.map