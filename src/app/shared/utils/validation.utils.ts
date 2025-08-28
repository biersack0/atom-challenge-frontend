import { AbstractControl } from '@angular/forms';

export class ValidationUtils {
    isInvalid(control: AbstractControl) {
        return control.errors && control.touched;
    }

    getMessage(errorName: string): string | null {
        switch (errorName) {
            case 'required':
                return 'Campo requerido';
            case 'email':
                return 'El correo no es válido';
            case 'pattern':
                return 'No cumple con el formato permitido';
            default:
                return null;
        }
    }
}
