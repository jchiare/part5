describe('Add new blog ', function() {

  beforeEach(function() {
    cy.clearDB()
    cy.createUser() 
    cy.login()
    cy.visit('http://localhost:3000')
    cy.get('[data-cy="new_blog"]').as('newBlog')
  })
  
  it('open and input blog information',function() {
    cy.contains('New Blog')
    this.newBlog.click()
    cy.contains('Create New Blog').should('be.visible')
    cy.get('[data-cy="blog_title"] input').type('New Blog Title')
    cy.get('[data-cy="blog_author"] input').type('New Blog Author')
    cy.get('[data-cy="blog_url"] input').type('www.anywhere.ca')
    cy.get('[data-cy="submit_new_blog"]').click()
    cy.contains('New Blog Title New Blog Author')
    cy.get('.positive').contains('Added New Blog Title by New Blog Author')
  })
})
