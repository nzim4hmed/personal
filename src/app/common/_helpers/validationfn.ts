import { AbstractControl, ValidatorFn } from '@angular/forms';

// Validator function
export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; // don't validate empty value
    }

    // Regular expression for password validation
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

    
    const valid = pattern.test(control.value);
    return valid ? null : { 'passwordInvalid': true };
  };
}
