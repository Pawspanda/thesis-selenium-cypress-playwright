const { By, until } = require('selenium-webdriver');
const { elementLocated } = require('selenium-webdriver/lib/until');

class BookstorePage {

    constructor(driver) {
        this.driver = driver;
    }

    async open() {
        await this.driver.get('https://practice.expandtesting.com/bookstore');
        await this.driver.sleep(2000);
    }

    async goToLogin() {
        const signIn = await this.driver.wait(until.elementLocated(By.css('[data-testid="goto-signin"]')));
        await this.driver.executeScript(
            "arguments[0].scrollIntoView({block: 'center'});", signIn);
        await this.driver.executeScript("arguments[0].click();", signIn);
    }

    async login(email, password) {
        await this.driver.findElement(By.id('email')).sendKeys(email);
        await this.driver.findElement(By.id('password')).sendKeys(password);

        const submitLogin = await this.driver.wait(until.elementLocated(By.id('submit')),10000);
        await this.driver.wait(until.elementIsVisible(submitLogin),5000);
        await this.driver.wait(until.elementIsEnabled(submitLogin),5000);

        await this.driver.executeScript(
        "arguments[0].scrollIntoView({block: 'center'});", submitLogin);
        
        await this.driver.executeScript("arguments[0].click();", submitLogin);
    }

    async addBook(id) {
        const add = await this.driver.wait(until.elementLocated(By.css(`[data-testid="${id}"]`)));
        await this.driver.wait(until.elementIsVisible(add),5000);
        await this.driver.wait(until.elementIsEnabled(add),5000);

        await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", add);
        await this.driver.executeScript("arguments[0].click();", add);
        await this.driver.sleep(2000);
    }

    async openCart() {
        const cart = await this.driver.wait(until.elementLocated(By.css('[href="/bookstore/cart"]')));
        await this.driver.wait(until.elementIsVisible(cart),5000);
        await this.driver.wait(until.elementIsEnabled(cart),5000);

        await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", cart);
        await this.driver.executeScript("arguments[0].click();", cart);
    }

    async removeBook(bookId) {
        const remove = await this.driver.wait(until.elementLocated(By.css(`[href="/bookstore/remove/${bookId}"]`)));
        await this.driver.wait(until.elementIsVisible(remove),5000);
        await this.driver.wait(until.elementIsEnabled(remove),5000);

        await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", remove);
        await this.driver.executeScript("arguments[0].click();", remove);
        await this.driver.sleep(2000);
    }

}

module.exports = BookstorePage;