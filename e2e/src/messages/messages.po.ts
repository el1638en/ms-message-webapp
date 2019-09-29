import { browser, by, element } from 'protractor';
import { BrowserUtils } from '../utils/browser.utils';

export class MessagesPO {
    static async navigateTo() {
        await browser.waitForAngularEnabled(false);
        await browser.get('/messages');
        return await MessagesPO.waitForLoadMessages();
    }

    static async waitForLoadMessages() {
        return await BrowserUtils.waitForPresence(MessagesPO.messagePage(), 'Impossible d\'afficher les messages');
    }

    private static messagePage() {
        return element(by.tagName('app-messages'));
    }

    getButtonHome() {
        return element.all(by.name('home'));
    }
}
