const { describe, it } = require('mocha');
const assert = require('assert');
const createDriver = require('../utils/driver');
const BookstorePage = require('../pages/BookstorePage');

describe('Cart Test', function () {

    this.timeout(50000);

    let driver;
    let bookstore;


    beforeEach(async function () {

        driver = await createDriver();

        bookstore = new BookstorePage(driver);

        await bookstore.open();
        await bookstore.goToLogin();

        await bookstore.login(
            'happyuser@email.com',
            'NewPassword!'
        );
    
        await bookstore.open();

    });

    afterEach(async function () {
        await driver.quit();
    });

    for (let i = 1; i <= 50; i++) {
        it('Adding books to cart', async function () {

            await bookstore.addBook('cart-674108466cb6226060a20d44');
            await bookstore.addBook('cart-67410a586cb6226060a20d8d');
            await bookstore.addBook('cart-67410b8c6cb6226060a20da4');

            await bookstore.openCart();

            let url = await driver.getCurrentUrl();

            assert(url.includes('cart'));
        });

        it('Removing books from cart', async function () {

            await bookstore.addBook('cart-674108466cb6226060a20d44');
            await bookstore.addBook('cart-67410a586cb6226060a20d8d');
            await bookstore.addBook('cart-67410b8c6cb6226060a20da4');

            await bookstore.openCart();

            await bookstore.removeBook('67410a586cb6226060a20d8d');
            await bookstore.removeBook('674108466cb6226060a20d44');
            await bookstore.removeBook('67410b8c6cb6226060a20da4');

            let url = await driver.getCurrentUrl();

            assert(url.includes('cart'));
        });
    }

});