import { nameValidator } from './name-async-validator.directive';
import { FormControl } from '@angular/forms';
import { fakeAsync, tick } from '@angular/core/testing';

const ASYNC_VALIDATOR_DELAY_MS = 500;

describe('NameAsyncValidator Directive', () => {
  it('should require at least one letter', fakeAsync(() => {
    const validInputs = ['a', 'A', 'z', 'Z', 'À', 'ÿ'];

    validInputs.forEach((input: string) => {
      const formControl = new FormControl(input, [], nameValidator());
      tick(ASYNC_VALIDATOR_DELAY_MS);
      expect(formControl.errors).toBeNull();
    });

    const validCharsButNoLetterInputs = [`'`, `-`, `.`, `,`, `'-.,`];

    validCharsButNoLetterInputs.forEach((input: string) => {
      const formControl = new FormControl(input, [], nameValidator());
      tick(ASYNC_VALIDATOR_DELAY_MS);
      expect(formControl.errors).toEqual({ invalidName: true });
    });
  }));

  it('should return a validation error for blank inputs', fakeAsync(() => {
    const inputs = ['', ' ', '\n\n\n', ' \n\t\r'];

    inputs.forEach((input: string) => {
      const formControl = new FormControl(input, [], nameValidator());
      tick(ASYNC_VALIDATOR_DELAY_MS);
      expect(formControl.errors).toEqual({ blankName: true });
    });
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
      const formControl = new FormControl(input, [], nameValidator());
      tick(ASYNC_VALIDATOR_DELAY_MS);
      expect(formControl.errors).toEqual({ invalidName: true });
    });
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
      const formControl = new FormControl(input, [], nameValidator());
      tick(ASYNC_VALIDATOR_DELAY_MS);
      expect(formControl.errors).toBeNull();
    });
  }));

  it('should delay for a fixed amount of time before performing validation', fakeAsync(() => {
    const invalidInput = '#$%^&';
    const noDelay = 0;
    const tooShortOfDelay = ASYNC_VALIDATOR_DELAY_MS - 10;
    const expectedDelay = ASYNC_VALIDATOR_DELAY_MS;

    let formControl = new FormControl(invalidInput, [], nameValidator());
    tick(noDelay);
    expect(formControl.errors).toBeNull();

    formControl = new FormControl(invalidInput, [], nameValidator());
    tick(tooShortOfDelay);
    expect(formControl.errors).toBeNull();

    formControl = new FormControl(invalidInput, [], nameValidator());
    tick(expectedDelay);
    expect(formControl.errors).toEqual({ invalidName: true });
  }));

  it('should clear errors and restart the countdown-until-validation timer when input is changes', fakeAsync(() => {
    const invalidInput1 = '#$%^&';
    const invalidInput2 = '#$%^&*+';

    const formControl = new FormControl(invalidInput1, [], nameValidator());
    tick(ASYNC_VALIDATOR_DELAY_MS);
    expect(formControl.errors).toEqual({ invalidName: true });
    formControl.setValue(invalidInput2);
    tick(1);
    expect(formControl.errors).toBeNull();
    tick(ASYNC_VALIDATOR_DELAY_MS - 1);
    expect(formControl.errors).toEqual({ invalidName: true });
  }));
});
