import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { Directive } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// At least one letter (e.g. a, A, â, À)
// Characters ' - . , allowed
const REGEX_VALID_NAME_CHARACTERS = "^(?=.*[A-Za-zÀ-ÿ])[A-Za-zÀ-ÿ-',. ]*$";
const TIME_DELAY_MS = 500;

export function nameValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(TIME_DELAY_MS).pipe(
      switchMap(() => {
        const nameRegex = new RegExp(REGEX_VALID_NAME_CHARACTERS);
        const name = control.value.trim();
        if (name === '') {
          return of({ blankName: true });
        }
        return nameRegex.test(name) ? of(null) : of({ invalidName: true });
      })
    );
  };
}

@Directive({
  selector: '[appNameValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: NameAsyncValidatorDirective,
      multi: true,
    },
  ],
})
export class NameAsyncValidatorDirective implements AsyncValidator {
  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return nameValidator()(control);
  }
}
