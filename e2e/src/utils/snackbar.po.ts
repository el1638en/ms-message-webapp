import { by, element } from 'protractor';
import { BrowserUtils } from '../utils/browser.utils';

export class SnackBarPo {

    static async waitForLoadSnackBar() {
        return await BrowserUtils.waitForPresence(SnackBarPo.snackBar(), 'La snackBar est invisible.');
    }

    static snackBar() {
        return element(by.css('.mat-snack-bar-container'));
    }

    static snackBarMessageContainer() {
        return element(by.css('.mat-simple-snackbar'));
    }

    static async snackBarMessage() {
        return await SnackBarPo.snackBarMessageContainer().getText();
    }
}
