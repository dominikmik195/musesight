import Route from '@ember/routing/route';
import ENV from 'hello-world/config/environment';
import { inject as service } from '@ember/service';
import Artist from 'hello-world/models/artist';
import fetch from 'fetch';
import { apiCall } from 'hello-world/helpers/api-call';

export default class ArtistsRoute extends Route {
  @service user;
  @service router;

  async model() {
    let json = await apiCall(
      'https://api.spotify.com/v1/me/top/artists',
      'GET',
      this.user.get_access_token(),
      30
    );
    if (json.error != null && json.error.status == 401) {
      this.transitionTo('not-logged-in');
    }
    let artists = [];
    for (let datum of json.items) {
      artists.push(new Artist(datum));
    }
    return artists;
  }
}
