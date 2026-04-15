describe('Cart Test', () => {

  beforeEach(() => {
    cy.loginBookstore()
    cy.visit('/bookstore')
  })

    // for (let i = 1; i <= 50; i++) {
    //     it('Adding books to cart', () => {
    //         cy.addBook('67410b8c6cb6226060a20da4')
    //         cy.addBook('67410a586cb6226060a20d8d')
    //         cy.addBook('674108466cb6226060a20d44')
    //         cy.get('.position-relative > img').click()
    //     })

    //     it('Removing books from cart', () => {
    //         cy.addBook('67410b8c6cb6226060a20da4')
    //         cy.addBook('67410a586cb6226060a20d8d')
    //         cy.addBook('674108466cb6226060a20d44')
    //         cy.get('.position-relative > img').click()

    //         cy.contains('Delete').click({ multiple: true, force: true })
    //     })
    // }
})