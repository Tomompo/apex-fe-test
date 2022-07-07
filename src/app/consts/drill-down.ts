export const ngxData = [
  { name: 'United Kingdom', flights: 100 },
  { name: 'Germany', flights: 50 },
  { name: 'USA', flights: 50 },
]

export const ngxDataTwo = [
  { name: 'MAN', flights: 33 },
  { name: 'LHR', flights: 50 },
  { name: 'BHX', flights: 17 },
]

export const ngxDataThree = [
  { name: 'Ryanair', flights: 3 },
  { name: 'Eurowings', flights: 19 },
  { name: 'Wizz', flights: 11 },
]

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
      borderWidth: 0,
      dataLabels: {
        enabled: true
      }
    }
  },

  // series: [{
  //   name: 'Destination Countries',
  //   data: [{
  //     name: 'United Kingdom',
  //     y: 3,
  //     drilldown: 'uk'
  //   }, {
  //     name: 'Germany',
  //     y: 2,
  //     drilldown: 'de'
  //   }]
  // }],
  // drilldown: {
  //   series: [
  //
  //     // LEVEL 1
  //     {
  //       name: 'United Kingdom',
  //       id: 'uk',
  //       chartRow: 1,
  //       data: [{
  //         name: 'LHR',
  //         y: 22,
  //         drilldown: 'uk-planes-lhr'
  //       },
  //         {
  //           name: 'MAN',
  //           y: 18,
  //           drilldown: 'uk-planes-man'
  //         }]
  //     },
  //     {
  //       name: 'Germany',
  //       id: 'de',
  //       chartRow: 2,
  //       data: [{
  //         name: 'STR',
  //         y: 14,
  //         drilldown: 'de-planes-str'
  //       },
  //         {
  //           name: 'FRK',
  //           y: 10,
  //           drilldown: 'de-planes-frk'
  //         }]
  //     },
  //
  //     // LEVEL 2
  //     {
  //       id: 'uk-planes-lhr',
  //       data: [
  //         ['BOEING-737', 2],
  //         ['BOEING-702', 1],
  //         ['BOEING-900', 1]
  //       ]
  //     },
  //     {
  //       id: 'uk-planes-man',
  //       data: [
  //         ['BOEING-737', 11],
  //         ['BOEING-900', 2]
  //       ]
  //     },
  //     {
  //       id: 'de-planes-str',
  //       data: [
  //         ['BOEING-737', 9],
  //         ['BOEING-900', 4]
  //       ]
  //     },
  //     {
  //       id: 'de-planes-frk',
  //       data: [
  //         ['BOEING-737', 3],
  //         ['BOEING-900', 7]
  //       ]
  //     },
  //
  //   ]
  // }
};
