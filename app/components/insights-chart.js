import Component from '@glimmer/component';

export default class InsightsChartComponent extends Component {
  chartOptions = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Genres',
    },
    xAxis: {
      categories: ['Genres'],
    },
    yAxis: {
      title: {
        text: 'Percentage (%)',
      },
    },
  };

  chartOptions2 = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Artists',
    },
    xAxis: {
      categories: ['Artists'],
    },
    yAxis: {
      title: {
        text: 'Percentage (%)',
      },
    },
  };

  get options() {
    if (this.args.type == 1) return this.chartOptions;
    else return this.chartOptions2;
  }

  get chartData() {
    var things;
    if (this.args.type == 1) things = this.args.info[0];
    else things = this.args.info[1].slice(0, 10).reduce(function(map, obj) {
      map[obj.name] = obj.count;
      return map;
    }, {});
    var genresInfo = [];
    Object.keys(things).forEach(function (key) {
      genresInfo.push({
        name: key,
        data: [things[key]],
      });
    });
    return genresInfo;
  }
}
