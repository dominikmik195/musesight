import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ArtistClickedService extends Service {
  @tracked id;
  @tracked clicked;

  constructor() {
    super(...arguments);
    this.unclick();
  }

  unclick() {
    this.id = null;
    this.clicked = false;
  }

  click(_id) {
    this.id = _id;
    this.clicked = true;
  }

  is_clicked(_id) {
    return this.id === _id;
  }

  get clicked() {
    return this.clicked;
  }

  get id() {
    return this.id;
  }
}
