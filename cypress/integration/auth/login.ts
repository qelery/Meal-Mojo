
// TODO: YOutube video https://www.youtube.com/watch?v=5XQOK0v_YRE&t=506s



import { mockLoginResponseSuccess } from '../../fixtures/mock-data';

describe('Login Modal', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy="navbar-login"]').click();
  });

  describe('When user logs in', () => {
    it('should be successful', { scrollBehavior: false }, () => {
      cy.intercept('POST', '**/api/users/login', mockLoginResponseSuccess).as('postLogin');

      const expectedUsername = 'john@gmail.com';
      const expectedPassword = 'pass1234';
      const expectedReqBody = {
        username: expectedUsername,
        password: expectedPassword,
      };

      cy.get('[data-cy="login-submit"]').should('be.disabled');

      cy.get('[data-cy="login-form"] input[name="username"]').type(expectedUsername);
      cy.get('[data-cy="login-form"] input[name="password"]').type(expectedPassword);
      cy.get('[data-cy="login-submit"]').click();


      cy.wait('@postLogin').then((xhr) => {
        expect(xhr.request.body).to.deep.eq(expectedReqBody);
      });
      cy.get('[data-cy="login-form"]').should('not.exist');
      cy.get('[data-cy="login-button"]').should('not.exist');
      cy.get('[data-cy="navbar-logout"]').should('exist');
    });

    it('should show error message if user is unregistered',{ scrollBehavior: false }, () => {
      cy.intercept('POST', '**/api/users/login', { statusCode: 403 }).as('postLogin');

      cy.get('[data-cy="login-form"] input[name="username"]').type('john@gmail.com');
      cy.get('[data-cy="login-form"] input[name="password"]').type('pass1234');
      cy.get('[data-cy="login-submit"]').click();

      cy.wait('@postLogin');

      cy.get('[data-cy="login-error"]').contains('Invalid username or password.');
    });

    it('should show error message if unexpected server error',{ scrollBehavior: false }, () => {
      cy.intercept('POST', '**/api/users/login', { statusCode: 500 }).as('postLogin');

      cy.get('[data-cy="login-form"] input[name="username"]').type('john@gmail.com');
      cy.get('[data-cy="login-form"] input[name="password"]').type('pass1234');
      cy.get('[data-cy="login-submit"]').click();

      cy.wait('@postLogin');

      cy.get('[data-cy="login-error"]').contains('Server Error. Please try again later.');
    });
  });

  it('should contain link to user registration', { scrollBehavior: false }, () => {
    cy.get('[data-cy="login-switch-to-register"]').click();
    cy.contains('Ready to eat? Register Below!');
  });

  it('should be closable', { scrollBehavior: false }, () => {
    cy.get('[data-cy="login-close"]').click();
    cy.get('[data-cy="login-form"]').should('not.exist');
  });
});
