export const table = {
  limit: 100,
  skip: 0,
  hasMore: true,
  table : {
    headers: [
      { id: '0', code: 'year', label: 'Year' },
      { id: '0', code: 'month', label: 'Month' },
      { id: '0', code: 'origin_code', label: 'Origin code' },
      { id: '0', code: 'origin_name', label: 'Destination name' },
      { id: '0', code: 'destination_code', label: 'Destination code' },
    ],
    rows: [
      [ 2022, 'July', 'ABZ', 'Aberdeen', 'LGW' ],
      [ 2022, 'July', 'ABZ', 'Aberdeen', 'LGW' ],
      [ 2022, 'July', 'ABZ', 'Aberdeen', 'LGW' ],
      [ 2022, 'July', 'ABZ', 'Aberdeen', 'LGW' ],
      [ 2022, 'July', 'ABZ', 'Aberdeen', 'LGW' ],
      [ 2022, 'July', 'ABZ', 'Aberdeen', 'LGW' ],
      [ 2022, 'July', 'ABZ', 'Aberdeen', 'LGW' ],
      [ 2022, 'July', 'ABZ', 'Aberdeen', 'LGW' ],
    ],
  }
}

const nxRows: any = [];

table.table.rows.forEach((row) => {
  const r = {};

  row.forEach((val, index) => {
    // @ts-ignore
    r[table.table.headers[index].code] = val;
  });

  nxRows.push(r);
});

console.log(nxRows);

// POST SAVE AND RUN sends a completed form

// GET LOAD returns the completed form

// RUN / EXPORT? give you the data you need to run then create the csv? this way query doesn't need to be saved?
// RUN returns the ran query in the response so they then save it if they want?

export const saveLoadRunExport = {
  "name": "new query",
  "type": "table",
  "data_points": {
    "fares": {
      "1_week": true,
      "1_month": false,
      "3_month": true,
      "weighted_average": false
    },
    "profit": {
      "total_profit": false,
      "profit_margin": false,
      "revenue": false,
      "cost": true,
      "yeild": false
    },
    "schedules": {
      "capacity": false,
      "departures": true
    },
    "operational": {
      "fuel_cost": false,
      "fuel_burn": true
    },
    "route_apc": {
      "departing_mov_apcs": true,
      "arriving_mov_apc": false
    },
    "insights": {
      "rask": true,
      "cask": false
    }
  },
  "filters": {
    "time_period": {
      "type": "specific",
      "relative_months": "3", // omitted if specific
      "specific": { // omitted if relative

        "year_from": "2020",
        "year_to": "2021",

        "type": "months", // months/quarters/seasons defines which of the next 3 is defined
        "quarters": { // A
          "one": false,
          "two": true,
          "three": true,
          "four": false
        },
        "months": { // B
          "from": "march",
          "to": "january"
        },
        "seasons": "summer_winter" // or C

      }
    },
    "origin": {
      "type": "city",
      "selected": [ // omitted if all (null).
        {
          "id": "1",
          "code": "stuttgart",
          "label": "Stuttgart",
        }
      ]
    },
    "airline": {
      "type": "airline_alliance",
      "selected": [
        {
          "id": "3",
          "code": "EJ",
          "label": "Easyjet",
        },
        {
          "id": "1",
          "code": "FR",
          "label": "Ryanair",
        }
      ]
    },
    "aircraft": {
      "type": "family",
      "selected": [
        {
          "id": "2",
          "code": "C",
          "label": "Boeing 757",
        }
      ]
    },
    "destination": {
      "type": "city",
      "selected": [
        {
          "id": "1",
          "code": "brum",
          "label": "Birmingham",
        }
      ]
    },
    "cabin_type": "economy"
  },
  "groupings": { // all could be omitted if not applicable
    "gov_taxes": false,
    "time_period": "month_year",
    "equipment_type": "family",
    "emissions_scheme": "corsia",
    "route_origin_destination": "all",
    "currency": "usd",
    "airline": "primary",
    "directionality": "outbound"
  }
};

