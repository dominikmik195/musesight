import EmberRouter from '@ember/routing/router';
import config from 'hello-world/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('recommendations');
  this.route('artists', function () {
    this.route('artist', { path: ':id' });
  });
  this.route('playlists');
  this.route('favourites', function () {
    this.route('favourite', { path: ':id' });
  });
  this.route('about');
  this.route('callback');
  this.route('not-logged-in');
  this.route('insights');
});
