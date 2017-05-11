"use strict";
function matchingPasswords(passwordKey, confirmPasswordKey) {
    return function (group) {
        var password = group.controls[passwordKey];
        var confirmPassword = group.controls[confirmPasswordKey];
        console.log(password.value);
        console.log(group);
        if (password.value !== confirmPassword.value) {
            return confirmPassword.setErrors({ mismatchedPasswords: true });
        }
        else {
            return confirmPassword.setErrors({});
        }
    };
}
exports.matchingPasswords = matchingPasswords;
//# sourceMappingURL=equal-validator.directive.js.map