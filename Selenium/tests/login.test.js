const { describe, it } = require('mocha');
const assert = require('assert');
const createDriver = require('../utils/driver');
const LoginPage = require('../pages/LoginPage');

describe('Login Tests', function () {

    this.timeout(50000);

    let driver;
    let loginPage;

    beforeEach(async function () {
        driver = await createDriver();
        loginPage = new LoginPage(driver);
        await loginPage.open();
    });

    afterEach(async function () {
        await driver.quit();
    });

    for (let i = 1; i <= 100; i++) {
        it('User can login', async function () {

            await loginPage.login('practice', 'SuperSecretPassword!');

            let message = await loginPage.getFlashMessage();
            assert(message.includes('You logged into'));

            await loginPage.logout();

            let text = await loginPage.getFlashMessage();
            assert(text.includes('logged out'));

        });

        it('Invalid username', async function () {

            await loginPage.login('Mr. peter', 'SuperSecretPassword!');

            let message = await loginPage.getFlashMessage();
            assert(message.includes('Your username is invalid'));


        });

        it('Invalid password', async function () {

            await loginPage.login('practice', 'NotSoSecretPassword!');

            let message = await loginPage.getFlashMessage();
            assert(message.includes('Your password is invalid'));


        });
    }

});