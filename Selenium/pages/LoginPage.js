const { By, until } = require('selenium-webdriver');

class LoginPage {

    constructor(driver) {
        this.driver = driver;
    }

    async open() {
        await this.driver.get('https://practice.expandtesting.com/login');
                await this.driver.sleep(2000);
                await this.driver.wait(until.elementLocated(By.id('username')), 10000);
    }

    async login(username, password) {

        await this.driver.findElement(By.id('username')).sendKeys(username);
        await this.driver.findElement(By.id('password')).sendKeys(password);


        const submitLogin = await this.driver.wait(until.elementLocated(By.id('submit-login')),10000);

        await this.driver.wait(until.elementIsVisible(submitLogin),5000);
        await this.driver.wait(until.elementIsEnabled(submitLogin),5000);

        await this.driver.executeScript(
        "arguments[0].scrollIntoView({block: 'center'});", submitLogin);
        
        await this.driver.executeScript("arguments[0].click();", submitLogin);
    }

    async logout() {
        const logoutBtn = await this.driver.findElement(By.css("a[href='/logout']"));
        await this.driver.executeScript(
            "arguments[0].scrollIntoView({block: 'center'});", logoutBtn);

        await this.driver.sleep(300);

        await this.driver.executeScript("arguments[0].click();", logoutBtn);

        await this.driver.wait(until.elementLocated(By.id('flash')),10000);
        
    }

    async getFlashMessage() {
        const message = await this.driver.wait(
            until.elementLocated(By.id('flash')),
            10000
        );

        await this.driver.wait(until.elementIsVisible(message), 10000);

        return (await message.getText()).trim();
    }

    // async getFlashMessage() {
    //     const message = await this.driver.wait(until.elementLocated(By.id('flash')),10000);
    //     return message.getText();
    // }

}

module.exports = LoginPage;