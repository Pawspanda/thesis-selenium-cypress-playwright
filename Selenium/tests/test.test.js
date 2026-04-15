const {By, Builder, Browser, until} = require('selenium-webdriver');
const assert = require("assert");

// describe('TS01', function () {

//     this.timeout(50000);

//     let driver;

//     before(async function () {
//         driver = await new Builder().forBrowser('chrome').build();
    
//     });

//     it('opens the practice site', async function () {
//         await driver.get('https://practice.expandtesting.com/');

//     });

//     after(async function () {
//         await driver.quit();

//     });

// });

// describe('TS02 - Register', function () {
//     this.timeout(50000);

//     let driver;

//     before(async function () {
//         driver = await new Builder().forBrowser('chrome').build();
//     });

//     after(async function () {
//         await driver.quit();
//     });

//     beforeEach(async function () {
//         await driver.get('https://practice.expandtesting.com/register');
//         await driver.wait(until.elementLocated(By.id('username')), 10000);
//     });

//     it('User can register', async function () {

//         const usernameField = await driver.findElement(By.id('username'));
//         await driver.wait(until.elementIsVisible(usernameField), 5000);
//         await usernameField.sendKeys('Happyuser');

//         const passwordField = await driver.findElement(By.id('password'));
//         await driver.wait(until.elementIsVisible(passwordField), 5000);
//         await passwordField.sendKeys('NewSecretPassword!');

//         const confirmField = await driver.findElement(By.id('confirmPassword'));
//         await driver.wait(until.elementIsVisible(confirmField), 5000);
//         await confirmField.sendKeys('NewSecretPassword!');

//         const registerBtn = await driver.findElement(
//             By.css("button[type='submit'].btn-primary")
//         );
//         await driver.wait(until.elementIsVisible(registerBtn), 5000);

//         await this.driver.executeScript(
//            "arguments[0].scrollIntoView({block: 'center'});", registerBtn);

//         // Click via JavaScript to bypass overlay ads
//         await driver.executeScript("arguments[0].click();", registerBtn);

//         const alert = await driver.wait(
//             until.elementLocated(By.css('#flash > b')),
//             10000
//         );

//         assert(await alert.isDisplayed());
//     });
// });

    // it('Register with existing account', async function () {

    //     await driver.findElement(By.id('username')).sendKeys('practice');
    //     await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!');
    //     await driver.findElement(By.id('confirmPassword')).sendKeys('SuperSecretPassword!');

    //     await driver.findElement(By.xpath("//button[contains(text(),'Register')]")).click();

    //     let alert = await driver.findElement(By.css('#flash > b'));
    //     let text = await alert.getText();

    //     assert(text.includes('Username is already taken'));
    // });

    // it('Register with different passwords', async function () {

    //     await driver.findElement(By.id('username')).sendKeys('Newuser');
    //     await driver.findElement(By.id('password')).sendKeys('NewSecretPassword!');
    //     await driver.findElement(By.id('confirmPassword')).sendKeys('UserSecretPassword!');

    //     await driver.findElement(By.xpath("//button[contains(text(),'Register')]")).click();

    //     let alert = await driver.findElement(By.css('#flash > b'));
    //     let text = await alert.getText();

    //     assert(text.includes('Passwords do not match'));
    // });

    // it('Register with special user character', async function () {

    //     await driver.findElement(By.id('username')).sendKeys('SpecialUser!');
    //     await driver.findElement(By.id('password')).sendKeys('NewSecretPassword!');
    //     await driver.findElement(By.id('confirmPassword')).sendKeys('NewSecretPassword!');

    //     await driver.findElement(By.xpath("//button[contains(text(),'Register')]")).click();

    //     let alert = await driver.findElement(By.css('#flash > b'));
    //     let text = await alert.getText();

    //     assert(text.includes('Invalid username'));
    // });

// });


// describe('TS03 - Login', function () {

//     let driver;

//     beforeEach(async function () {
//         driver = await new Builder().forBrowser('chrome').build();
//         await driver.get('https://practice.expandtesting.com/login');
//     });

//     afterEach(async function () {
//         await driver.quit();
//     });

//     it('User can login', async function () {

