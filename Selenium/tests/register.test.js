const { describe, it } = require('mocha');
const assert = require('assert');
const createDriver = require('../utils/driver');
const RegisterPage = require('../pages/RegisterPage');

describe('Register Tests', function () {

    this.timeout(50000);

    let driver;
    let registerPage;

    beforeEach(async function () {
        driver = await createDriver();
        registerPage = new RegisterPage(driver);
        await registerPage.open();
    })

    afterEach(async function () {
        await driver.quit();
    });

    for (let i = 1; i <= 50; i++) {
        it('New registration', async function () {

            await registerPage.register(
                'Happyuser',
                'NewSecretPassword!',
                'NewSecretPassword!'
            );

            let message = await registerPage.getAlert();

            assert(message.includes(''));

        });

        it('Existing account', async function () {

            await registerPage.register(
                'practice',
                'SuperSecretPassword!',
                'SuperSecretPassword!'
            );

            let message = await registerPage.getAlert();

            assert(message.includes('Username is already taken'));

        });

        it('Passwords do not match', async function () {

            await registerPage.register(
                'NewUser',
                'NewSecretPassword!',
                'UserSecretPassword!'
            );

            let message = await registerPage.getAlert();

            assert(message.includes('Passwords do not match'));

        });
    
        it('Register name with special character', async function () {

            await registerPage.register(
                'SpecialUser!',
                'NewSecretPassword!',
                'NewSecretPassword!'
            );

            let message = await registerPage.getAlert();

            assert(message.includes('Invalid username'));

        });
    }

});