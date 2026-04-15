describe('Registeration', () => {
  
  beforeEach(() => {
    cy.visitRegister()
  })

  for (let i = 1; i <= 1; i++) {
    it('New registration', () => {
      cy.register('Happyuser', 'NewSecretPassword!', 'NewSecretPassword!')
      cy.get('#flash > b').should('not exist')
    })

    it('Existing account', () => {
      cy.register('practice', 'SuperSecretPassword!', 'SuperSecretPassword!')
      cy.get('#flash > b')
        .should('contain', 'Username is already taken')
    })

    it('Passwords do not match', () => {
      cy.register('Newuser', 'NewSecretPassword!', 'UserSecretPassword!')
      cy.get('#flash > b')
        .should('contain', 'Passwords do not match')
    })

      it('Special character in name', () => {
      cy.register('SpecialUser!', 'NewSecretPassword!', 'NewSecretPassword!')
      cy.get('#flash > b')
        .should('contain', 'Invalid username')
    })
  }
})