//         // input form
//         await driver.findElement(By.id('username')).sendKeys('practice');
//         await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!');

//         // submit login
//         await driver.findElement(By.id('submit-login')).click();

//         // wait for message
//         let flash = await driver.wait(
//             until.elementLocated(By.id('flash')),
//             5000
//         );

//         assert(await flash.isDisplayed());

//         // logout
//         await driver.findElement(By.xpath("//a[contains(text(),'Logout')]")).click();

//         let logoutMessage = await driver.findElement(By.id('flash')).getText();
//         assert(logoutMessage.toLowerCase().includes('you logged out'));
//     });

//     it('User login - invalid username', async function () {

//         await driver.findElement(By.id('username')).sendKeys('Mr. Peter');
//         await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!');

//         await driver.findElement(By.id('submit-login')).click();

//         let alert = await driver.wait(
//             until.elementLocated(By.css('#flash > b')),
//             5000
//         );

//         let text = await alert.getText();

//         assert(text.includes('Your username is invalid'));
//     });

//     it('User login - invalid password', async function () {

//         await driver.findElement(By.id('username')).sendKeys('practice');
//         await driver.findElement(By.id('password')).sendKeys('NotSoSecretPassword!');

//         await driver.findElement(By.id('submit-login')).click();

//         let alert = await driver.wait(
//             until.elementLocated(By.css('#flash > b')),
//             5000
//         );

//         let text = await alert.getText();

//         assert(text.includes('Your password is invalid'));
//     });

// });

// describe('TS04 - Bookstore Cart', function () {

//     let driver;

//     beforeEach(async function () {

//         driver = await new Builder().forBrowser('chrome').build();

//         // open bookstore
//         await driver.get('https://practice.expandtesting.com/bookstore');

//         // go to sign in
//         await driver.findElement(By.css('[data-testid="goto-signin"]')).click();

//         // login
//         await driver.findElement(By.id('email')).sendKeys('happyuser@email.com');
//         await driver.findElement(By.id('password')).sendKeys('NewPassword!');

//         await driver.findElement(By.id('submit')).click();

//         // wait for welcome message
//         await driver.wait(until.elementLocated(By.id('welcome-message')), 5000);

//         // return to bookstore
//         await driver.findElement(By.css('.navbar-brand.text-capitalize')).click();

//         // verify correct page
//         let url = await driver.getCurrentUrl();
//         assert(url.includes('/bookstore'));

//     });

//     afterEach(async function () {
//         await driver.quit();
//     });

//     it('Adding books to cart and completing purchase flow', async function () {

//         // add books
//         await driver.findElement(By.css('[data-testid="cart-674108466cb6226060a20d44"]')).click();
//         await driver.findElement(By.css('[data-testid="cart-67410a586cb6226060a20d8d"]')).click();
//         await driver.findElement(By.css('[data-testid="cart-67410b8c6cb6226060a20da4"]')).click();

//         // open cart
//         await driver.findElement(By.css('.position-relative > img')).click();

//         // confirm cart page loaded
//         let current = await driver.getCurrentUrl();
//         assert(current.includes('cart'));
//     });


//     it('Adding books to cart and deleting them from cart', async function () {

//         // add books
//         await driver.findElement(By.css('[data-testid="cart-674108466cb6226060a20d44"]')).click();
//         await driver.findElement(By.css('[data-testid="cart-67410a586cb6226060a20d8d"]')).click();
//         await driver.findElement(By.css('[data-testid="cart-67410b8c6cb6226060a20da4"]')).click();

//         // open cart
//         await driver.findElement(By.css('.position-relative > img')).click();

//         // delete items
//         await driver.findElement(By.css('[href="/bookstore/remove/67410a586cb6226060a20d8d"]')).click();
//         await driver.findElement(By.css('[href="/bookstore/remove/674108466cb6226060a20d44"]')).click();
//         await driver.findElement(By.css('[href="/bookstore/remove/67410b8c6cb6226060a20da4"]')).click();

//         // verify cart page still visible
//         let current = await driver.getCurrentUrl();
//         assert(current.includes('cart'));
//     });

// });

// describe('TS05 - Checkout', function () {

//     let driver;

