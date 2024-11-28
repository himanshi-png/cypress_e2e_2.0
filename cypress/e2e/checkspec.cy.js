describe('template spec', () => {

  let skipDates = [];

  before(() => {
    cy.request('https://cypress-e2e-2-0.onrender.com/list-skip-dates')
      .then((response) => {
        expect(response.status).to.eq(200);
        skipDates = response.body.skipDates;
      });
  });

  beforeEach('Exception Handling', () => {

    cy.on('uncaught:exception', (err) => {

      console.log('Exception handling', err);
      return false;

    });

    cy.visit('https://erp.atriina.com/login');

  });

  it('Login in ERP for checkin', () => {

    const today = '2024-11-14'

    cy.task('log', `Today: ${today}`, skipDates.includes(today));
    cy.task('log', `skipDates: ${JSON.stringify(skipDates)}`);

    if (skipDates.includes(today)) {
      it('Skip tests for today', () => {
        cy.task('log', `Tests are skipped for today  ${today}`);
      });
    } else {
      it('Run tests', () => {
        cy.get('#login_email').type(Cypress.env('USERNAME'));
        cy.get('#login_password').type(Cypress.env('PASSWORD'));
        cy.get('[type="submit"]').contains('Login').click();
        cy.get('#navbar-search').type('Employee Check');
        cy.get('#awesomplete_list_1').children().first().click();
        cy.get('[data-label="Add Employee Checkin"]').click();
        cy.get('select[data-fieldtype="Select"][data-fieldname="log_type"]').select('IN');
        // cy.wait(1000);
        // cy.get('[data-label="Save"]').click();
        // cy.wait(1000);
      });
    }

  });
})