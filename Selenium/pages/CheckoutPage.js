const { By, until } = require('selenium-webdriver');

class CheckoutPage {

    constructor(driver) {
        this.driver = driver;
    }

    async proceedToCheckout() {
        const checkout = await this.driver.wait(until.elementLocated(
            By.css('[data-testid="checkout"]')));
        await this.driver.wait(until.elementIsVisible(checkout),5000);
        await this.driver.wait(until.elementIsEnabled(checkout),5000);

        await this.driver.executeScript(
        "arguments[0].scrollIntoView({block: 'center'});", checkout);
        
        await this.driver.executeScript("arguments[0].click();", checkout);
    }

    async fillCheckoutForm(name, address, cardName, cardNumber, month, year, cvc) {

        await this.driver.findElement(By.id('name')).sendKeys(name);
        await this.driver.findElement(By.id('address')).sendKeys(address);
        await this.driver.findElement(By.id('card-name')).sendKeys(cardName);
        await this.driver.findElement(By.id('card-number')).sendKeys(cardNumber);
        await this.driver.findElement(By.id('card-expiry-month')).sendKeys(month);
        await this.driver.findElement(By.id('card-expiry-year')).sendKeys(year);
        await this.driver.findElement(By.id('card-cvc')).sendKeys(cvc);
    }

    async purchase() {
        const purchase = await this.driver.wait(until.elementLocated(
            By.css('[data-testid="purchase"]')));
        await this.driver.wait(until.elementIsVisible(purchase),5000);
        await this.driver.wait(until.elementIsEnabled(purchase),5000);

        await this.driver.executeScript(
            "arguments[0].scrollIntoView({block: 'center'});", purchase);
        await this.driver.sleep(2000);
        await this.driver.executeScript("arguments[0].click();", purchase);
        await this.driver.sleep(2000);
    }

    async getSuccessMessage() {
        const message = await this.driver.wait(
            until.elementLocated(By.id('flash')),
            10000
        );

        await this.driver.wait(until.elementIsVisible(message), 10000);

        return (await message.getText()).trim();
    }

    async getErrorMessage() {
        return await this.driver.findElement(By.id('charge-error')).getText();
    }

}

module.exports = CheckoutPage;