import { tracked } from '@glimmer/tracking';
import { dasherize } from '@ember/string';

export default class Track {
  constructor(data) {
    this.name = data.name;
    this.id = dasherize(this.name);
    this.url = data.external_urls.spotify;
    this.preview_url = data.preview_url;
    this.duration_ms = data.duration_ms;
    this.artists = data.artists;
  }
}
