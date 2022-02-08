import { tracked } from '@glimmer/tracking';
import { dasherize } from '@ember/string';

export default class Artist {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.name_id = dasherize(this.name);
    this.genres = data.genres || [];
    let image_data = data.images[0];
    if (image_data == null) {
      this.image_url = null;
      this.image_width = 10;
      this.image_height = 10;
    } else {
      this.image_url = image_data.url;
      this.image_width = image_data.width;
      this.image_height = image_data.height;
    }
    this.url = data.external_urls.spotify;
    this.formatted_url = "location.href='" + this.url + "';";
  }

  getGenres() {
    let result = '';
    for (var i = 0; i < this.genres.length; i++) {
      result += this.genres[i];
      if (i != this.genres.length - 1) {
        result += ', ';
      }
    }
  }
}
