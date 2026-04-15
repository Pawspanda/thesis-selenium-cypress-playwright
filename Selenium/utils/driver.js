const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function createDriver() {
    const options = new chrome.Options();

    // Headless mode
    options.addArguments('--headless=new');

    // Important for stability
    options.addArguments('--window-size=1920,1080');
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');

    // Disable password manager
    options.setUserPreferences({
        'credentials_enable_service': false,
        'profile.password_manager_enabled': false
    });

    options.addArguments('--disable-save-password-bubble');

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    return driver;
}

module.exports = createDriver;