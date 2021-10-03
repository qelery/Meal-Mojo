import { nameValidator } from './name-async-validator.directive';
import { FormControl } from '@angular/forms';
import { fakeAsync, tick } from '@angular/core/testing';

const ASYNC_VALIDATOR_DELAY_MS = 500;

describe('NameAsyncValidator Directive', () => {
  it('should require at least one letter', fakeAsync(() => {
    const validInputs = ['a', 'A', 'z', 'Z', 'À', 'ÿ'];

    validInputs.forEach((input: string) => {
      const asyncValidatorFn = nameValidator()(new FormControl(input));
      asyncValidatorFn.subscribe((errors) => {
        expect(errors).toEqual(null);
      });
    });
    tick(ASYNC_VALIDATOR_DELAY_MS);

    const validCharsButNoLetterInputs = [`'`, `-`, `.`, `,`, `'-.,`];

    validCharsButNoLetterInputs.forEach((input: string) => {
      const asyncValidatorFn = nameValidator()(new FormControl(input));
      asyncValidatorFn.subscribe((errors) => {
        expect(errors).toEqual({ invalidName: true });
      });
    });
    tick(ASYNC_VALIDATOR_DELAY_MS);
  }));

  it('should return a validation error for blank inputs', fakeAsync(() => {
    const inputs = ['', ' ', '\n\n\n', ' \n\t\r'];

    inputs.forEach((input: string) => {
      const asyncValidatorFn = nameValidator()(new FormControl(input));
      asyncValidatorFn.subscribe((errors) => {
        expect(errors).toEqual({ blankName: true });
      });
    });

    tick(ASYNC_VALIDATOR_DELAY_MS);
  }));

  it('should return a validation error for invalid patterns', fakeAsync(() => {
    const inputs = [
      `Bob!`,
      `Bob@`,
      `Bob1`,
      `(Bob)`,
      `[Bob]`,
      `Bob&Ross`,
      `Bob@Ross`,
      `Bob"Ross`,
      `Bob_Ross`,
    ];

    inputs.forEach((input: string) => {
      const asyncValidatorFn = nameValidator()(new FormControl(input));
      asyncValidatorFn.subscribe((errors) => {
        expect(errors).toEqual({ invalidName: true });
      });
    });

    tick(ASYNC_VALIDATOR_DELAY_MS);
  }));

  it('should return null for valid patterns', fakeAsync(() => {
    const inputs = [
      `a`,
      `A`,
      `a'`,
      `abby`,
      `Abby`,
      `Adrián`,
      `François`,
      `Agnès`,
      `Sørina`,
      `Siân`,
      `Chloë`,
      `Nuñez`,
      ` peter `,
      `Mary Jo`,
      `Mary-Jo`,
      `O'Brien`,
      `O'Brien, Jr.`,
      `O'Brien-O'Niel Smith`,
    ];

    inputs.forEach((input: string) => {
      const asyncValidatorFn = nameValidator()(new FormControl(input));
      asyncValidatorFn.subscribe((errors) => {
        expect(errors).toEqual(null);
      });
    });

    tick(ASYNC_VALIDATOR_DELAY_MS);
  }));
});
