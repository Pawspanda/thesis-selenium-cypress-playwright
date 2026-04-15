// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

//Websites
Cypress.Commands.add('visitRegister', () => {
    cy.visit('/register')
})

Cypress.Commands.add('visitLogin', () => {
    cy.visit('/login')
})

//Registration
Cypress.Commands.add('register', (username, password, confirmPassword) => {
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('#confirmPassword').type(confirmPassword)
    cy.contains('button', 'Register').click()
})

//Login
Cypress.Commands.add('login', (username, password) => {
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('#submit-login').click()
})

//Bookstore
Cypress.Commands.add('loginBookstore', () => {
    cy.visit('/bookstore')

    cy.get('[data-testid="goto-signin"]').click()

    cy.get('#email').type('happyuser@email.com')
    cy.get('#password').type('NewPassword!')

    cy.get('#submit').contains('Sign In').click()

    cy.get('#welcome-message').should('contain', 'Hello')
})

Cypress.Commands.add('addBook', (bookId) => {
    cy.get(`[data-testid="cart-${bookId}"]`)
        .contains('Add To Cart')
        .click()
})

Cypress.Commands.add('fillForm', (name, address, cardName, cardNumber, cardExpiryMonth, cardExpiryYear, cvc) => {
    cy.get('#name').type(name)
    cy.get('#address').type(address)
    cy.get('#card-name').type(cardName)
    cy.get('#card-number').type(cardNumber)
    cy.get('#card-expiry-month').type(cardExpiryMonth)
    cy.get('#card-expiry-year').type(cardExpiryYear)
    cy.get('#card-cvc').type(cvc)
})