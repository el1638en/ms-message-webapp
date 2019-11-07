import { browser, by, element } from 'protractor';
import { BrowserUtils } from './utils/browser.utils';

export class AppPo {
  static async navigateTo() {
    await browser.waitForAngularEnabled(false);
    await browser.get(browser.baseUrl);
    await AppPo.waitForLoadPage();
  }

  static async waitForLoadPage() {
    return await BrowserUtils.waitForPresence(AppPo.appPage(), 'La page principale de l\'application est invisible');
  }

  static appPage() {
    return element(by.tagName('app-root'));
  }

  static async getTitleText() {
    return await AppPo.appPage().element(by.id('loginPageTitle')).getText();
  }

}
