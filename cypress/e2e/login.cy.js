import {loginPage} from '../../src/utils/uiCopies';

describe('Login feature', () => {
  beforeEach(() => {
    cy.log('**Loading the login page...**');
    cy.visit('/login');
  });
  it('happy path', () => {
    cy.log('**...Shows the app name**');
    cy.findByRole('heading', {name: loginPage.titleText}).should('be.visible');
    cy.log('**...Shows an example email address in the text field**');
    cy.findByLabelText(loginPage.fieldLabel).should(
      'have.attr',
      'placeholder',
      loginPage.fieldPlaceholder,
    );
    cy.log('**...Shows a submit button**');
    cy.findByRole('button', {name: loginPage.buttonLabel}).should(
      'have.attr',
      'type',
      'submit',
    );
  });
  it('hanles the lack of an email address', () => {
    // TODO #259: Customize error handling
    cy.findByLabelText(loginPage.fieldLabel).should('have.attr', 'required');
  });
  it('handles invalid email addresses', () => {
    // TODO #259: Customize error handling
    cy.findByLabelText(loginPage.fieldLabel).should(
      'have.attr',
      'type',
      'email',
    );
  });
});
