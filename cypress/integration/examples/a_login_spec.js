describe('Login page ', function() {
  beforeEach(function() { 
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Login to application')
  })

  it('wrong login information executes error notification', function() {
    cy.get('[data-cy="username_login"]').type('not_a_user')
    cy.get('[data-cy="password_login"]').type('1234a5678')
    cy.get('button[type=submit]').click()
    cy.contains('Invalid email or password')
  })

  it('can login with testuser information', function() {
    cy.get('[data-cy="username_login"]').type('testuser')
    cy.get('[data-cy="password_login"]').type('12345678')
    cy.get('button[type=submit]').click()
  })
})