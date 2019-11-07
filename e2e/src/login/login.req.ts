import axios from 'axios';
import { User } from 'src/app/models/user';

export class LoginReq {

  static async createUser(user: User) {
    axios.defaults.timeout = 10000;
    return axios.post(`http://localhost:8080/api/user`, user)
      .then(async response => {})
      .catch(err => {
        console.error(`impossible de créer l\'utilisateur ${ JSON.stringify(user) }`, err);
      });
  }

  // TODO
  // https://stackoverflow.com/questions/21960598/accessing-localstorage-in-protractor-test-for-angularjs-application
}
