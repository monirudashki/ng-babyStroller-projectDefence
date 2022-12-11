import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatch(passwordFormControl: AbstractControl) {
    const validtorFn: ValidatorFn = (rePasswordFormControl: AbstractControl) => {
        if (passwordFormControl.value !== rePasswordFormControl.value) {
            return {
                passwordMissMatch: true
            }
        }

        return null;
    }

    return validtorFn;
}