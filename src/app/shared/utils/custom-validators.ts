import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
    static validEmail(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value: string = control.value;
            const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|atomchat\.io)$/;

            return emailRegex.test(value) ? null : { email: true };
        };
    }

    static requiredAfterTrim(control: AbstractControl): ValidationErrors | null {
        if (control.value && control.value.trim()) {
            return { required: true };
        }
        return null;
    }
}