describe('App', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('should have a title', () => {
    cy.title().should('be.equal', 'Angular Express');
  });

  it('should have <nav>', () => {
    cy.get('nav');
  });

  it('should have correct nav text for Home', () => {
    cy.get('nav a:first-child').should('have.text', 'HOME');
  });

  it('should have correct nav text for About', () => {
    cy.get('nav a:nth-child(2)').should('have.text', 'ABOUT');
  });

});
