import { tracked } from '@glimmer/tracking';
import { dasherize } from '@ember/string';

export default class ArtistCompact {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.name_id = dasherize(this.name);
    this.url = data.external_urls.spotify;
  }
}
