import { mockUser } from "../../fixtures/mock-data";

describe('Logout', () => {
  beforeEach(() => {
    window.localStorage.setItem('auth-user', JSON.stringify(mockUser));
    window.localStorage.setItem('auth-token', 'abc123');
    cy.visit('/');
  });

  describe('When user is logged in', () => {
    it('should be able to log out', () => {
      cy.get('[data-cy="navbar-logout"]').click();

      cy.get('[data-cy="navbar-login"]').should('exist');
      cy.get('[data-cy="navbar-register"]').should('exist');
    });
  });
});
