import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class UserComponent extends Component {
  @service user;
  @service cookies;
  @service router;

  get exists() {
    return this.cookies.read().access_token != null;
  }

  get username() {
    return this.cookies.read().username;
  }

  get url() {
    console.log(this.user.url);
    return this.cookies.read().url;
  }

  @action
  async login() {
    const authEndpoint = 'https://accounts.spotify.com/authorize';
    const clientId = 'fda700d134004653b725b039d9001964';
    const scopes = [
      'user-top-read',
      'user-follow-read',
      'user-read-recently-played',
      'streaming',
      'user-library-read',
      'user-read-email',
      'user-read-private',
      'user-read-playback-state'
    ];
    const redirectUri = 'http://localhost:4200/callback';
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      '%20'
    )}&response_type=code&show_dialog=true`;
  }

  @action
  logout() {
    this.user.set('access_token', null);
    this.cookies.clear('access_token');
    window.location = '/about';
  }
}
