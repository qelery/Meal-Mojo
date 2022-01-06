import { FormControl, FormGroup } from '@angular/forms';
import { sameValueValidator } from './same-value-validator.directive';

const VALUE_MISMATCH_ERROR = { sameValue: true };

describe('SameValueValidator', () => {
  describe('when validator receives control names as two separate arguments', () => {
    let controlA;
    let controlB;
    let formGroup;

    beforeEach(() => {
      controlA = new FormControl();
      controlB = new FormControl();
      formGroup = new FormGroup(
        { controlA, controlB },
        {
          validators: sameValueValidator('controlA', 'controlB'),
        }
      );
    });

    it('should return null if both controls have the same value', () => {
      controlA.setValue('123');
      controlB.setValue('123');

      expect(formGroup.errors).toBeNull();

      controlA.setValue('');
      controlB.setValue('');

      expect(formGroup.errors).toBeNull();

      controlA.setValue(null);
      controlB.setValue(null);

      expect(formGroup.errors).toBeNull();
    });

    it('should return a validation error if both controls do NOT have the same value', () => {
      controlA.setValue('abc');
      controlB.setValue('123');

      expect(formGroup.errors).toEqual(VALUE_MISMATCH_ERROR);

      controlA.setValue('123a');
      controlB.setValue('123A');

      expect(formGroup.errors).toEqual(VALUE_MISMATCH_ERROR);

      controlA.setValue('123a');
      controlB.setValue('');

      expect(formGroup.errors).toEqual(VALUE_MISMATCH_ERROR);

      controlA.setValue('123a');
      controlB.setValue(null);

      expect(formGroup.errors).toEqual(VALUE_MISMATCH_ERROR);
    });

    it('should return a validation error if one of the control names passed in as an argument does not exist', () => {
      formGroup = new FormGroup(
        { controlA, controlB },
        {
          validators: sameValueValidator('controlA', 'nonExistentControlName'),
        }
      );

      controlA.setValue('123');
      controlB.setValue('123');

      expect(formGroup.errors).toEqual(VALUE_MISMATCH_ERROR);
    });
  });

  describe('when validator receives control names as an array of arguments', () => {
    let controlA;
    let controlB;
    let controlC;
    let formGroup;

    beforeEach(() => {
      controlA = new FormControl();
      controlB = new FormControl();
      controlC = new FormControl();
      formGroup = new FormGroup(
        { controlA, controlB, controlC },
        {
          validators: sameValueValidator(['controlA', 'controlB', 'controlC']),
        }
      );
    });

    it('should return null if all controls have the same value', () => {
      controlA.setValue('123');
      controlB.setValue('123');
      controlC.setValue('123');

      expect(formGroup.errors).toBeNull();

      controlA.setValue('');
      controlB.setValue('');
      controlC.setValue('');

      expect(formGroup.errors).toBeNull();

      controlA.setValue(null);
      controlB.setValue(null);
      controlC.setValue(null);

      expect(formGroup.errors).toBeNull();
    });

    it('should return a validation error if all controls do NOT have the same value', () => {
      controlA.setValue('123');
      controlB.setValue('abc');
      controlC.setValue('XYZ');

      expect(formGroup.errors).toEqual(VALUE_MISMATCH_ERROR);

      controlA.setValue('123a');
      controlB.setValue('123a');
      controlC.setValue('123A');

      expect(formGroup.errors).toEqual(VALUE_MISMATCH_ERROR);

      controlA.setValue('123');
      controlA.setValue('123');
      controlC.setValue('');

      expect(formGroup.errors).toEqual(VALUE_MISMATCH_ERROR);

      controlA.setValue('123');
      controlA.setValue('123');
      controlC.setValue(null);

      expect(formGroup.errors).toEqual(VALUE_MISMATCH_ERROR);
    });

    it('should return a validation error if one of the control names passed in as an argument does not exist', () => {
      formGroup = new FormGroup(
        { controlA, controlB, controlC },
        {
          validators: sameValueValidator([
            'controlA',
            'controlB',
            'controlC',
            'nonExistentControlName',
          ]),
        }
      );

      controlA.setValue('123');
      controlB.setValue('123');
      controlC.setValue('123');

      expect(formGroup.errors).toEqual(VALUE_MISMATCH_ERROR);
    });
  });
});
