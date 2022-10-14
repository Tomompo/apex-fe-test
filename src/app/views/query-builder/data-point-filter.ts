// GET FILTERS/DATA POINTS

export const dataPointFilter = {
  // Form group
  "data-points": {
  // Form group
  "fares": [
    // Checkbox form array
    { "id": 1, "label": "1 week fare" },
    { "id": 2, "label": "1 month fare" },
    { "id": 3, "label": "3 month fare" },
    { "id": 4, "label": "Weighted average fare" }
  ],
    "profit": [
    { "id": 5, "label": "Total profit" },
    { "id": 6, "label": "Profit margin" },
    { "id": 7, "label": "Revenue" },
    { "id": 8, "label": "Cost" },
    { "id": 9, "label": "Yeild" }
    // etc...
  ],
    "schedules": [
    { "id": 10, "label": "Capacity" },
    { "id": 11, "label": "Departures" }
    // etc...
  ],
    "operational": [
    { "id": 12, "label": "Fuel cost" },
    { "id": 43, "label": "Fuel burn" }
    // etc...
  ],
    "route_apc": [
    { "id": 13, "label": "Departing movement APCs" },
    { "id": 44, "label": "Arriving movement APCs" }
    // etc...
  ],
    "insights": [
    { "id": 14, "label": "RASK" },
    { "id": 45, "label": "CASK" }
    // etc...
  ]
},
  "filters": {
  "origin": [
    // we have a null option for ALL
    { "id": 16, "label": "Airport" },
    { "id": 17, "label": "City" },
    { "id": 18, "label": "Country" }
    // etc ...
  ],
    "airline": [
    // we have a null option for ALL
    { "id": 19, "label": "Airline (specific)" },
    { "id": 20, "label": "Airline alliance" },
    { "id": 21, "label": "Airline type" }
  ],
    "aircraft": [
    // we have a null option for ALL
    { "id": 22, "label": "Family" },
    { "id": 23, "label": "Model" }
  ],
    "cabin": [
    { "id": 24, "label": "Economy" },
    { "id": 25, "label": "Premium" },
    { "id": 26, "label": "Business" }
  ],
    // not required, we can just pass the date range if they chose last X months we
    // calculate the range as we would need to for the range selection anyways.
    "time_period": []
},
  "groups": {
  "time_perdiod" : [
    { "id": 27, "label": "Year" },
    { "id": 28, "label": "Month / Year" },
    { "id": 27, "label": "IATA season" },
    { "id": 28, "label": "Calendar Quarter" }
  ],
    "equipment_type": [
    // we have a null option for ALL
    { "id": 29, "label": "Family" },
    { "id": 30, "label": "Model" }
  ],
    "emissions_scheme": [
    // null option for no scheme
    { "id": 31, "label": "CORSIA" },
    { "id": 32, "label": "EU ETS" },
    { "id": 33, "label": "UK ETS" }
    // etc...
  ],
    "route_origin_destination": [
    // we have a null option for ALL
    { "id": 34, "label": "Airport" },
    { "id": 35, "label": "City" },
    { "id": 36, "label": "Country" },
    { "id": 37, "label": "Continent" }
  ],
    "currency": [
    { "id": 38, "label": "GBP" },
    { "id": 39, "label": "USD" },
    { "id": 40, "label": "EUR" }
    // etc...
  ],
    "directionality": [
    // null for both ways?
    { "id": 41, "label": "Outbound" },
    { "id": 42, "label": "Inbound" }
  ]
}
}
