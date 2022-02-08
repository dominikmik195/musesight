import Route from '@ember/routing/route';
import { apiCall } from 'hello-world/helpers/api-call';
import { inject as service } from '@ember/service';

export default class InsightsRoute extends Route {
  @service user;

  async model() {
    let json = await apiCall(
      'https://api.spotify.com/v1/me/top/artists',
      'GET',
      this.user.get_access_token(),
      50
    );
    if (json.error != null && json.error.status == 401) {
      this.transitionTo('not-logged-in');
    }
    let genres = {};
    for (let datum of json.items) {
      for (let genre of datum.genres) {
        if (genre.includes('rock') && !('rock' in genres)) genres['rock'] = 1;
        else if (genre.includes('rock')) genres['rock'] += 1;
        else if (genre.includes('classical') && !('classical' in genres))
          genres['classical'] = 1;
        else if (genre.includes('classical')) genres['classical'] += 1;
        else if (genre.includes('orchestra') && !('orchestra' in genres))
          genres['orchestra'] = 1;
        else if (genre.includes('orchestra')) genres['orchestra'] += 1;
        else if (genre in genres) genres[genre] += 1;
        else genres[genre] = 1;
      }
    }
    Object.keys(genres).forEach(function (key) {
      if (genres[key] <= 1) delete genres[key];
    });
    var count = 0;
    Object.keys(genres).forEach(function (key) {
      count += genres[key];
    });
    Object.keys(genres).forEach(function (key) {
      genres[key] *= 100 / count;
    });

    let json2 = await apiCall(
      'https://api.spotify.com/v1/me/top/tracks',
      'GET',
      this.user.get_access_token(),
      50
    );
    if (json2.error != null && json2.error.status == 401) {
      this.transitionTo('not-logged-in');
    }
    let artists = {};
    for (let datum of json2.items) {
      for (let artist of datum.artists) {
        if (artist.name in artists) artists[artist.name] += 1;
        else artists[artist.name] = 1;
      }
    }
    return [genres, artists];
  }

  chartOptions() {
    return {
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Fruit Consumption',
      },
      xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges'],
      },
      yAxis: {
        title: {
          text: 'Fruit eaten',
        },
      },
    };
  }
}
