import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import { Directive } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const REGEX_VALID_NAME_CHARACTERS = "^(?=.*[A-Za-zÀ-ÿ])[A-Za-zÀ-ÿ-',. ]*$";

export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return  timer(500).pipe(switchMap(() => {
      const nameRegex = new RegExp(REGEX_VALID_NAME_CHARACTERS);
      const name = control.value.trim();
      if (name === '') {
        return of({ blankName: true });
      }
      return nameRegex.test(name) ? of(null) : of({ invalidName: true });
    }));
  };
}

@Directive({
  selector: '[appNameValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: NameAsyncValidatorDirective, multi: true}]
})
export class NameAsyncValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return nameValidator();
  }
}
