import Route from '@ember/routing/route';
import ENV from 'hello-world/config/environment';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default class CallbackRoute extends Route {
  @service user;
  @service cookies;

  async model() {
    var _code = window.location.toString().substring(1).split('=')[1];
    const tokenEndpoint = 'https://accounts.spotify.com/api/token';
    const clientId = 'fda700d134004653b725b039d9001964';
    const clientSecret = 'secret';
    const redirectUri = 'http://localhost:4200/callback';
    let response = await fetch(
      `${tokenEndpoint}?grant_type=authorization_code&code=${_code}&redirect_uri=${redirectUri}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    let res = await response.json();
    this.cookies.write('access_token', res.access_token);
    this.cookies.write('refresh_token', res.refresh_token);
    this.user.set('access_token', res.access_token);
    this.user.set('refresh_token', res.refresh_token);
    this.user.set('expires_in', res.expires_in);
    let user_response = await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + this.user.access_token,
        'Content-Type': 'application/json',
      },
    });
    let json = await user_response.json();
    this.cookies.write('username', json.display_name);
    this.cookies.write('url', json.external_urls.spotify);
    this.user.set('username', json.display_name);
    this.user.set('url', json.external_urls.spotify);
    this.user.set('picture', json.images[0]);
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = this.user.access_token;
      const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        this.cookies.write('device_id', device_id);
        console.log('Ready with Device ID', device_id, player);
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener('initialization_error', ({ message }) => {
        console.error(message);
      });

      player.addListener('authentication_error', ({ message }) => {
        console.error(message);
      });

      player.addListener('account_error', ({ message }) => {
        console.error(message);
      });

      document.getElementById('togglePlay').onclick = function () {
        console.log('toggle play funkcija');
        player.togglePlay();
      };

      player.connect();
    };
    this.transitionTo('recommendations');
  }
}
