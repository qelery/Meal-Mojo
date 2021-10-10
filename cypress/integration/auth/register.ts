import { mockLoginResponseSuccess } from '../../fixtures/mock-data';

describe('Registration Modal', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy="navbar-register"').click();
  });

  describe('When user registers', () => {
    it('should be successful', { scrollBehavior: false }, () => {
      cy.intercept('POST', '**/api/users/register', mockLoginResponseSuccess).as(
        'postRegister'
      );

      const firstName = 'John';
      const lastName = 'Smith';
      const email = 'john@gmail.com';
      const password = 'bluefish45';

      fillOutRegisterForm(firstName, lastName, email, password);

      const expectedReqBody = {
        firstName,
        lastName,
        email,
        password,
        role: 'CUSTOMER',
      };

      cy.wait('@postRegister').then((xhr) => {
        expect(xhr.request.body).to.deep.eq(expectedReqBody);
      });
      cy.get('[data-cy="register-form"]').should('not.exist');
      cy.get('[data-cy="login-button"]').should('not.exist');
      cy.get('[data-cy="navbar-logout"]').should('exist');
    });

    it(
      'should validate first name, last name, email, and password patterns',
      { scrollBehavior: false },
      () => {
        cy.intercept('POST', '**/api/users/register', mockLoginResponseSuccess);

        const invalidFirstName = 'John5';
        const validFirstName = 'John';
        const invalidLastName = '12345';
        const validLastName = 'Smith';

        const firstNameError = 'Please enter a valid first name.';
        const lastNameError = 'Please enter a valid last name.';

        cy.get('[data-cy="register-first-name"]').type(invalidFirstName);
        cy.get('[data-cy="register-next"]').should('be.disabled');
        cy.get('[data-cy="register-form"]').contains(firstNameError);
        cy.get('[data-cy="register-first-name"]').clear();
        cy.get('[data-cy="register-first-name"]').type(validFirstName);
        cy.get('[data-cy="register-form"]').should('not.contain', firstNameError);

        cy.get('[data-cy="register-last-name"]').type(invalidLastName);
        cy.get('[data-cy="register-next"]').should('be.disabled');
        cy.get('[data-cy="register-form"]').contains(lastNameError);
        cy.get('[data-cy="register-last-name"]').clear();
        cy.get('[data-cy="register-last-name"]').type(validLastName);
        cy.get('[data-cy="register-form"]').should('not.contain', lastNameError);

        cy.get('[data-cy="register-next"]').click();

        const invalidEmail = 'johnsmith';
        const validEmail = 'john@gmail.com';
        const passwordTooShort = 'blue';
        const passwordNoNumberOrUpperCaseOrSymbol = 'bluefish';
        const validPassword = 'bluefish45';
        const incorrectConfirmPassword = 'blueFish45';

        const emailError = 'Please enter a valid email.';

        cy.get('[data-cy="register-email"]').type(invalidEmail).blur();
        cy.get('[data-cy="register-submit"]').should('be.disabled');
        cy.get('[data-cy="register-form"]').contains(emailError);
        cy.get('[data-cy="register-email"]').clear();
        cy.get('[data-cy="register-email"]').type(validEmail).blur();
        cy.get('[data-cy="register-form"]').should('not.contain', emailError);

        cy.get('[data-cy="register-password"]').type(passwordTooShort).blur();
        cy.get('[data-cy="register-form"]').contains('Does not meet requirements');

        cy.get('[data-cy="register-password"]').clear().blur();
        cy.get('[data-cy="register-form"]').should(
          'not.contain',
          'Does not meet requirements'
        );

        cy.get('[data-cy="register-password"]')
          .type(passwordNoNumberOrUpperCaseOrSymbol)
          .blur();
        cy.get('[data-cy="register-form"]').contains('Does not meet requirements');

        cy.get('[data-cy="register-password"]').clear().blur();
        cy.get('[data-cy="register-password"]').type(validPassword);
        cy.get('[data-cy="register-form"]').should(
          'not.contain',
          'Does not meet requirements'
        );

        cy.get('[data-cy="register-confirm-password"]').type(incorrectConfirmPassword);
        cy.get('[data-cy="register-form"]').contains(`Passwords don't match`);

        cy.get('[data-cy="register-confirm-password"]').clear().blur();
        cy.get('[data-cy="register-form"]').should(
          'not.contain',
          `Passwords don't match`
        );

        cy.get('[data-cy="register-confirm-password"]').type(validPassword);
        cy.get('[data-cy="register-form"]').should(
          'not.contain',
          `Passwords don't match`
        );

        cy.get('[data-cy="register-submit"]').click();

        cy.get('[data-cy="register-form"]').should('not.exist');
        cy.get('[data-cy="login-button"]').should('not.exist');
        cy.get('[data-cy="navbar-logout"]').should('exist');
      }
    );

    it(
      'should show error message if email already registered',
      { scrollBehavior: false },
      () => {
        cy.intercept('POST', '**/api/users/register', { statusCode: 409 }).as(
          'postRegister'
        );

        const firstName = 'John';
        const lastName = 'Smith';
        const email = 'john@gmail.com';
        const password = 'bluefish45';

        fillOutRegisterForm(firstName, lastName, email, password);

        cy.wait('@postRegister');
        cy.get('[data-cy="register-form"]').contains(
          'An account exists with that email address.'
        );
      }
    );

    it(
      'should show error message if unexpected server error',
      { scrollBehavior: false },
      () => {
        cy.intercept('POST', '**/api/users/register', { statusCode: 500 }).as(
          'postRegister'
        );

        const firstName = 'John';
        const lastName = 'Smith';
        const email = 'john@gmail.com';
        const password = 'bluefish45';

        fillOutRegisterForm(firstName, lastName, email, password);

        cy.wait('@postRegister');
        cy.get('[data-cy="register-form"]').contains(
          'Server Error. Please try again later.'
        );
      }
    );
  });

  it('should contain link to user  login', { scrollBehavior: false }, () => {
    cy.get('[data-cy="register-switch-to-login"]').click();
    cy.contains('Welcome back!');
  });

  it('should be closable', { scrollBehavior: false }, () => {
    cy.get('[data-cy="register-close"]').click();
    cy.get('[data-cy="register-form"]').should('not.exist');
  });
});

const fillOutRegisterForm = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  cy.get('[data-cy="register-first-name"]').type(firstName);
  cy.get('[data-cy="register-last-name"]').type(lastName);
  cy.get('[data-cy="register-next"]').click();

  cy.get('[data-cy="register-email"]').type(email);
  cy.get('[data-cy="register-password"]').type(password);
  cy.get('[data-cy="register-confirm-password"]').type(password);

  cy.get('[data-cy="register-submit"]').click();
};
