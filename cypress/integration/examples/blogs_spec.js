describe('Blogs page functionality ', function() {
  beforeEach(function() { 
    cy.clearDB()
    cy.createUser()
    cy.login()
    cy.visit('http://localhost:3000')
  })

  it('default blogs load', function() {
    cy.contains('Blogs')
  })
})