// GET time_period data api.com/autocomplete?filter=time_period&type=years
export const tpdYr = [
  '2020',
  '2021',
  '2022',
];

// GET time_period data api.com/autocomplete?filter=time_period&type=seasons&year=2021
export const tpdSe = [
  'summer',
  'winter',
  'summer_winter',
];

// GET time_period data api.com/autocomplete?filter=time_period&type=months&year=2021
export const tpdMo = [
  'jan',
  'feb',
  'mar',
];


// GET api.com/autocomplete?filter=origin&type=city&term=stu
export const resp = [
  {
    id: '1',
    code: 'stuttgart',
    label: 'Stuttgart'
  },
  {
    id: '2',
    code: 'brum',
    label: 'Birmingham'
  }
];



// GET FILTERS/DATA POINTS
export const dataPointFilter = {
  // Form group
  "data_points": [
    {
      "id" : "0",
      "label": "Fares",
      "code": "fares",
      "data": [
        // Checkbox form array
        { "id": 1, "label": "1 week fare", "code": "1_week" },
        { "id": 2, "label": "1 month fare", "code": "1_month" },
        { "id": 3, "label": "3 month fare",  "code": "3_month" },
        { "id": 4, "label": "Weighted average fare",  "code": "weighted_average"  }
      ]
    },
    {
      "id": "0",
      "label": "Profit",
      "code": "profit",
      "data": [
        { "id": 5, "label": "Total profit", "code": "total_profit" },
        { "id": 6, "label": "Profit margin", "code": "profit_margin" },
        { "id": 7, "label": "Revenue", "code": "revenue" },
        { "id": 8, "label": "Cost", "code": "cost" },
        { "id": 9, "label": "Yeild", "code": "yeild" }
        // etc...
      ]
    },
    {
      "id": "0",
      "label": "Schedules",
      "code": "schedules",
      "data": [
        { "id": 10, "label": "Capacity", "code": "capacity" },
        { "id": 11, "label": "Departures", "code": "departures" }
        // etc...
      ]
    },
    {
      "id": "0",
      "label": "Operational",
      "code": "operational",
      "data": [
        { "id": 12, "label": "Fuel cost", "code": "fuel_cost" },
        { "id": 43, "label": "Fuel burn", "code": "fuel_burn" }
        // etc...
      ]
    },
    {
      "id": "0",
      "label": "Route Airport Charges",
      "code": "route_apc",
      "data": [
        { "id": 13, "label": "Departing movement APCs", "code": "departing_mov_apcs" },
        { "id": 44, "label": "Arriving movement APCs", "code": "arriving_mov_apc" }
        // etc...
      ]
    },
    {
      "id": "0",
      "label": "Insights",
      "code": "insights",
      "data": [
        { "id": 14, "label": "RASK", "code": "rask" },
        { "id": 45, "label": "CASK", "code": "cask" }
        // etc...
      ]
    }
  ],
  "filters" : [
    {
      "id": "0",
      "label": "Origin",
      "code": "origin",
      "data": [
        { "id": null, "label": "All", "code": 'all' },
        { "id": 16, "label": "Airport", "code": "airport" },
        { "id": 17, "label": "City", "code": "city" },
        { "id": 18, "label": "Country", "code": "country" }
        // etc ...
      ]
    },
    {
      "id": "0",
      "label": "Airline",
      "code": "airline",
      "data": [
        { "id": null, "label": "All", "code": 'all' },
        { "id": 19, "label": "Airline (specific)", "code": "airline" },
        { "id": 20, "label": "Airline alliance", "code": "airline_alliance" },
        { "id": 21, "label": "Airline type", "code": "airline_type" }
      ]
    },
    {
      "id": "0",
      "label": "Aircraft",
      "code": "aircraft",
      "data": [
        { "id": null, "label": "All", "code": 'all' },
        { "id": 22, "label": "Family", "code": "family" },
        { "id": 23, "label": "Model", "code": "model" }
      ]
    },
    {
      "id": "0",
      "label": "Destination",
      "code": "destination",
      "data": [
        { "id": null, "label": "All", "code": 'all' },
        { "id": 16, "label": "Airport", "code": "airport" },
        { "id": 17, "label": "City", "code": "city" },
        { "id": 18, "label": "Country", "code": "country" }
        // etc ...
      ]
    },
    {
      "id": "0",
      "label": "Cabin Type",
      "code": "cabin_type",
      "data": [
        { "id": 24, "label": "Economy", "code": "economy" },
        { "id": 25, "label": "Premium", "code": "premium" },
        { "id": 26, "label": "Business", "code": "business" }
      ]
    }
  ],
  "groupings": [
    {
      "id": "0",
      "label": "Time period",
      "code": "time_period",
      "data": {
        "applicable_to_filters": [],
        "options": [
          { "id": 27, "label": "Year", "code": "year" },
          { "id": 28, "label": "Month / Year", "code": "month_year" },
          { "id": 27, "label": "IATA season", "code": "iata_season" },
          { "id": 28, "label": "Calendar Quarter", "code": "cal_qtr" }
        ],
      }
    },
    {
      "id": "0",
      "label": "Equipment type",
      "code": "equipment_type",
      "data": {
        "applicable_to_filters": [],
        "options": [
          // we have a null option for ALL
          { "id": null, "label": "All", "code": 'all' },
          { "id": 29, "label": "Family", "code": "family" },
          { "id": 30, "label": "Model", "code": "model" }
        ],
      }
    },
    {
      "id": "0",
      "label": "Emissions scheme",
      "code": "emissions_scheme",
      "data": {
        "applicable_to_filters": [],
        "options": [
          // we have a null option for ALL
          { "id": null, "label": "All", "code": 'all' },
          { "id": 31, "label": "CORSIA", "code": "corsia" },
          { "id": 32, "label": "EU ETS", "code": "eu_ets" },
          { "id": 33, "label": "UK ETS", "code": "uk_ets" }
          // etc...
        ]
      }
    },
    {
      "id": "0",
      "label": "Route Origin/Destination",
      "code": "route_origin_destination",
      "data": {
        "applicable_to_filters": [],
        "options": [
          // we have a null option for ALL
          { "id": null, "label": "All", "code": 'all' },
          { "id": 34, "label": "Airport", "code": "airport" },
          { "id": 35, "label": "City", "code": "city" },
          { "id": 36, "label": "Country", "code": "country" },
          { "id": 37, "label": "Continent", "code": "continent" }
        ],
      }
    },
    {
      "id": "0",
      "label": "Currency",
      "code": "currency",
      "data": {
        "applicable_to_filters": [],
        "options": [
          { "id": 38, "label": "GBP", "code": "gbp" },
          { "id": 39, "label": "USD", "code": "usd" },
          { "id": 40, "label": "EUR", "code": "eur" }
          // etc...
        ]
      }
    },
    {
      "id": "0",
      "label": "Airline",
      "code": "airline",
      "data": {
        "applicable_to_filters": [],
        "options": [
          { "id": null, "label": "All", "code": 'all' },
          { "id": 50, "label": "Primary airline", "code": "primary" },
          { "id": 51, "label": "Operating airline", "code": "operating" },
          // etc...
        ]
      }
    },
    {
      "id": "0",
      "label": "Directionality",
      "code": "directionality",
      "data": {
        "applicable_to_filters": [
          "data_points.fares.1_week",
          "data_points.fares.3_month",
        ],
        "options": [
          // null for both ways?
          { "id": 53, "label": "Both ways", "code": "both_ways" },
          { "id": 41, "label": "Outbound", "code": "outbound" },
          { "id": 42, "label": "Inbound", "code": "inbound" }
        ]
      }
    }
  ]
}
