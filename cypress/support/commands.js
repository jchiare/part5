// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => { 
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/login',
    body: {
        "username": "testuser",
        "password":"12345678"
    }
  })
  .then((resp) => {
    window.localStorage.setItem('blogUser',  JSON.stringify(resp.body))
  })
})

Cypress.Commands.add('createUser', () => { 
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/users',
    body: {
        "username": "testuser",
        "password":"12345678",
        "name": "Test User - test",
    }
  })
  .then((resp) => {
    window.localStorage.setItem('blogUser',  JSON.stringify(resp.body))
  })
})

Cypress.Commands.add('clearDB', () => { 
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/testing/reset'
  })
})