import Route from '@ember/routing/route';
import ENV from 'hello-world/config/environment';
import { inject as service } from '@ember/service';
import Track from 'hello-world/models/track';
import fetch from 'fetch';

export default class ArtistsArtistRoute extends Route {
  @service user;

  async model(params) {
    let artists = this.modelFor('artists');
    let artist = artists.find((artist) => artist.id === params.id);
    let response = await fetch(
      'https://api.spotify.com/v1/artists/' +
        artist.id +
        '/top-tracks?market=HR',
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + this.user.get_access_token(),
          'Content-Type': 'application/json',
        },
      }
    );
    let json = await response.json();
    if (json.error != null && json.error.status == 401) {
      this.transitionTo('not-logged-in');
    }
    let tracks = [];
    for (let datum of json.tracks) {
      tracks.push(new Track(datum));
    }
    artist.tracks = tracks;
    return artist;
  }
}
