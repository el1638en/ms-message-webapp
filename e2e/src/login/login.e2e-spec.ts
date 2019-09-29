import * as faker from 'faker';
import { User } from 'src/app/models/user';
import { MessagesPO } from '../messages/messages.po';
import { BrowserUtils } from '../utils/browser.utils';
import { LoginPO } from './login.po';
import { LoginReq } from './login.req';

describe('Login - Authentification', async () => {

  beforeEach(() => {
  });

  it('[1] - Naviguer vers la page d\'authentification', async () => {
    await LoginPO.navigateTo();
    await expect(LoginPO.getPageTitleText()).toEqual('S\'authentifier');
  });

  it('[2] - Lorsque l\'utilisateur essaie de s\'authentifier sans login - mot de passe, un message d\'erreur s\'affiche.', async () => {
    // GIVEN
    await LoginPO.fillCredentials('', '');

    // WHEN

    // THEN
    expect(LoginPO.getErrorMail().isDisplayed()).toBeTruthy();
    expect(LoginPO.getErrorPassword().isDisplayed()).toBeTruthy();
  });

  it('[3] - Quand l\'utilisateur saisit un login-MDP erroné, un message d\'erreur s\'affiche', async () => {
    // GIVEN
    await LoginPO.fillCredentials('wrongmail@gmail.com', 'wrongPassword');

    // WHEN

    // THEN
    await BrowserUtils.waitForPresence(LoginPO.getErrorWrongCredentials(), 'La page de Login est invisible');
    expect(LoginPO.getErrorWrongCredentials().isDisplayed()).toBeTruthy();
  });

  it('[4] - Lorsque l\'utilisateur s\'authentifie avec succès, la page des messages s\'affiche', async () => {
    // GIVEN
    const user: User = {
      name: faker.name.lastName(),
      firstName: faker.name.firstName(),
      mail: faker.internet.email(),
      password: faker.internet.password(),
      birthDay: faker.date.past(),
    };

    // WHEN
    await LoginReq.createUser(user);
    await LoginPO.fillCredentials(user.mail, user.password);

    // THEN
    expect(MessagesPO.waitForLoadMessages());
  });

});
