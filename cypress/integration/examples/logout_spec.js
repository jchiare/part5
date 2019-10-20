describe('Blogs page functionality ', function() {
  beforeEach(function() { 
    cy.login()
    cy.visit('http://localhost:3000')
  })
  it('logs user out',() => {
    cy.get('[data-cy="logout"]').click()
    cy.contains('Login to application')
  })
})