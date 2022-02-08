import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { playerApiCall } from 'hello-world/helpers/player-api-call';
import fetch from 'fetch';

export default class PlayerComponent extends Component {
  @service user;
  @service cookies;
  @service player;

  @action
  async click() {
    if(this.player.isPlaying()) this.player.pause();
    else {
      var resp = await playerApiCall(this.cookies.read().access_token);
      this.player.set('song_title', resp.item.name);
      this.player.play();
    }
  }

  get song_title() {
    var prefix = this.player.isPlaying() ? 'Now playing: ' : 'Paused: ';
    return prefix + this.player.song_title;
  }

  get icon_path() {
    if (this.player.isPlaying()) return "assets/images/pause-icon.png";
    return "assets/images/play-icon.png";
  }
}
