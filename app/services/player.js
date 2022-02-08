import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PlayerService extends Service {
  @tracked song_title;
  @tracked author;
  @tracked playing;

  constructor() {
    super(...arguments);
    this.song_title = '';
    this.author = '';
    this.playing = false;
  }

  play() {
    this.playing = true;
  }

  pause() {
    this.playing = false;
  }

  isPlaying() {
    return this.playing;
  }
}
