import Route from '@ember/routing/route';
import ENV from 'hello-world/config/environment';
import { typeOf } from '@ember/utils';
import ArtistCompact from 'hello-world/models/artist-compact';

export default class FavouritesFavouriteRoute extends Route {
  model(params) {
    let favourites = this.modelFor('favourites');
    let favourite = favourites.find((favourite) => favourite.id === params.id);

    if (typeof favourite.artists[0].external_urls != "undefined") {
      let artists = [];
      for (let datum of favourite.artists) {
        artists.push(new ArtistCompact(datum));
      }
      favourite.artists = artists;
    }
    return favourite;
  }
}
