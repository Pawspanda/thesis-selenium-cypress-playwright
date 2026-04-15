const { By, until } = require('selenium-webdriver');

class RegisterPage {

    constructor(driver) {
        this.driver = driver;
    }

    async open() {
        await this.driver.get('https://practice.expandtesting.com/register');
        await this.driver.sleep(2000);
        await this.driver.wait(until.elementLocated(By.id('username')), 10000);
    }

    async register(username, password, confirm) {

    await this.driver.findElement(By.id('username')).sendKeys(username);
    await this.driver.findElement(By.id('password')).sendKeys(password);
    await this.driver.findElement(By.id('confirmPassword')).sendKeys(confirm);

    const registerBtn = await this.driver.wait(
        until.elementLocated(By.css("button[type='submit'].btn-primary")),10000);

    await this.driver.wait(until.elementIsVisible(registerBtn),5000);
    await this.driver.wait(until.elementIsEnabled(registerBtn),5000);

    await this.driver.executeScript(
        "arguments[0].scrollIntoView({block: 'center'});", registerBtn);

    await this.driver.sleep(300);

    await registerBtn.click();    // await this.driver.executeScript("arguments[0].click();", registerBtn);

    }

    async getAlert() {
        const alert = await this.driver.wait(until.elementLocated(By.css('#flash > b')),10000);
        return alert.getText();
    }

}

module.exports = RegisterPage;