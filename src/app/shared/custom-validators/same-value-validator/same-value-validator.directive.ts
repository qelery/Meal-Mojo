import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import { Directive, Input } from '@angular/core';

export function sameValueValidator(controlNames: string[]);
export function sameValueValidator(controlNameA: string, controlNameB: string);

export function sameValueValidator(
  controlNameOrNames: string | string[],
  otherControlName?: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (controlNameOrNames instanceof Array) {
      const controlNames: string[] = controlNameOrNames;

      const allValuesMatch = controlNames.every((controlName) => {
        const controlA = control.get(controlNames[0]);
        const controlB = control.get(controlName);
        return controlA && controlB && controlA.value === controlB.value;
      });
      return allValuesMatch ? null : { sameValue: true };
    } else {
      const controlName: string = controlNameOrNames;

      const controlA = control.get(controlName);
      const controlB = control.get(otherControlName);
      if (controlA && controlB && controlA.value === controlB.value) {
        return null;
      }
      return { sameValue: true };
    }
  };
}

@Directive({
  selector: '[appSameValueValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SameValueValidatorDirective,
      multi: true,
    },
  ],
})
export class SameValueValidatorDirective implements Validator {
  @Input('appSameValueValidator') controlNames;

  validate(control: AbstractControl): ValidationErrors | null {
    return sameValueValidator(this.controlNames)(control);
  }
}
