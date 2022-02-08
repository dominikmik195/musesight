import Component from '@glimmer/component';

export default class RatingComponent extends Component {
  get stars() {
    let stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push({
        star: i,
        selected: i <= this.args.rating,
      });
    }
    return stars;
  }
}
