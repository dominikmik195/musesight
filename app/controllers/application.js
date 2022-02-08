import Controller from '@ember/controller';
import { action } from '@ember/object';
import ENV from 'hello-world/config/environment';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default class ApplicationController extends Controller {
  @service user;
  @service artistClicked;

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
    ];
    const redirectUri = 'http://localhost:4200/callback';
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      '%20'
    )}&response_type=code&show_dialog=true`;
  }

  @action
  async test() {
    console.log(this.user.access_token);
    let response = await fetch('https://api.spotify.com/v1/me/top/artists', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + this.user.access_token,
        'Content-Type': 'application/json',
      },
      limit: 3,
      market: 'HR',
    });
    let json = await response.json();
    console.log(json);
  }

  @action
  menuButtonClick() {
    if (this.artistClicked.clicked) {
      this.artistClicked.unclick();
      document.querySelector('.itemview').style.display = '';
      document.querySelector('.artists-list').style.opacity = 1;
    }
  }
}
