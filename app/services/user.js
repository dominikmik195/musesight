import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class UserService extends Service {
  @tracked access_token;
  @tracked username;
  @tracked picture;
  @tracked url;
  @service cookies;

  constructor() {
    super(...arguments);
    this.access_token = null;
  }

  save(_token) {
    this.access_token = _token;
  }

  get_access_token() {
    return this.cookies.read().access_token;
  }
}
