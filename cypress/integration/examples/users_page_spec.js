describe('Test users page functionality ', function() {

  beforeEach(function() {
    cy.clearDB()
    cy.createUser() 
    cy.login()
    cy.visit('http://localhost:3000/users')
  })
  
  it('has user information',function() {
    cy.get('table').find('tr').as('rows')
    cy.get('@rows').eq(1).contains('Test User - test')
    cy.get('@rows').eq(1).contains('0')
  })
})
