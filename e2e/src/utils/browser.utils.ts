import { ElementFinder, browser, ExpectedConditions } from 'protractor';

export class BrowserUtils {

    static readonly DEFAULT_WAIT_TIMEOUT = 5000;
    static readonly LONG_TIMEOUT = 10000;

    static async waitForPresence(element: ElementFinder, errorMessage: string, waitTime: number = BrowserUtils.DEFAULT_WAIT_TIMEOUT) {
        await browser.wait(ExpectedConditions.presenceOf(element), waitTime, errorMessage);
    }
}
