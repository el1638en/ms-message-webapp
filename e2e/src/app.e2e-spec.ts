import { AppPo } from './app.po';

describe('ms-message-webapp App', async () => {
  it('should display welcome message', async () => {
    await AppPo.navigateTo();
    await expect(AppPo.getTitleText()).toEqual('S\'authentifier');
  });
});
