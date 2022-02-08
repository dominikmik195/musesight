import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ArtistComponent extends Component {
  @service artistClicked;

  get genres() {
    let result = '';
    for (var i = 0; i < this.args.list.length; i++) {
      result += this.args.list[i];
      if (i != this.args.list.length - 1) {
        result += ', ';
      }
    }
    return result;
  }

  @action
  click() {
    if (this.artistClicked.is_clicked(this.args.id)) {
      this.artistClicked.unclick();
      document.querySelector('.itemview').style.display = '';
      document.querySelector('.artists-list').style.opacity = 1;
    } else {
      this.artistClicked.click(this.args.id);
      document.querySelector('.itemview').style.display = 'table';
      document.querySelector('.artists-list').style.opacity = 0.25;
    }
  }
}
