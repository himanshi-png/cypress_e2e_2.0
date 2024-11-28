describe('template spec', () => {

  beforeEach('Exception Handling', () => {

    cy.on('uncaught:exception', (err) => {

      console.log('Exception handling', err);
      return false;

    });

    cy.visit('https://erp.atriina.co/login');

  });

  it('Login in ERP for checkin', () => {

    const today = new Date().toISOString().split('T')[0];

    if (skipDates.includes(today)) {
      it('Skip tests for today', () => {
        cy.log('Tests are skipped for today');
      });
    } else {
      it('Run tests', () => {
        cy.get('#login_email').type(Cypress.env('USERNAME'));
        cy.get('#login_password').type(Cypress.env('PASSWORD'));
        cy.get('[type="submit"]').contains('Login').click();
        cy.get('#navbar-search').type('Employee Check');
        cy.get('#awesomplete_list_1').children().first().click();
        cy.get('[data-label="Add Employee Checkin"]').click();
      });
    }

    // cy.get('.input-with-feedback.form-control.bold[data-fieldname="employee"]')
    //   .type(Cypress.env('EMP_ID'));
    // cy.get('select[data-fieldtype="Select"]').select('IN');
    // cy.wait(1000);
    // cy.get('[data-label="Save"]').click();
    // cy.wait(1000);
  });
})