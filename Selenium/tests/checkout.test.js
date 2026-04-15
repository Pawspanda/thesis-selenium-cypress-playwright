const { describe, it } = require('mocha');
const assert = require('assert');
const createDriver = require('../utils/driver');
const BookstorePage = require('../pages/BookstorePage');
const CheckoutPage = require('../pages/CheckoutPage');

describe('Checkout Test', function () {

    this.timeout(50000);

    let driver;
    let bookstore;
    let checkout;

    beforeEach(async function () {

        driver = await createDriver();

        bookstore = new BookstorePage(driver);
        checkout = new CheckoutPage(driver);

        await bookstore.open();
        await bookstore.goToLogin();

        await bookstore.login(
            'happyuser@email.com',
            'NewPassword!'
        );

        await bookstore.open();

        await bookstore.addBook('cart-674108466cb6226060a20d44');
        // await bookstore.addBook('cart-67410a586cb6226060a20d8d');
        // await bookstore.addBook('cart-67410b8c6cb6226060a20da4');

        await bookstore.openCart();

    });

    afterEach(async function () {
        await driver.quit();
    });

    for (let i = 1; i <= 50; i++) {
        it('Successful purchase', async function () {

            await checkout.proceedToCheckout();

            await checkout.fillCheckoutForm(
                'Happy',
                'Turku, Finland',
                'Happy User',
                '4242424242424242',
                '06',
                '2028',
                '232'
            );

            await checkout.purchase();

            let message = await checkout.getSuccessMessage();

            assert(message.includes('Your purchase was successful'));
        });


        it('Expired card', async function () {

            await checkout.proceedToCheckout();

            await checkout.fillCheckoutForm(
                'Happy',
                'Turku, Finland',
                'Happy User',
                '4242424242424242',
                '06',
                '2024',
                '232'
            );

            await checkout.purchase();

            let error = await checkout.getErrorMessage();

            assert(error.includes('expiration year is invalid'));
        });


        it('Invalid card number', async function () {

            await checkout.proceedToCheckout();

            await checkout.fillCheckoutForm(
                'Happy',
                'Turku, Finland',
                'Happy User',
                '4242424242422413',
                '06',
                '2028',
                '232'
            );

            await checkout.purchase();

            let error = await checkout.getErrorMessage();

            assert(error.includes('card number is incorrect'));
        });
    }

});