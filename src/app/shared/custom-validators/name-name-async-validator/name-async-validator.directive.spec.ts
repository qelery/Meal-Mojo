import { nameValidator } from './name-async-validator.directive';
import { FormControl } from '@angular/forms';

fdescribe('NameAsyncValidator Directive', () => {
  it('should require at least one letter', (done) => {
    const validInputs = ['a', 'A', 'z', 'Z', 'À', 'ÿ'];

    validInputs.forEach((input: string) => {
      const asyncValidatorFn = nameValidator()(new FormControl(input));
      asyncValidatorFn.subscribe((errors) => {
        expect(errors).toEqual(null);
        done();
      });
    });

    const validCharsButNoLetterInputs = [`'`, `-`, `.`, `,`, `'-.,`];

    validCharsButNoLetterInputs.forEach((input: string) => {
      const asyncValidatorFn = nameValidator()(new FormControl(input));
      asyncValidatorFn.subscribe((errors) => {
        expect(errors).toEqual({ invalidName: true });
        done();
      });
    });
  });

  it('should return a validation error for blank inputs', (done) => {
    const inputs = ['', ' ', '\n\n\n', ' \n\t\r'];

    inputs.forEach((input: string) => {
      const asyncValidatorFn = nameValidator()(new FormControl(input));
      asyncValidatorFn.subscribe((errors) => {
        expect(errors).toEqual({ blankName: true });
        done();
      });
    });
  });

  it('should return a validation error for invalid patterns', (done) => {
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
        done();
      });
    });
  });

  it('should return null for valid patterns', (done) => {
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
        done();
      });
    });
  });
});
