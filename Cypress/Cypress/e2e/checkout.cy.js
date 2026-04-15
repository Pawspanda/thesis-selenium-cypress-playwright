describe('Checkout Test', () => {

    beforeEach(() => {
        cy.loginBookstore()
        cy.visit('/bookstore')
        cy.addBook('674108466cb6226060a20d44')
        cy.get('.position-relative > img').click()
    })

    for (let i = 1; i <= 50; i++) {
        it('Successful purchase', () => {
            cy.contains('Proceed To Checkout').click()

            cy.fillForm(
                'Happy', 
                'Turku, Finland', 
                'Happy User', 
                '4242424242424242', 
                '06', 
                '2028', 
                '232')

            cy.get('[data-testid="purchase"]').click()

            cy.get('#flash > b')
            .should('contain', 'Your purchase was successful!')
        })

        it('Expired card', () => {

            cy.contains('Proceed To Checkout').click()

            cy.fillForm(
                'Happy', 
                'Turku, Finland', 
                'Happy User', 
                '4242424242424242', 
                '06', 
                '2024', 
                '232')

            cy.get('[data-testid="purchase"]').click()

            cy.get('#charge-error')
            .should('contain', "Your card's expiration year is invalid")
        })

        it('Invalid card number', () => {
            
            cy.contains('Proceed To Checkout').click()

            cy.fillForm(
                'Happy', 
                'Turku, Finland', 
                'Happy User', 
                '4242424242424213', 
                '06', 
                '2028', 
                '232')

            cy.get('[data-testid="purchase"]').click()

            cy.get('#charge-error')
            .should('contain', 'Your card number is incorrect')
        })
    }
})