import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { action } from '@ember/object';
import fetch from 'fetch';
import { inject as service } from '@ember/service';

export default class FavouriteInfoComponent extends Component {
  @service favouriteClicked;
  @service cookies;
  @service player;
  @service user;

  get dimensions() {
    if (this.args.image_width > this.args.image_height) {
      return htmlSafe('height:10em;');
    } else {
      return htmlSafe('width:10em;');
    }
  }

  @action
  click() {
    console.log(this.cookies.read().access_token);
    this.favouriteClicked.unclick();
    document.querySelector('.favourite-item-view').style.display = '';
    document.querySelector('.favourites-list').style.opacity = 1;
  }

  @action
  async play() {
    console.log(this.args);
    let response = await fetch(
      'https://api.spotify.com/v1/me/player/play?device_id=' +
        this.cookies.read().device_id,
      {
        method: 'PUT',
        body: JSON.stringify({
          uris: [this.args.uri],
        }),
        headers: {
          Authorization: 'Bearer ' + this.user.get_access_token(),
          'Content-Type': 'application/json',
        },
      }
    );
    this.player.play();
    this.player.set('song_title', this.args.name);
  }
}
