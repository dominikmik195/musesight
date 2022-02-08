import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ArtistComponent extends Component {
  @service artistClicked;

  get dimensions() {
    if (this.args.image_width > this.args.image_height) {
      return htmlSafe('height:10em;');
    } else {
      return htmlSafe('width:10em;');
    }
  }

  @action
  click() {
    this.artistClicked.unclick();
    document.querySelector('.itemview').style.display = '';
    document.querySelector('.artists-list').style.opacity = 1;
  }
}
