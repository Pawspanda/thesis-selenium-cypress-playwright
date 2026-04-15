const { describe, it, before, after } = require('mocha');
const assert = require("assert");
const createDriver = require('../utils/driver');

describe('Home Page', function () {

    this.timeout(50000);

    let driver;

    beforeEach(async function () {
        driver = await createDriver();
    
    });

    afterEach(async function () {
        await driver.quit();

    });

    for (let i = 1; i <= 50; i++) {
        it('Opens home page successfully', async function () {
            await driver.get('https://practice.expandtesting.com/');

        });
    }

});