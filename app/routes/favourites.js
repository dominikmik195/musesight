import Route from '@ember/routing/route';
import ENV from 'hello-world/config/environment';
import { inject as service } from '@ember/service';
import Favourite from 'hello-world/models/favourite';
import fetch from 'fetch';
import { apiCall } from 'hello-world/helpers/api-call';

export default class FavouritesRoute extends Route {
  @service user;

  async model() {
    let json = await apiCall(
      'https://api.spotify.com/v1/me/top/tracks',
      'GET',
      this.user.get_access_token(),
      30
    );
    if (json.error != null && json.error.status == 401) {
      this.transitionTo('not-logged-in');
    }
    let tracks = [];
    for (let datum of json.items) {
      tracks.push(new Favourite(datum));
    }
    return tracks;
  }
}
