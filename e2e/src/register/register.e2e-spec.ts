import * as faker from 'faker';
import { User } from 'src/app/models/user';
import { LoginPO } from '../login/login.po';
import { LoginReq } from '../login/login.req';
import { BrowserUtils } from '../utils/browser.utils';
import { SnackBarPo } from '../utils/snackbar.po';
import { RegisterPo } from './register.po';

describe('Enregistrer un utilisateur', async () => {

    it('[1] - Naviguer vers la page d\'enregistrement des utilisateurs.', async () => {
        await RegisterPo.navigateTo();
    });

    it('[2] - Quand l\'utilisateur ne saisit aucune données, la page affiche des messages d\'erreur.', async () => {
        // GIVEN

        // WHEN
        await RegisterPo.getButtonRegister().click();
        await BrowserUtils.waitForPresence(RegisterPo.getErrorName(), 'Le message d\'erreur du nom utilisaeur est invisible');

        // THEN
        expect(RegisterPo.getErrorName().isDisplayed()).toBeTruthy();
    });

    it('[3] - Quand l\'utilisateur saisit un mail existant, la demande d\'enregistrement échoue.', async () => {
        // GIVEN
        const user: User = {
            name: faker.name.lastName(),
            firstName: faker.name.firstName(),
            mail: faker.internet.email(),
            password: faker.internet.password(),
            birthDay: faker.date.past(),
        };
        await LoginReq.createUser(user);

        // WHEN
        await RegisterPo.fillRegisterInfos(user);
        await SnackBarPo.waitForLoadSnackBar();

        // THEN
        await SnackBarPo.waitForLoadSnackBar();
        await expect(SnackBarPo.snackBarMessage()).not.toBe('');
    });

    it('[4] - Quand l\'utlisateur saisit des données valides, il est enregistré et on retourne sur la page de login.', async () => {
        // GIVEN
        await RegisterPo.navigateTo();
        const user: User = {
            name: faker.name.lastName(),
            firstName: faker.name.firstName(),
            mail: faker.internet.email(),
            password: faker.internet.password(),
            birthDay: faker.date.past(),
        };

        // WHEN
        await RegisterPo.fillRegisterInfos(user);

        // THEN
        await SnackBarPo.waitForLoadSnackBar();
        await expect(SnackBarPo.snackBarMessage()).not.toBe('');
        expect(LoginPO.waitForLoadLogin());
    });
});
