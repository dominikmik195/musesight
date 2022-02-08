import Model from '@ember-data/model';
import { dasherize } from '@ember/string';

export default class Favourite {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.url = data.external_urls.spotify;
    this.preview_url = data.preview_url;
    this.duration_ms = data.duration_ms;
    let image_data = data.album.images[0];
    this.image_url = image_data.url;
    this.image_width = image_data.width;
    this.image_height = image_data.height;
    this.artists = data.artists;
    this.uri = data.uri;
  }
}
