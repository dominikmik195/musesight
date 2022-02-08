import Controller from '@ember/controller';
import { action } from '@ember/object';
import ENV from 'hello-world/config/environment';
import { tracked } from '@glimmer/tracking';

export default class FavouritesController extends Controller {
  @tracked searchFrase = '';

  get foundTracks() {
    return this.model.filter((track) => {
      return track.name.toLowerCase().includes(this.searchFrase.toLowerCase());
    });
  }

  @action
  updateSearchFrase(event) {
    this.searchFrase = event.target.value;
  }
}
