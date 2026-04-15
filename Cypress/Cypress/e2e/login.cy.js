describe('Login Tests', () => {
  
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visitLogin()
    })

  // for (let i = 1; i <= 50; i++) {
  //   it('User can login', () => {
  //     cy.login('practice', 'SuperSecretPassword!')

  //     cy.get('#flash').should('contain', 'logged in')

  //     cy.contains('.button', 'Logout').click()
  //     cy.get('#flash').should('contain', 'logged out')
  //   })

  //   it('Invalid username', () => {
  //     cy.login('wrong', 'SuperSecretPassword!')
  //     cy.get('#flash > b')
  //       .should('contain', 'Your username is invalid')
  //   })

  //   it('Invalid password', () => {
  //     cy.login('practice', 'wrongPassword')
  //     cy.get('#flash > b')
  //       .should('contain', 'Your password is invalid')
  //   })
  // }
})