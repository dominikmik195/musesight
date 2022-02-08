import Controller from '@ember/controller';
import { action } from '@ember/object';
import ENV from 'hello-world/config/environment';
import { tracked } from '@glimmer/tracking';

export default class ArtistsController extends Controller {
  @tracked searchFrase = '';

  get foundArtists() {
    return this.model.filter((artist) => {
      return artist.name.toLowerCase().includes(this.searchFrase);
    });
  }

  @action
  updateSearchFrase(event) {
    this.searchFrase = event.target.value;
  }
}
