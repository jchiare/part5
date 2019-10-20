describe('Blogs page functionality ', function() {
  beforeEach(function() { 
    cy.login()
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
  })

  it('default blogs load', function() {
    cy.contains('Blogs')
  })
})