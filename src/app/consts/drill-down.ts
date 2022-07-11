export const drillDownChart = {
  chart: {
    type: 'column',

    events: {
      drilldown: () => {},
      drillup: () => {},
    },
  },
  title: {
    text: 'Basic drilldown'
  },
  xAxis: {
    type: 'category',
    name: 'dasd',
  },

  legend: {
    enabled: false
  },

  plotOptions: {
    series: {
      // animation: false,
      borderWidth: 0,
      dataLabels: {
        enabled: true
      }
    },
  },

};
