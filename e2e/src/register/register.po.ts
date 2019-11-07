import { browser, by, element, ElementFinder } from 'protractor';
import { BrowserUtils } from '../utils/browser.utils';
import * as faker from 'faker';
import { User } from 'src/app/models/user';

export class RegisterPo {
    static async navigateTo() {
        await browser.waitForAngularEnabled(false);
        await browser.get('/register');
        return await RegisterPo.waitForLoadRegister();
    }

    static async waitForLoadRegister() {
        return await BrowserUtils.waitForPresence(RegisterPo.registerPage(), 'Impossible d\'afficher la page d\'enregistrement');
    }

    private static registerPage() {
        return element(by.tagName('app-register'));
    }

    static async resetRegister() {
        await RegisterPo.getName().clear();
        await RegisterPo.getFirstName().clear();
        await RegisterPo.getMail().clear();
        await RegisterPo.getPassword().clear();
        await RegisterPo.getConfirmPassword().clear();
        await RegisterPo.getBirthDay().clear();
    }

    static async fillRegisterInfos(user: User) {
        await RegisterPo.resetRegister();
        await RegisterPo.getName().sendKeys(user.name);
        await RegisterPo.getFirstName().sendKeys(user.firstName);
        await RegisterPo.getMail().sendKeys(user.mail);
        await RegisterPo.getPassword().sendKeys(user.password);
        await RegisterPo.getConfirmPassword().sendKeys(user.password);
        await RegisterPo.getBirthDay().sendKeys(user.birthDay.toString());
        await RegisterPo.getButtonRegister().click();
    }

    static getErrorName(): ElementFinder {
        return RegisterPo.registerPage().element(by.name('errorName'));
    }

    static getErrorMail(): ElementFinder {
        return RegisterPo.registerPage().element(by.name('errorMail'));
    }
    static getName(): ElementFinder {
        return RegisterPo.registerPage().element(by.name('name'));
    }

    static getFirstName(): ElementFinder {
        return RegisterPo.registerPage().element(by.name('firstName'));
    }

    static getMail(): ElementFinder {
        return RegisterPo.registerPage().element(by.name('mail'));
    }

    static getPassword(): ElementFinder {
        return RegisterPo.registerPage().element(by.name('password'));
    }

    static getConfirmPassword(): ElementFinder {
        return RegisterPo.registerPage().element(by.name('confirmPassword'));
    }

    static getBirthDay(): ElementFinder {
        return RegisterPo.registerPage().element(by.name('birthDay'));
    }

    static getButtonRegister(): ElementFinder {
        return RegisterPo.registerPage().element(by.name('btnRegister'));
    }
}
