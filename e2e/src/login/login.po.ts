import { browser, by, element, ElementFinder, ExpectedConditions } from 'protractor';
import { BrowserUtils } from '../utils/browser.utils';
const axios = require('axios');

export class LoginPO {
    static async navigateTo() {
        await browser.waitForAngularEnabled(false);
        await browser.get('/login');
        await LoginPO.waitForLoadLogin();
    }

    static async waitForLoadLogin() {
        return await BrowserUtils.waitForPresence(LoginPO.loginPage(), 'La page de Login est invisible', BrowserUtils.LONG_TIMEOUT);
    }

    static loginPage() {
        return element(by.tagName('app-login'));
    }

    static async getPageTitleText() {
        return await LoginPO.loginPage().element(by.id('loginPageTitle')).getText();
    }

    static async resetCredentials() {
        await LoginPO.loginPage().element(by.name('mail')).clear();
        await LoginPO.loginPage().element(by.name('password')).clear();
    }

    static async fillCredentials(login?: string, password?: string) {
        await LoginPO.resetCredentials();
        await LoginPO.loginPage().element(by.name('mail')).sendKeys(login);
        await LoginPO.loginPage().element(by.name('password')).sendKeys(password);
        await this.getButtonLogin().click();
    }

    static getErrorMail(): ElementFinder {
        return LoginPO.loginPage().element(by.name('errorMail'));
    }

    static getErrorPassword(): ElementFinder {
        return LoginPO.loginPage().element(by.name('errorPassword'));
    }

    static getErrorWrongCredentials() {
        return LoginPO.loginPage().element(by.id('wrongCredentials'));
    }

    static getButtonLogin(): ElementFinder {
        return LoginPO.loginPage().element(by.name('btnLogin'));
    }

    static getButtonCancel(): ElementFinder {
        return LoginPO.loginPage().element(by.name('btnCancel'));
    }
}
