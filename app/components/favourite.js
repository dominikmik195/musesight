import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default class FavouriteComponent extends Component {
  @service favouriteClicked;
  @service cookies;
  @service user;
  @service player;

  get duration() {
    let result = '';
    var dur = Math.floor(this.args.duration_ms / 1000);
    result += dur % 60;
    if(dur % 60 < 10) result = '0' + result;
    result = Math.floor(dur / 60) + ':' + result;
    return result;
  }

  get artistsNames() {
    let result = '';
    for (var i = 0; i < this.args.artists.length; i++) {
      result += this.args.artists[i].name;
      if (i != this.args.artists.length - 1) result += ' • ';
    }
    return result;
  }

  @action
  click() {
    if (this.favouriteClicked.is_clicked(this.args.id)) {
      this.favouriteClicked.unclick();
      document.querySelector('.favourite-item-view').style.display = '';
      document.querySelector('.favourite-item-view').style.right = 0;
      document.querySelector('.favourites-list').style.opacity = 1;
    } else {
      this.favouriteClicked.click(this.args.id);
      document.querySelector('.favourite-item-view').style.display = 'table';
      document.querySelector('.favourites-list').style.opacity = 0.25;
    }
  }

  @action
  async play() {
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