//     beforeEach(async function () {

//         driver = await new Builder().forBrowser('chrome').build();

//         // going to website
//         await driver.get('https://practice.expandtesting.com/bookstore');

//         // sign-in
//         await driver.findElement(By.css('[data-testid="goto-signin"]')).click();

//         await driver.findElement(By.id('email')).sendKeys('happyuser@email.com');
//         await driver.findElement(By.id('password')).sendKeys('NewPassword!');

//         await driver.findElement(By.id('submit')).click();

//         // wait for welcome message
//         await driver.wait(until.elementLocated(By.id('welcome-message')), 5000);

//         // return to bookstore
//         await driver.findElement(By.css('.navbar-brand.text-capitalize')).click();

//         // add books
//         await driver.findElement(By.css('[data-testid="cart-674108466cb6226060a20d44"]')).click();
//         await driver.findElement(By.css('[data-testid="cart-67410a586cb6226060a20d8d"]')).click();
//         await driver.findElement(By.css('[data-testid="cart-67410b8c6cb6226060a20da4"]')).click();

//         // open cart
//         await driver.findElement(By.css('.position-relative > img')).click();
//     });

//     afterEach(async function () {
//         await driver.quit();
//     });



//     it('Completing a purchase', async function () {

//         // checkout
//         await driver.findElement(By.css('[data-testid="checkout"]')).click();

//         // fill form
//         await driver.findElement(By.id('name')).sendKeys('Happy');
//         await driver.findElement(By.id('address')).sendKeys('Turku, Finland');
//         await driver.findElement(By.id('card-name')).sendKeys('Happy User');
//         await driver.findElement(By.id('card-number')).sendKeys('4242424242424242');
//         await driver.findElement(By.id('card-expiry-month')).sendKeys('06');
//         await driver.findElement(By.id('card-expiry-year')).sendKeys('2028');
//         await driver.findElement(By.id('card-cvc')).sendKeys('232');

//         await driver.findElement(By.css('[data-testid="purchase"]')).click();

//         // confirmation
//         let message = await driver.wait(
//             until.elementLocated(By.css('#flash > b')),
//             5000
//         );

//         let text = await message.getText();

//         assert(text.includes('Your purchase was successful'));
//     });



//     it('Completing a purchase with wrong old card info', async function () {

//         await driver.findElement(By.css('[data-testid="checkout"]')).click();

//         await driver.findElement(By.id('name')).sendKeys('Happy');
//         await driver.findElement(By.id('address')).sendKeys('Turku, Finland');
//         await driver.findElement(By.id('card-name')).sendKeys('Happy User');
//         await driver.findElement(By.id('card-number')).sendKeys('4242424242424242');
//         await driver.findElement(By.id('card-expiry-month')).sendKeys('06');
//         await driver.findElement(By.id('card-expiry-year')).sendKeys('2024');
//         await driver.findElement(By.id('card-cvc')).sendKeys('232');

//         await driver.findElement(By.css('[data-testid="purchase"]')).click();

//         let error = await driver.wait(
//             until.elementLocated(By.id('charge-error')),
//             5000
//         );

//         let text = await error.getText();

//         assert(text.includes("expiration year is invalid"));
//     });



//     it('Completing a purchase with wrong card info', async function () {

//         await driver.findElement(By.css('[data-testid="checkout"]')).click();

//         await driver.findElement(By.id('name')).sendKeys('Happy');
//         await driver.findElement(By.id('address')).sendKeys('Turku, Finland');
//         await driver.findElement(By.id('card-name')).sendKeys('Happy User');
//         await driver.findElement(By.id('card-number')).sendKeys('4242424242422413');
//         await driver.findElement(By.id('card-expiry-month')).sendKeys('06');
//         await driver.findElement(By.id('card-expiry-year')).sendKeys('2028');
//         await driver.findElement(By.id('card-cvc')).sendKeys('232');

//         await driver.findElement(By.css('[data-testid="purchase"]')).click();

//         let error = await driver.wait(
//             until.elementLocated(By.id('charge-error')),
//             5000
//         );

//         let text = await error.getText();

//         assert(text.includes('card number is incorrect'));
//     });

// });
